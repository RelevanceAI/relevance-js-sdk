import { GenericMessage } from "./task.ts";

export interface AgentErrorMessageContent {
  type: "agent-error";
    errors: { body: string }[];
}

export class AgentErrorMessage
  extends GenericMessage<AgentErrorMessageContent> {
    public get errors(): string[] {
        return this.message.content.errors.map((e) => e.body);
    }

    public get lastError(): string {
        return this.errors.at(-1)!;
    }
}
