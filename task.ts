import { Client } from "./client.ts";
import {
  TaskErrorEvent,
  TaskMessageEvent,
  TaskStartEvent,
  TaskStatusEvent,
  TaskUpdateEvent,
} from "./events.ts";
import { AgentErrorMessage } from "./messages/agent-error.ts";
import { AgentMessage } from "./messages/agent.ts";
import type { TaskMessage } from "./messages/task.ts";
import { ToolMessage } from "./messages/tool.ts";
import { UserMessage } from "./messages/user.ts";
import { runInterval } from "./utils.ts";

export type TaskStatus =
  | "not-started"
  | "idle"
  | "queued"
  | "running"
  | "action"
  | "complete"
  | "error";

export abstract class Task<S, E extends Record<string, unknown>>
  extends EventTarget {
  public readonly subject: S;
  protected readonly client: Client;

  readonly #id: string | undefined;

  private listenController: AbortController | undefined;

  public abstract fetchMessages(
    fetchOptions?: { from?: Date },
  ): Promise<TaskMessage[]>;

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
            switch (message.type) {
              case "agent-error":
                this.dispatchEvent(
                  new TaskErrorEvent(message as AgentErrorMessage),
                );
                break;

              case "tool-run":
                this.dispatchEvent(new TaskUpdateEvent(message as ToolMessage));
                break;

              case "agent-message":
              case "user-message":
                this.dispatchEvent(
                  new TaskMessageEvent(message as AgentMessage | UserMessage),
                );
            }
          }

          messagesCursor.setTime(
            // +1 the api treats after inclusively
            messages.at(-1)!.createdAt.getTime() + 1,
          );
        }
      },
      15_000,
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

  public override addEventListener<K extends keyof E>(
    type: Extract<K, string>,
    listener: ((event: CustomEvent<E[K]>) => void) | {
      handleEvent: (event: CustomEvent<E[K]>) => void;
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

  public override removeEventListener<K extends keyof E>(
    type: Extract<K, string>,
    listener: ((event: CustomEvent<E[K]>) => void) | {
      handleEvent: (event: CustomEvent<E[K]>) => void;
    } | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.removeEventListener(type, listener as EventListener, options);
  }
}
