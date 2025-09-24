import type { AnyTaskMessage, TaskMessageData } from "../message/task.ts";
import { Client } from "../client.ts";
import {
  Task,
  type TaskMetadata,
  type TaskStatus,
  type TaskStrategy,
} from "./task.ts";
import type { Workforce } from "../workforce.ts";
import {
  AgentErrorMessage,
  type AgentErrorMessageContent,
} from "../message/agent-error.ts";
import { AgentMessage, type AgentMessageContent } from "../message/agent.ts";
import { ToolMessage, type ToolMessageContent } from "../message/tool.ts";
import { UserMessage, type UserMessageContent } from "../message/user.ts";
import {
  WorkforceAgentMessage,
  type WorkforceAgentMessageContent,
} from "../message/workforce-agent.ts";
import {
  WorkforceAgentHandoverMessage,
  type WorkforceAgentHandoverMessageContent,
} from "../message/workforce-agent-handover.ts";

export class WorkforceStrategy implements TaskStrategy<Workforce> {
  public static async get(
    id: string,
    workforce: Workforce,
    client: Client = Client.default(),
  ): Promise<Task<Workforce>> {
    const subject = new this(id, workforce, client);
    const metadata = await subject.getMetadata();

    return new Task(metadata, subject);
  }

  public static convertStatus(): TaskStatus {
    return "not-implemented" as TaskStatus;
  }

  private readonly id: string;
  private readonly workforce: Workforce;
  private readonly client: Client;

  private constructor(id: string, workforce: Workforce, client: Client) {
    this.id = id;
    this.workforce = workforce;
    this.client = client;
  }

  public get subject(): Workforce {
    return this.workforce;
  }

  async getMessages(
    { after: _after }: { after?: Date },
  ): Promise<AnyTaskMessage[]> {
    const { results } = await this.client.fetch<{
      results: TaskMessageData[];
    }>(
      `/workforce/items/${this.workforce.id}/tasks/${this.id}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          page_size: 1_000, // @todo: pagination
          // @todo: cursor "before" :S
        }),
      },
    );

    return results.map((data) => {
      switch (data.content.type) {
        case "agent-error":
          return new AgentErrorMessage(
            data as TaskMessageData<AgentErrorMessageContent>,
          );

        case "agent-message":
          return new AgentMessage(
            data as TaskMessageData<AgentMessageContent>,
          );

        case "tool-run":
          return new ToolMessage(
            data as TaskMessageData<ToolMessageContent>,
          );

        case "user-message":
          return new UserMessage(
            data as TaskMessageData<UserMessageContent>,
          );

        case "workforce-agent-run":
          return new WorkforceAgentMessage(
            data as TaskMessageData<WorkforceAgentMessageContent>,
          );

        case "workforce-agent-handover":
          return new WorkforceAgentHandoverMessage(
            data as TaskMessageData<WorkforceAgentHandoverMessageContent>,
          );

        default:
          throw new Error("unknown message response");
      }
    });
  }

  async getMetadata(): Promise<TaskMetadata> {
    const { metadata } = await this.client.fetch<{
      metadata: {
        insert_date: string;
        title: string;
        update_date: string;
        requested_state: string;
      };
    }>(
      `/workforce/tasks/${this.id}/metadata`,
    );

    return {
      id: this.id,
      region: this.client.region,
      project: this.client.project,
      name: metadata.title,
      status: WorkforceStrategy.convertStatus(), // @todo: not implemented
      createdAt: new Date(metadata.insert_date),
      updatedAt: new Date(metadata.update_date),
    };
  }
}
