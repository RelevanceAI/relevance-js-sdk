import type { AgentTaskState } from "../agent.ts";
import { GenericMessage } from "./task.ts";

export interface WorkforceAgentMessageContent {
  type: "workforce-agent-run";
  task_details: {
    project: string;
    region: string;
    conversation_id: string;
    finished_state?: AgentTaskState;
    current_state?: AgentTaskState;
  };
  agent_details?: {
    agent_id: string;
    project: string;
    region: string;
    name?: string;
    emoji?: string;
    description?: string;
    deleted_reason?: "entity_deleted";
  };
}

export class WorkforceAgentMessage
  extends GenericMessage<WorkforceAgentMessageContent> {
}
