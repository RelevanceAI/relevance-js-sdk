import {type Attachment, Client} from "./client.ts";
import type {TaskStatus} from "@relevanceai/sdk";
import type {Region} from "./region.ts";
import {resetSubscribeBackoff, statusToStates, Task, type TaskMetadata, type TaskState,} from "./task.ts";
import {randomUUID} from "./utils.ts";

export interface AgentConfig {
  agent_id: string;
  public: boolean;
  name?: string;
  description?: string;
  emoji?: string;
  insert_date_: string;
  update_date_: string;
  model: string;
}

type SortDirection = "asc" | "desc";

type GetTaskOptionSort =
  | { createdAt: SortDirection }
  | { updatedAt: SortDirection };

type GetTaskOptions = {
  pageSize?: number;
  page?: number;
  sort?: GetTaskOptionSort;
  search?: string;
  filter?: {
    status?: TaskStatus[];
  };
};

function sortOptionsToParam(
  sort: GetTaskOptionSort,
): { insert_date: SortDirection } | { update_date: SortDirection } {
  if ("createdAt" in sort) {
    return { insert_date: sort.createdAt };
  } else if ("updatedAt" in sort) {
    return { update_date: sort.updatedAt };
  }

  throw new Error("invalid sort option");
}

const taskPrefixDelimiter = "_-_";

export class Agent {
  public static async get(
    id: string,
    client: Client = Client.default(),
  ): Promise<Agent> {
    const config = await Agent.#fetchConfig(id, client);
    return new Agent(config, client);
  }

  static #fetchConfig(
    agentId: string,
    client: Client = Client.default(),
  ): Promise<AgentConfig> {
    return client.fetch<{ agent: AgentConfig }>(`/agents/${agentId}/get`).then((
      { agent },
    ) => agent);
  }

  readonly #config: AgentConfig;
  private readonly client: Client;

  public constructor(config: AgentConfig, client: Client) {
    this.client = client;
    this.#config = config;
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

  public get createdAt(): Date {
    return new Date(this.#config.insert_date_);
  }

  public get updatedAt(): Date {
    return new Date(this.#config.update_date_);
  }

  public get region(): Region {
    return this.client.region;
  }

  public get project(): string {
    return this.client.project;
  }

  public getTask(taskId: string): Promise<Task> {
    return Task.get(taskId, this, this.client);
  }

  public async getTasks(
    {
      sort = { createdAt: "asc" },
      pageSize = 100,
      page = 1,
      search,
      filter,
    }: GetTaskOptions = {},
  ): Promise<Task[]> {
    const filtersParam = [{
      condition: "==",
      condition_value: [this.id],
      field: "conversation.agent_id",
      filter_type: "exact_match",
    }];

    if (filter) {
      for (const [field, value] of Object.entries(filter)) {
        switch (field) {
          case "status":
            filtersParam.push({
              condition: "==",
              condition_value: value.flatMap((s) => statusToStates(s)),
              field: "conversation.state",
              filter_type: "exact_match",
            });
        }
      }
    }

    const sortParam = sortOptionsToParam(sort);

    const query = new URLSearchParams([
      ["filters", JSON.stringify(filtersParam)],
      ["sort", JSON.stringify([sortParam])],
      ["page_size", pageSize.toString()],
      ["page", page.toString()],
    ]);

    if (search?.trim()) {
      query.set("query", search.trim());
    }

    const { results } = await this.client.fetch<
      { results: { metadata: TaskMetadata }[] }
    >(
      `/agents/conversations/list?${query.toString()}` as "/agents/conversations/list",
    );

    return results.map((r) => new Task(r.metadata, this, this.client));
  }

  public async sendMessage(message: string): Promise<Task>;
  public async sendMessage(message: string, task: Task): Promise<Task>;
  public async sendMessage(
    message: string,
    attachments: (Attachment | File)[],
  ): Promise<Task>;
  public async sendMessage(
    message: string,
    attachments: (Attachment | File)[],
    task: Task,
  ): Promise<Task>;
  public async sendMessage(
    message: string,
    attachOrTask?: (Attachment | File)[] | Task,
    maybeTask?: Task,
  ): Promise<Task> {
    const hasAttachments = Array.isArray(attachOrTask);
    const attachFiles = hasAttachments ? attachOrTask : [];
    const task = hasAttachments ? maybeTask : attachOrTask;

    let taskId: string | undefined;
    // embed keys require a task prefixing for new tasks
    if (!task && this.client.isEmbedKey()) {
      taskId = [this.client.key.taskPrefix, await randomUUID()].join(
        taskPrefixDelimiter,
      );
    } else if (task) {
      taskId = task.id;
    }

    const attachments: Attachment[] = [];
    for (const item of attachFiles) {
      attachments.push(
        item instanceof File ? await this.client.uploadTempFile(item) : item,
      );
    }

    const res = await this.client.fetch<{
      conversation_id: string;
      state: TaskState;
    }>("/agents/trigger", {
      method: "POST",
      body: JSON.stringify({
        agent_id: this.#config.agent_id,
        conversation_id: taskId,
        message: {
          role: "user",
          content: message,
          attachments: attachments.map(({ fileName, fileUrl }) => ({
            file_name: fileName,
            file_url: fileUrl,
          })),
        },
      }),
    });

    if (task) {
      task[resetSubscribeBackoff]();
    }

    return task ?? this.getTask(res.conversation_id);
  }
}
