import { type Attachment, Client } from "./client.ts";
import type { Region } from "./region.ts";
import { randomUUID } from "./utils.ts";
import {
  AgentStrategy,
  type AgentTaskMetadata,
} from "./task/agent-strategy.ts";
import { resetBackoffDuration, Task, type TaskStatus } from "./task/task.ts";

export interface AgentConfig {
  agent_id: string;
  public: boolean;
  project: string;
  name?: string;
  description?: string;
  emoji?: string;
  insert_date_: string;
  update_date_: string;
  model: string;
}

export type AgentTaskState =
  | "idle"
  | "starting-up"
  | "running"
  | "pending-approval"
  | "waiting-for-capacity"
  | "cancelled"
  | "timed-out"
  | "escalated"
  | "unrecoverable"
  | "paused"
  | "completed"
  | "errored-pending-approval"
  | "queued-for-approval"
  | "queued-for-rerun";

/**
 * Converts an AgentTaskState to a simplified TaskStatus.
 *
 * @dev
 *   We want to simplify because our states are simplified in the UI and also
 *   some states have combined reasoning that the consumer does not need to care
 *   about. i.e. "queued-for-approval" "queued-for-rerun" should just be "queued".
 *
 * @param {AgentTaskState} state The agent task state to convert.
 * @returns {TaskStatus} The simplified task status.
 */
export function stateToStatus(state: AgentTaskState): TaskStatus {
  switch (state) {
    case "paused":
      return "paused";

    case "idle":
      return "idle";

    case "starting-up":
    case "waiting-for-capacity":
    case "queued-for-approval":
    case "queued-for-rerun":
      return "queued";

    case "running":
      return "running";

    case "pending-approval":
    case "escalated":
      return "action";

    case "timed-out":
      return "error";

    case "cancelled":
      return "cancelled";

    case "completed":
      return "completed";

    case "unrecoverable":
    case "errored-pending-approval":
      return "error";

    default:
      throw new Error(
        `unhandled task state: ${state}`,
      );
  }
}

/**
 * Reverses {@link stateToStatus} returning the group of task states a _simplified_
 * status may relate to.
 *
 * @see {stateToStatus}
 * @param {TaskStatus} status
 * @returns {AgentTaskState[]}
 */
function statusToStates(status: TaskStatus): AgentTaskState[] {
  switch (status) {
    case "not-started":
      // a special sdk-only status
      return [];

    case "idle":
      return ["idle"];

    case "paused":
      return ["paused"];

    case "queued":
      return [
        "starting-up",
        "waiting-for-capacity",
        "queued-for-approval",
        "queued-for-rerun",
      ];

    case "running":
      return ["running"];

    case "action":
      return ["pending-approval", "escalated"];

    case "completed":
      return ["completed"];

    case "cancelled":
      return ["cancelled"];

    case "error":
      return ["errored-pending-approval", "timed-out", "unrecoverable"];
  }
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

function taskSortOptionsToParam(
  sort: GetTaskOptionSort,
): { insert_date: SortDirection } | { update_date: SortDirection } {
  if ("createdAt" in sort) {
    return { insert_date: sort.createdAt };
  } else if ("updatedAt" in sort) {
    return { update_date: sort.updatedAt };
  }

  throw new Error("invalid sort option");
}

type GetAllOptions = {
  pageSize?: number;
  page?: number;
};

const taskPrefixDelimiter = "_-_";

export class Agent {
  public static async get(
    id: string,
    client: Client = Client.default(),
  ): Promise<Agent> {
    const config = await Agent.#fetchConfig(id, client);
    return new Agent(config, client);
  }

  public static async getAll(
    {
      page = 1,
      pageSize = 20,
    }: GetAllOptions = {},
    client: Client = Client.default(),
  ): Promise<Agent[]> {
    const { results } = await client.fetch<{ results: AgentConfig[] }>(
      "/agents/list",
      {
        method: "POST",
        body: JSON.stringify({
          page_size: pageSize,
          page,
        }),
      },
    );

    return results.map((config) => new Agent(config, client));
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

  public get region(): Region {
    return this.client.region;
  }

  public get project(): string {
    return this.#config.project;
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

  public getTask(taskId: string): Promise<Task<Agent>> {
    return AgentStrategy.get(taskId, this, this.client);
  }

  public async getTasks(
    {
      sort = { createdAt: "asc" },
      pageSize = 100,
      page = 1,
      search,
      filter,
    }: GetTaskOptions = {},
  ): Promise<Task<Agent>[]> {
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

    const sortParam = taskSortOptionsToParam(sort);

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
      { results: { metadata: AgentTaskMetadata }[] }
    >(
      `/agents/conversations/list?${query.toString()}` as "/agents/conversations/list",
    );

    return results.map(({ metadata }) =>
      new Task(
        {
          id: metadata.knowledge_set,
          region: this.client.region,
          project: this.client.project,
          name: metadata.conversation.title,
          status: stateToStatus(metadata.conversation.state),
          createdAt: new Date(metadata.insert_date),
          updatedAt: new Date(metadata.update_date),
        },
        new AgentStrategy(
          metadata.knowledge_set,
          this,
          this.client,
        ),
      )
    );
  }

  public async sendMessage(message: string): Promise<Task<Agent>>;
  public async sendMessage(
    message: string,
    task: Task<Agent>,
  ): Promise<Task<Agent>>;
  public async sendMessage(
    message: string,
    attachments: (Attachment | File)[],
  ): Promise<Task<Agent>>;
  public async sendMessage(
    message: string,
    attachments: (Attachment | File)[],
    task: Task<Agent>,
  ): Promise<Task<Agent>>;
  public async sendMessage(
    message: string,
    attachOrTask?: (Attachment | File)[] | Task<Agent>,
    maybeTask?: Task<Agent>,
  ): Promise<Task<Agent>> {
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
      state: AgentTaskState;
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
      task[resetBackoffDuration]();
    }

    return task ?? await this.getTask(res.conversation_id);
  }
}
