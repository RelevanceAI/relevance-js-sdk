import { Client } from "./client.ts";
import { TASK_PREFIX_DELIM } from "./const.ts";
import type { Region } from "./region.ts";
import { resetBackoffDuration, type Task } from "./task/task.ts";
import { WorkforceStrategy } from "./task/workforce-strategy.ts";
import { randomUUID } from "./utils.ts";

type WorkforceConfig = {
  id: string;
  workforce_metadata: {
    name: string;
  };
};

export class Workforce {
  public static async get(
    id: string,
    client: Client = Client.default(),
  ): Promise<Workforce> {
    const config = await client.fetch<WorkforceConfig>(
      `/workforce/items/${id}`,
    );

    return new Workforce(config, client);
  }

  private readonly client: Client;

  #config: WorkforceConfig;

  public constructor(config: WorkforceConfig, client: Client) {
    this.#config = config;
    this.client = client;
  }

  public get id(): string {
    return this.#config.id;
  }

  public get region(): Region {
    return this.client.region;
  }

  public get project(): string {
    return this.client.project;
  }

  public get name(): string {
    return this.#config.workforce_metadata.name;
  }

  public async getTask(id: string): Promise<Task<Workforce>> {
    return await WorkforceStrategy.get(id, this, this.client);
  }

  public async sendMessage(
    message: string,
    task?: Task<Workforce>,
  ): Promise<Task<Workforce>> {
    let taskId: string | undefined;
    // embed keys require a task prefixing for new tasks
    if (!task && this.client.isEmbedKey()) {
      taskId = [this.client.key.taskPrefix, await randomUUID()].join(
        TASK_PREFIX_DELIM,
      );
    } else if (task) {
      taskId = task.id;
    }

    const { workforce_task_id: taskIdResponse } = await this.client.fetch<
      { workforce_task_id: string }
    >(
      "/workforce/trigger",
      {
        method: "POST",
        body: JSON.stringify({
          workforce_id: this.id,
          workforce_task_id: taskId,
          trigger: {
            message: {
              role: "user",
              content: message,
              attachments: [],
            },
          },
        }),
      },
    );

    if (task) {
      task[resetBackoffDuration]();
    }

    return task ?? this.getTask(taskIdResponse);
  }
}
