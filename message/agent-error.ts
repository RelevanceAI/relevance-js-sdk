import { TaskMessage } from "./task.ts";

export interface AgentErrorMessageContent {
  type: "agent-error";
}

export class AgentErrorMessage extends TaskMessage<AgentErrorMessageContent> {}
