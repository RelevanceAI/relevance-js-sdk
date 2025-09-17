import type { AgentMessage } from "./agent.ts";
import type { AgentErrorMessage } from "./agent-error.ts";
import type { ToolMessage } from "./tool.ts";
import type { UserMessage } from "./user.ts";

export type AnyTaskMessage =
  | AgentMessage
  | AgentErrorMessage
  | ToolMessage
  | UserMessage;

interface MessageContent {
  type: AnyTaskMessage["type"];
}

export interface TaskMessageData<C extends MessageContent = MessageContent> {
  item_id: string;
  insert_date_: string;
  content: C;
}

export abstract class TaskMessage<C extends MessageContent = MessageContent> {
  protected readonly message: TaskMessageData<C>;

  public constructor(message: TaskMessageData<C>) {
    this.message = message;
  }

  /**
   * The task's message type.
   *
   * @property {"agent-error" | "agent-message" | "tool-run" | "user-message"}
   */
  public get type(): C["type"] {
    return this.message.content.type;
  }

  /**
   * The task message ID. Used for referencing the message.
   *
   * @property {string}
   */
  public get id(): string {
    return this.message.item_id;
  }

  /**
   * The time the task was created.
   *
   * @property {Date}
   */
  public get createdAt(): Date {
    return new Date(this.message.insert_date_);
  }

  /**
   * Returns if the message was sent from the agent.
   *
   * @returns {boolean}
   */
  public isAgent(): boolean {
    return this.type === "agent-message";
  }
}
