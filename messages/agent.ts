import { TaskMessage } from "./task.ts";

export class AgentMessage extends TaskMessage<"agent-message"> {
  public get text(): string {
    return this.message.content.text;
  }
}
