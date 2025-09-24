import { GenericMessage } from "./task.ts";

export interface WorkforceAgentHandoverMessageContent {
  type: "workforce-agent-handover";
  task_details?: {
    project: string;
    region: string;
    conversation_id: string;
  };
  agent_details: {
    agent_id: string;
    project: string;
    region: string;
    name?: string;
    emoji?: string;
    description?: string;
    deleted_reason?: "entity_deleted";
  };
  trigger: {
    message: string;
  };
}

export class WorkforceAgentHandoverMessage
  extends GenericMessage<WorkforceAgentHandoverMessageContent> {
}
