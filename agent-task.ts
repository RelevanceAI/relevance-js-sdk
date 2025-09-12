import type { Agent } from "./agent.ts";
import { AgentErrorMessage } from "./messages/agent-error.ts";
import { AgentMessage } from "./messages/agent.ts";
import type { TaskMessage, TaskMessageData } from "./messages/task.ts";
import { ToolMessage } from "./messages/tool.ts";
import { UserMessage } from "./messages/user.ts";
import { Task, type TaskStatus } from "./task.ts";

type AgentTaskEvents = {
  start: { status: TaskStatus };
  status: { status: TaskStatus };
  message: { message: TaskMessage<"agent-message" | "user-message"> };
  update: { message: TaskMessage<"tool-run"> };
};

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

type FetchStatusResponse = {
  metadata: {
    conversation: {
      state: AgentTaskState;
    };
  };
};

/**
 * Converts an AgentTaskState to a simplified TaskStatus.
 *
 * @internal
 *
 * @param {AgentTaskState} state The agent task state to convert.
 * @returns {TaskStatus} The simplified task status.
 */
function stateToStatus(state: AgentTaskState): TaskStatus {
  switch (state) {
    case "paused":
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
    case "completed":
      return "complete";

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
 * AgentTask represents a conversation task with an AI agent. It extends the
 * base Task class with agent-specific functionality for sending messages and
 * retrieving conversation history.
 *
 * @see {@link Task} for the base task functionality.
 * @see {@link Agent} for the agent this task is associated with.
 *
 * @class AgentTask
 * @extends Task<Agent, AgentTaskEvents>
 */
export class AgentTask extends Task<Agent, AgentTaskEvents> {
  /**
   * Sends a message to the agent. This method triggers the agent with the
   * message and updates the task ID if this is the first message.
   *
   * Note: This method is asynchronous but doesn't return a promise. Use event
   * listeners to track the response.
   *
   * @param {string} message
   */
  public sendMessage(message: string) {
    this.subject.trigger(message, this.id || undefined).then(
      ({ taskId, state }) => {
        // new task was created
        if (!this.id) {
          this.setId(taskId, stateToStatus(state));
        }
      },
    );
  }

  /**
   * Fetches the current status of the task from the API.
   *
   * @returns {Promise<TaskStatus>} The current task status.
   * @throws {Error} if the agent or task ID is missing.
   */
  public override async fetchStatus(): Promise<TaskStatus> {
    if (!this.subject.id) {
      throw new Error("expecting agent id");
    }

    if (!this.id) {
      return "not-started";
    }

    const url = `/agents/${this.subject.id}/tasks/${this.id}/metadata` as const;
    const res = await this.client.fetch<FetchStatusResponse>(url);

    return stateToStatus(res.metadata.conversation.state);
  }

  /**
   * Fetches messages from the conversation.
   *
   * @param {Object} [options] Optional fetch options.
   * @param {Date} [options.from] Fetch messages after this timestamp.
   *
   * @returns {Promise<TaskMessage[]>} Array of messages in ascending order.
   * @throws {Error} if the agent or task ID is missing.
   */
  override async fetchMessages(
    { from = new Date(0) }: { from?: Date } = {},
  ): Promise<TaskMessage[]> {
    if (!this.subject.id) {
      throw new Error("expecting agent id");
    }

    if (!this.id) {
      throw new Error("expecting task id");
    }

    const url = `/agents/${this.subject.id}/tasks/${this.id}/view` as const;
    const res = await this.client.fetch<{ results: TaskMessageData[] }>(url, {
      method: "POST",
      body: JSON.stringify({
        cursor: {
          after: from.toISOString(),
        },
      }),
    });

    // message should be in ascending order
    return res.results.reverse().map((data) => {
      switch (data.content.type) {
        case "agent-error":
          return new AgentErrorMessage(data as TaskMessageData<"agent-error">);

        case "agent-message":
          return new AgentMessage(data as TaskMessageData<"agent-message">);

        case "tool-run":
          return new ToolMessage(data as TaskMessageData<"tool-run">);

        case "user-message":
          return new UserMessage(data as TaskMessageData<"user-message">);

        default:
          throw new Error("unknown message response");
      }
    });
  }
}
