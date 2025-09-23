import { Agent } from "./agent.ts";
import { Client } from "./client.ts";
import { Emitter } from "./emitter.ts";
import { TaskErrorEvent, TaskMessageEvent, TaskStatusEvent } from "./event.ts";
import {
  AgentErrorMessage,
  type AgentErrorMessageContent,
} from "./message/agent-error.ts";
import { AgentMessage, type AgentMessageContent } from "./message/agent.ts";
import type { AnyTaskMessage, TaskMessageData } from "./message/task.ts";
import { ToolMessage, type ToolMessageContent } from "./message/tool.ts";
import { UserMessage, type UserMessageContent } from "./message/user.ts";
import { abortPromise, delay } from "./utils.ts";

export type TaskState =
  | "idle"
  | "starting-up"
  | "running"
  | "pending-approval"
  | "waiting-for-capacity"
  | "cancelled"
  | "timed-out"
  | "escalated"
  | "unrecoverable"
  | "paused"
  | "completed"
  | "errored-pending-approval"
  | "queued-for-approval"
  | "queued-for-rerun";

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

export type TaskMetadata = {
  knowledge_set: string;
  insert_date: string;
  update_date: string;
  conversation: {
    created_by_user_id: string;
    state: TaskState;
    title: string;
  };
};

type TaskEventMap = {
  error: { message: AgentErrorMessage };
  status: { status: TaskStatus };
  message: { message: AgentMessage | UserMessage };
};

/**
 * Converts an AgentTaskState to a simplified TaskStatus.
 *
 * @dev
 *   We want to simplify because our states are simplified in the UI and also
 *   some states have combined reasoning that the consumer does not need to care
 *   about. Ie. "queued-for-approval" "queued-for-rerun" should just be "queued".
 *
 * @param {AgentTaskState} state The agent task state to convert.
 * @returns {TaskStatus} The simplified task status.
 */
export function stateToStatus(state: TaskState): TaskStatus {
  switch (state) {
    case "paused":
      return "paused";

    case "idle":
      return "idle";

    case "starting-up":
    case "waiting-for-capacity":
    case "queued-for-approval":
    case "queued-for-rerun":
      return "queued";

    case "running":
      return "running";

    case "pending-approval":
    case "escalated":
      return "action";

    case "cancelled":
      return "cancelled";

    case "completed":
      return "completed";

    case "timed-out":
    case "unrecoverable":
    case "errored-pending-approval":
      return "error";

    default:
      throw new Error(
        `unhandled task state: ${state}`,
      );
  }
}

/**
 * Reverses {@link stateToStatus} returning the group of task states a _simplified_
 * status may relate to.
 *
 * @see {stateToStatus}
 * @param {TaskStatus} status
 * @returns {TaskState[]}
 */
export function statusToStates(status: TaskStatus): TaskState[] {
  switch (status) {
    case "not-started":
      // a special sdk-only status
      return [];

    case "idle":
      return ["idle"];

    case "paused":
      return ["paused"];

    case "queued":
      return [
        "starting-up",
        "waiting-for-capacity",
        "queued-for-approval",
        "queued-for-rerun",
      ];

    case "running":
      return ["running"];

    case "action":
      return ["pending-approval", "escalated"];

    case "completed":
      return ["completed"];

    case "cancelled":
      return ["cancelled"];

    case "error":
      return ["errored-pending-approval", "timed-out", "unrecoverable"];
  }
}

export const resetSubscribeBackoff = Symbol("resetSubscribeBackoff");

export class Task extends Emitter<TaskEventMap> {
  public static async get(
    id: string,
    agentOrAgentId: Agent | string,
    client: Client = Client.default(),
  ): Promise<Task> {
    const agent = typeof agentOrAgentId === "string"
      ? await Agent.get(agentOrAgentId, client)
      : agentOrAgentId;

    const metadata = await Task.#fetchMetadata(id, agent.id, client);

    return new Task(metadata, agent, client);
  }

