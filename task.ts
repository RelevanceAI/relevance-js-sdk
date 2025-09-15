import { Client } from "./client.ts";
import { Emitter, type EventMap } from "./emitter.ts";
import {
  TaskErrorEvent,
  TaskMessageEvent,
  TaskStartEvent,
  TaskStatusEvent,
  TaskUpdateEvent,
} from "./event.ts";
import type { AnyTaskMessage } from "./message/task.ts";
import type { ToolMessage } from "./message/tool.ts";
import { runInterval } from "./utils.ts";

export type TaskStatus =
  | "not-started"
  | "idle"
  | "queued"
  | "running"
  | "action"
  | "complete"
  | "error";

export abstract class Task<
  S = unknown,
  M extends EventMap = Record<string, never>,
> extends Emitter<M> {
  public readonly subject: S;
  protected readonly client: Client;

  readonly #id: string | undefined;

  private listenController: AbortController | undefined;

  public abstract fetchMessages(
    fetchOptions?: { from?: Date },
  ): Promise<AnyTaskMessage[]>;

  public abstract fetchStatus(): Promise<TaskStatus>;

  public constructor(
    subject: S,
    id: string | undefined = undefined,
    client: Client = Client.default(),
  ) {
    super();

    this.subject = subject;
    this.client = client;

    this.#id = id;
  }

  public get id(): string | undefined {
    return this.#id;
  }

  protected setId(id: string, status: TaskStatus = "not-started") {
    if (this.#id) {
      throw new Error("task id is already set");
    }

    // @ts-ignore: allow assignment to readonly in this special case
    this.#id = id;
    this.dispatchEvent(new TaskStartEvent(id, status));
  }

  public listen() {
    if (this.isListening()) {
      return;
    }

    this.listenController = new AbortController();
    const signal = this.listenController.signal;

    let currentStatus: TaskStatus | null = null;
    const messagesCursor = new Date(0);

    const emitted = new Set<string>();
    const pendingTools = new Map<string, ToolMessage>();

    void runInterval(
      async () => {
        // no task, yet
        if (!this.id) {
          return;
        }

        const [status, messages] = await Promise.all([
          this.fetchStatus(),
          this.fetchMessages({
            from: messagesCursor,
          }),
        ]);

        if (!this.isListening()) {
          return;
        }

        if (status !== currentStatus) {
          currentStatus = status;
          this.dispatchEvent(new TaskStatusEvent(status));
        }

        if (messages.length) {
          for (const message of messages) {
            if (emitted.has(message.id)) {
              switch (message.type) {
                case "agent-error":
                case "agent-message":
                case "user-message":
                  // don't re-fire
                  continue;
              }
            }

            emitted.add(message.id);

            switch (message.type) {
              case "agent-error":
                this.dispatchEvent(
                  new TaskErrorEvent(message),
                );
                break;

              case "tool-run": {
                const { status } = message;
                if (pendingTools.get(message.id)?.status == status) {
                  // no change to the tool status
                  continue;
                }

                if (["pending", "running"].includes(status)) {
                  pendingTools.set(message.id, message);
                } else {
                  pendingTools.delete(message.id);
                }

                this.dispatchEvent(new TaskUpdateEvent(message));
                break;
              }

              case "agent-message":
              case "user-message":
                this.dispatchEvent(
                  new TaskMessageEvent(message),
                );
            }
          }

          // +1 the api treats after inclusively
          let nextCursor = messages.at(-1)!.createdAt.getTime() + 1;

          // set the cursor as the earliest pending tool
          for (const pending of pendingTools.values()) {
            if (nextCursor > pending.createdAt.getTime()) {
              nextCursor = pending.createdAt.getTime();
            }
          }

          messagesCursor.setTime(nextCursor);
        }
      },
      1_000,
      { signal },
    );
  }

  public isListening(): boolean {
    return this.listenController !== undefined;
  }

  public stopListening() {
    this.listenController?.abort();
    this.listenController = undefined;
  }

  public override addEventListener<K extends keyof M>(
    type: Extract<K, string>,
    listener: ((event: CustomEvent<M[K]>) => void) | {
      handleEvent: (event: CustomEvent<M[K]>) => void;
    } | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.listen();

    const signal = AbortSignal.any([
      ...(options && typeof options === "object" && options.signal
        ? [options.signal]
        : []),
      this.listenController!.signal,
    ]);

    const capture = typeof options === "boolean"
      ? options
      : Boolean(options?.capture);

    const addOptions = Object.assign({}, options, { signal, capture });

    super.addEventListener(type, listener as EventListener, addOptions);
  }
}
