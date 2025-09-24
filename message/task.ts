import type { AgentMessage } from "./agent.ts";
import type { AgentErrorMessage } from "./agent-error.ts";
import type { ToolMessage } from "./tool.ts";
import type { UserMessage } from "./user.ts";
import type { WorkforceAgentMessage } from "./workforce-agent.ts";
import type { WorkforceAgentHandoverMessage } from "./workforce-agent-handover.ts";

export type AnyTaskMessage =
  | AgentMessage
  | AgentErrorMessage
  | ToolMessage
  | UserMessage
  | WorkforceAgentMessage
  | WorkforceAgentHandoverMessage;

export type TaskMessageType = AnyTaskMessage["type"];

interface MessageContent {
  type: AnyTaskMessage["type"];
}

export interface TaskMessageData<C extends MessageContent = MessageContent> {
  item_id: string;
  insert_date_: string;
  content: C;
}

export abstract class GenericMessage<
  C extends MessageContent = MessageContent,
> {
  protected readonly message: TaskMessageData<C>;

  public constructor(message: TaskMessageData<C>) {
    this.message = message;
  }

  /**
   * The task's message type.
   *
   * @property {TaskMessageType}
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
  public isAgent(): this is AgentMessage {
    return this.type === "agent-message";
  }

  /**
   * Returns if the message is from a tool.
   *
   * @returns {boolean}
   */
  public isTool(): this is ToolMessage {
    return this.type === "tool-run";
  }

  /**
   * Returns if the message was sent from a user.
   *
   * @returns {boolean}
   */
  public isUser(): this is UserMessage {
    return this.type === "user-message";
  }

  /**
   * Returns if the message was an error sent by the agent.
   *
   * @returns {boolean}
   */
  public isAgentError(): this is AgentErrorMessage {
    return this.type === "agent-error";
  }
}