  static #fetchMetadata(
    id: string,
    agentId: string,
    client: Client,
  ): Promise<TaskMetadata> {
    return client.fetch<{ metadata: TaskMetadata }>(
      `/agents/${agentId}/tasks/${id}/metadata`,
    ).then(({ metadata }) => metadata);
  }

  #controller: AbortController | undefined;
  #backoffMs: number = 1000;
  #lastUpdatedAt: string | undefined;
  #delayController: AbortController | undefined;

  #metadata: TaskMetadata;

  public readonly agent: Agent;
  readonly #client: Client;

  public constructor(
    metadata: TaskMetadata,
    agent: Agent,
    client: Client = Client.default(),
  ) {
    super();
    this.#client = client;
    this.#metadata = metadata;
    this.agent = agent;
  }

  public get id(): string {
    return this.#metadata.knowledge_set;
  }

  public get title(): string {
    return this.#metadata.conversation.title ?? "";
  }

  public get status(): TaskStatus {
    return stateToStatus(this.#metadata.conversation.state);
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

  public async getMessages(
    { from = new Date(0) }: { from?: Date } = {},
  ): Promise<AnyTaskMessage[]> {
    const url = `/agents/${this.agent.id}/tasks/${this.id}/view` as const;
    const res = await this.#client.fetch<{ results: TaskMessageData[] }>(url, {
      method: "POST",
      body: JSON.stringify({
        page_size: 1_000, // @todo: pagination
        cursor: {
          after: from.toISOString(),
        },
      }),
    });

    // message should be in ascending order
    return res.results.reverse().map((data) => {
      switch (data.content.type) {
        case "agent-error":
          return new AgentErrorMessage(
            data as TaskMessageData<AgentErrorMessageContent>,
          );

        case "agent-message":
          return new AgentMessage(
            data as TaskMessageData<AgentMessageContent>,
          );

        case "tool-run":
          return new ToolMessage(
            data as TaskMessageData<ToolMessageContent>,
          );

        case "user-message":
          return new UserMessage(
            data as TaskMessageData<UserMessageContent>,
          );

        default:
          throw new Error("unknown message response");
      }
    });
  }

  protected async refresh(): Promise<void> {
    this.#metadata = await Task.#fetchMetadata(
      this.id,
      this.agent.id,
      this.#client,
    );
  }

  public [resetSubscribeBackoff](): void {
    this.#backoffMs = 1000;
    this.#delayController?.abort();
  }

  public subscribe() {
    if (this.isSubscribed()) {
      return;
    }

    this.#controller = new AbortController();
    const signal = this.#controller.signal;

    let currentStatus: TaskStatus = this.status;
    const messagesCursor = new Date(0);

    const emitted = new Set<string>();
    let lastMessage: AnyTaskMessage | null = null;
    const pendingTools = new Map<string, ToolMessage>();

    // Initialize backoff and tracking
    this.#backoffMs = 1000;
    this.#lastUpdatedAt = this.#metadata.update_date;

    void (async () => {
      while (this.isSubscribed() && !signal.aborted) {
        try {
          const [, result] = await Promise.allSettled([
            this.refresh(),
            this.getMessages({ from: messagesCursor }),
          ]);

          if (!this.isSubscribed() || signal.aborted) {
            break;
          }

          const messages = result.status === "fulfilled" ? result.value : [];

          // Track if any changes occurred
          let hasChanges = false;

          // Check for status changes
          if (this.status !== currentStatus) {
            currentStatus = this.status;
            this.dispatchEvent(new TaskStatusEvent(this.status));
            hasChanges = true;
          }

          // Check for metadata update_date changes
          if (this.#metadata.update_date !== this.#lastUpdatedAt) {
            this.#lastUpdatedAt = this.#metadata.update_date;
            hasChanges = true;
          }

          // Process messages
          if (messages.length) {
            hasChanges = true;

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

                  this.dispatchEvent(new TaskMessageEvent(message));
                  break;
                }

                case "agent-message":
                case "user-message":
                  this.dispatchEvent(
                    new TaskMessageEvent(message),
                  );
              }

              lastMessage = message;
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

          // Apply backoff logic
          if (hasChanges) {
            // Reset backoff on any changes
            this.#backoffMs = 1000;
          } else if (!this.isRunning() && lastMessage?.isAgent()) {
            // Apply exponential backoff when idle with last message from agent
            this.#backoffMs = Math.min(this.#backoffMs * 2, 60000);
          }
        } finally {
          // Wait for the backoff period or abort signal
          if (!signal.aborted) {
            // Create a new controller for this delay that can be aborted independently
            this.#delayController = new AbortController();

            await Promise.race([
              delay(this.#backoffMs),
              abortPromise(AbortSignal.any([
                signal,
                this.#delayController.signal,
              ])),
            ]);
          }
        }
      }
    })();
  }

  protected isSubscribed(): boolean {
    return this.#controller !== undefined;
  }

  public unsubscribe() {
    this.#delayController?.abort();
    this.#controller?.abort();
    this.#delayController = undefined;
    this.#controller = undefined;
  }

  public override addEventListener<K extends keyof TaskEventMap>(
    type: Extract<K, string>,
    listener: ((event: CustomEvent<TaskEventMap[K]>) => void) | {
      handleEvent: (event: CustomEvent<TaskEventMap[K]>) => void;
    } | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.subscribe();

    const signal = AbortSignal.any([
      ...(options && typeof options === "object" && options.signal
        ? [options.signal]
        : []),
      this.#controller!.signal,
    ]);

    const capture = typeof options === "boolean"
      ? options
      : Boolean(options?.capture);

    const addOptions = Object.assign({}, options, { signal, capture });

    super.addEventListener(type, listener as EventListener, addOptions);
  }
}
