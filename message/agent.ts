import type { Agent } from "../agent.ts";
import { GenericMessage, type TaskMessageData } from "./task.ts";

export interface AgentMessageContent {
  type: "agent-message";
  text: string;
  generating?: boolean;
  thinking?: string[];
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
  
  public get thoughts(): string[] {
    return this.message.content.thinking ?? [];
  }

  public isGenerating(): boolean {
    return this.message.content.generating ?? false;
  }

  /**
   * @deprecated
   * Do not use this method as it is not a reliable indicator of whether the
   * agent is thinking. It only indicates whether the message content includes
   * a flag that suggests the agent is considering tool calls, but this may
   * not always be present or accurate. This method will be removed in next 
   * major release.
   */
  public isThought(): boolean {
    return this.message.content.thought_about_tool_calls ?? false;
  }

}
