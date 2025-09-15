import { TaskMessage } from "./task.ts";

export interface AgentMessageContent {
  type: "agent-message";
  text: string;
}

export class AgentMessage extends TaskMessage<AgentMessageContent> {
  public get text(): string {
    return this.message.content.text;
  }

  public get agentId(): string {
    return "";
  }
}
