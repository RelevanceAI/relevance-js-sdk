import type { Agent } from "../agent.ts";
import { GenericMessage, type TaskMessageData } from "./task.ts";

export interface AgentMessageContent {
  type: "agent-message";
  text: string;
  thought_about_tool_calls?: boolean;
}

export class AgentMessage extends GenericMessage<AgentMessageContent> {
  public readonly agent?: Agent;

  public constructor(
    message: TaskMessageData<AgentMessageContent>,
    agent?: Agent,
  ) {
    super(message);
    this.agent = agent;
  }

  public get text(): string {
    return this.message.content.text;
  }

  public get agentId(): string {
    return this.agent?.id ?? "";
  }

  public isThought(): boolean {
    return this.message.content.thought_about_tool_calls ?? false;
  }
}
