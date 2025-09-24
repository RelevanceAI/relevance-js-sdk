import { type Agent, type AgentTaskState, stateToStatus } from "../agent.ts";
import { Client } from "../client.ts";
import {
  AgentErrorMessage,
  type AgentErrorMessageContent,
} from "../message/agent-error.ts";
import { AgentMessage, type AgentMessageContent } from "../message/agent.ts";
import type { AnyTaskMessage, TaskMessageData } from "../message/task.ts";
import { ToolMessage, type ToolMessageContent } from "../message/tool.ts";
import { UserMessage, type UserMessageContent } from "../message/user.ts";
import { Task, type TaskMetadata, type TaskStrategy } from "./task.ts";

export type AgentTaskMetadata = {
  knowledge_set: string;
  insert_date: string;
  update_date: string;
  conversation: {
    created_by_user_id: string;
    state: AgentTaskState;
    title: string;
  };
};

export class AgentStrategy implements TaskStrategy<Agent> {
  public static async get(
    id: string,
    agent: Agent,
    client: Client = Client.default(),
  ): Promise<Task<Agent>> {
    const subject = new this(id, agent, client);
    return new Task(await subject.getMetadata(), subject);
  }

  private readonly id: string;
  private readonly agent: Agent;
  private readonly client: Client;

  public constructor(id: string, agent: Agent, client: Client) {
    this.id = id;
    this.agent = agent;
    this.client = client;
  }

  public get subject(): Agent {
    return this.agent;
  }

  public async getMetadata(): Promise<TaskMetadata> {
    const { metadata } = await this.client.fetch<
      { metadata: AgentTaskMetadata }
    >(
      `/agents/${this.agent.id}/tasks/${this.id}/metadata`,
    );

    return {
      id: this.id,
      region: this.client.region,
      project: this.client.project,
      name: metadata.conversation.title,
      status: stateToStatus(metadata.conversation.state),
      createdAt: new Date(metadata.insert_date),
      updatedAt: new Date(metadata.update_date),
    };
  }

  public async getMessages(
    { after = new Date(0) }: { after?: Date } = {},
  ): Promise<AnyTaskMessage[]> {
    const url = `/agents/${this.agent.id}/tasks/${this.id}/view` as const;
    const res = await this.client.fetch<{ results: TaskMessageData[] }>(url, {
      method: "POST",
      body: JSON.stringify({
        page_size: 1_000, // @todo: pagination
        cursor: {
          after: after.toISOString(),
        },
      }),
    });

    // message should be in ascending order
    return res.results.reverse().map((data) => {
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

        default:
          throw new Error("unknown message response");
      }
    });
  }
}
