import { Emitter } from "../emitter.ts";
import type { AnyTaskMessage } from "../message/task.ts";
import type { Region } from "../region.ts";
import type { ToolMessage } from "../message/tool.ts";
import { abortPromise, delay } from "../utils.ts";
import {
  TaskErrorEvent,
  TaskMessageEvent,
  TaskUpdateEvent,
} from "../event.ts";
import type { Workforce } from "../workforce.ts";
import type { Agent } from "../agent.ts";
import type { AgentErrorMessage } from "../message/agent-error.ts";

export type TaskStatus =
  | "not-started"
  | "idle"
  | "paused"
  | "queued"
  | "running"
  | "action"
  | "completed"
  | "cancelled"
  | "error";

export interface TaskMetadata {
  id: string;
  region: Region;
  project: string;
  status: TaskStatus;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type TaskEventMap = {
  updated: undefined;
  message: { message: AnyTaskMessage };
  error: { message: AgentErrorMessage };
};

export interface TaskStrategy<S> {
  subject: S;
  getMessages(options?: { after?: Date }): Promise<AnyTaskMessage[]>;
  getMetadata(): Promise<TaskMetadata>;
}

export const resetBackoffDuration = Symbol("resetBackoffDuration");

const backoffStartingDuration = 1_000;
const backoffMaxDuration = 60_000;

export class Task<
  S extends Agent | Workforce,
  E extends TaskEventMap = TaskEventMap,
> extends Emitter<E> {
  private subscribed: AbortController | null = null;

  private backoff: AbortController | null = null;
  private backoffDuration: number = 0;

  private readonly strategy: TaskStrategy<S>;
  #metadata: TaskMetadata;

  public constructor(metadata: TaskMetadata, strategy: TaskStrategy<S>) {
    super();
    this.strategy = strategy;
    this.#metadata = metadata;
  }

  public get subject(): S {
    return this.strategy.subject;
  }

  public get id(): string {
    return this.#metadata.id;
  }

  public get region(): Region {
    return this.#metadata.region;
  }

  public get project(): string {
    return this.#metadata.project;
  }

  public get name(): string {
    return this.#metadata.name;
  }

  public get status(): TaskStatus {
    return this.#metadata.status;
  }

  public get createdAt(): Date {
    return this.#metadata.createdAt;
  }

  public get updatedAt(): Date {
    return this.#metadata.updatedAt;
  }

  public getMessages(options?: { after?: Date }): Promise<AnyTaskMessage[]> {
    return this.strategy.getMessages(options);
  }

  public isRunning(): boolean {
    switch (this.status) {
      case "queued":
      case "running":
        return true;

      default:
        return false;
    }
  }

  #subscribe() {
    if (this.subscribed) {
      return;
    }

    const subscribed = new AbortController();
    this.subscribed = subscribed; // subscribed ref

    const isSubscribed = () => !subscribed.signal.aborted;

    this.backoffDuration = backoffStartingDuration;

    const cursor = new Date(0);
    const emitted = new Set<string>();
    const pending = new Map<string, ToolMessage>();

    void (async () => {
      while (isSubscribed()) {
        try {
          const [metadata, messages] = await Promise.all([
            this.strategy.getMetadata(),
            this.strategy.getMessages({ after: cursor }),
          ]);

          if (!isSubscribed()) {
            break;
          }

          let hasChanges = false;

          if (metadata.updatedAt > this.updatedAt) {
            this.dispatchEvent(new TaskUpdateEvent());
            hasChanges = true;
          }

          this.#metadata = metadata;

          if (messages.length) {
            for (const message of messages) {
              if (emitted.has(message.id)) {
                continue;
              }

              switch (message.type) {
                case "agent-error":
                  emitted.add(message.id);
                  this.dispatchEvent(new TaskErrorEvent(message));
                  break;

                case "tool-run": {
                  const { status } = message;
                  if (pending.get(message.id)?.status == status) {
                    // no change to the tool status
                    continue;
                  }

                  if (["pending", "running"].includes(status)) {
                    pending.set(message.id, message);
                  } else {
                    emitted.add(message.id);
                    pending.delete(message.id);
                  }

                  this.dispatchEvent(new TaskMessageEvent(message));
                  break;
                }

                case "agent-message":
                case "user-message":
                  hasChanges = true;
                  emitted.add(message.id);
                  this.dispatchEvent(
                    new TaskMessageEvent(message),
                  );
              }
            }

            let latest = messages.at(-1)!.createdAt;
            for (const message of pending.values()) {
              if (latest > message.createdAt) {
                latest = message.createdAt;
              }
            }

            cursor.setTime(latest.getTime());
          }

          if (hasChanges) {
            this.backoffDuration = backoffStartingDuration;
          } else if (!this.isRunning()) {
            this.backoffDuration = Math.min(
              this.backoffDuration * 2,
              backoffMaxDuration,
            );
          }
        } finally {
          if (isSubscribed()) {
            const backoff = new AbortController();
            this.backoff = backoff;

            await Promise.race([
              delay(this.backoffDuration),
              abortPromise(
                AbortSignal.any([subscribed.signal, backoff.signal]),
              ),
            ]);
          }
        }
      }
    })();
  }

  public unsubscribe() {
    this.subscribed?.abort();
    this.subscribed = null;

    this.backoff?.abort();
    this.backoff = null;
    this.backoffDuration = 0;
  }

  public [resetBackoffDuration]() {
    this.backoffDuration = backoffStartingDuration;
  }

  public override addEventListener<K extends keyof E>(
    type: Extract<K, string>,
    listener: ((event: CustomEvent<E[K]>) => void) | {
      handleEvent: (event: CustomEvent<E[K]>) => void;
    } | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.#subscribe();

    const signal = AbortSignal.any([
      ...(options && typeof options === "object" && options.signal
        ? [options.signal]
        : []),
      ...(this.subscribed ? [this.subscribed.signal] : []),
    ]);

    const capture = typeof options === "boolean"
      ? options
      : Boolean(options?.capture);

    const addOptions = Object.assign({}, options, { signal, capture });

    super.addEventListener(type, listener as EventListener, addOptions);
  }
}
