import type { AgentTaskState } from "./agent-task.ts";
import { Client } from "./client.ts";
import { randomUUID } from "./utils.ts";

interface AgentConfig {
  agent_id: string;
  public: boolean;
  name?: string;
  description?: string;
  emoji?: string;
}

const taskPrefixDelimiter = "_-_";

export class Agent {
  readonly #config: AgentConfig;
  private readonly client: Client;

  public static async fetch(
    id: string,
    cli: Client = Client.default(),
  ): Promise<Agent> {
    const config = await cli.fetch<{ agent: AgentConfig }>(
      `/agents/${id}/get`,
    );
    return new Agent(config.agent, cli);
  }

  private constructor(config: AgentConfig, client: Client) {
    this.#config = config;
    this.client = client;
  }

  public get id(): string {
    return this.#config.agent_id;
  }

  public get name(): string | undefined {
    return this.#config.name;
  }

  public get description(): string | undefined {
    return this.#config.description;
  }

  public get avatar(): string | undefined {
    return this.#config.emoji;
  }

  public isPublic(): boolean {
    return this.#config.public;
  }

  public async trigger(
    message: string,
    taskId?: string,
  ): Promise<{ taskId: string; state: AgentTaskState }> {
    // embed keys require a task prefixing for new tasks
    if (!taskId && this.client.isEmbedKey()) {
      taskId = [this.client.key.taskPrefix, await randomUUID()].join(
        taskPrefixDelimiter,
      );
    }

    const res = await this.client.fetch<{
      conversation_id: string;
      state: AgentTaskState;
    }>("/agents/trigger", {
      method: "POST",
      body: JSON.stringify({
        agent_id: this.#config.agent_id,
        conversation_id: taskId,
        message: {
          role: "user",
          content: message,
          attachments: [], // @todo
        },
      }),
    });

    return {
      taskId: res.conversation_id,
      state: res.state,
    };
  }
}
