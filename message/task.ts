type AgentMessageContent = {
  type: "agent-message";
  text: string;
};

type AgentErrorMessageContent = {
  type: "agent-error";
};

type ToolMessageContent = {
  type: "tool-run";
  tool_run_state: "cancelled" | "error" | "finished" | "pending" | "running";
};

type UserMessageContent = {
  type: "user-message";
  text: string;
};

type MessageContentMap = {
  "agent-message": AgentMessageContent;
  "agent-error": AgentErrorMessageContent;
  "tool-run": ToolMessageContent;
  "user-message": UserMessageContent;
};

export interface TaskMessageData<
  K extends keyof MessageContentMap = keyof MessageContentMap,
> {
  item_id: string;
  insert_date_: string;
  content: MessageContentMap[K];
}

export abstract class TaskMessage<
  T extends keyof MessageContentMap = keyof MessageContentMap,
> {
  protected readonly message: TaskMessageData<T>;

  public constructor(message: TaskMessageData<T>) {
    this.message = message;
  }

  public get type(): T {
    return this.message.content.type as T;
  }

  public get id(): string {
    return this.message.item_id;
  }

  public get createdAt(): Date {
    return new Date(this.message.insert_date_);
  }
}

import type { AgentMessage } from "./agent.ts";
import type { AgentErrorMessage } from "./agent-error.ts";
import type { ToolMessage } from "./tool.ts";
import type { UserMessage } from "./user.ts";

export type AnyTaskMessage =
  | AgentMessage
  | AgentErrorMessage
  | ToolMessage
  | UserMessage;
