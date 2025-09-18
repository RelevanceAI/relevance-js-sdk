import type { Region } from "../region.ts";
import { GenericMessage } from "./task.ts";

type ToolState =
  | "cancelled"
  | "error"
  | "finished"
  | "pending"
  | "running";

export type ToolStatus =
  | "unknown"
  | "cancelled"
  | "error"
  | "completed"
  | "pending"
  | "running";

export interface ToolMessageContent {
  type: "tool-run";
  tool_run_state: ToolState;
  output: Record<string, unknown> & {
    _agent_conversation_details?: {
      agent_id: string;
      conversation_id: string;
    };
  };
  params: {
    resolved?: Record<string, unknown>;
    valid: boolean;
  };
  errors: { body: string; raw: string; step_name: string }[];
  tool_config: {
    id: string;
    type: "tool" | "agent";
    region: Region;
    project: string;
  };
}

export class ToolMessage extends GenericMessage<ToolMessageContent> {
  /**
   * The tool status for _this_ message.
   *
   * @property {ToolStatus}
   */
  public get status(): ToolStatus {
    const status = this.message.content.tool_run_state;

    switch (status) {
      case "cancelled":
      case "pending":
      case "running":
      case "error":
        return status;

      // agents and tools have different end statuses, align them
      case "finished":
        return "completed";

      default:
        return "unknown";
    }

    // deno linter
    return "unknown";
  }

  /**
   * Parameters used to call the tool.
   *
   * @property {object}
   */
  public get params(): Record<string, unknown> | null {
    return this.message.content.params.resolved ?? null;
  }

  /**
   * The tool's output. Will be `null` if the status is **not** "finished".
   *
   * @property {object|null}
   */
  public get output(): Record<string, unknown> | null {
    return this.status === "completed" ? this.message.content.output : null;
  }

  /**
   * Tool errors.
   *
   * @property {array}
   * @see {@link ToolMessage#hasErrors}
   */
  public get errors(): { stepName: string; message: string }[] {
    return this.message.content.errors.map((e) => ({
      stepName: e.step_name,
      message: e.body,
    }));
  }

  /**
   * The tool's ID.
   *
   * @property {string}
   */
  public get toolId(): string {
    return this.message.content.tool_config.id;
  }

  /**
   * The agent's ID, if a sub-agent.
   *
   * @property {string}
   * @see {@link ToolMessage#isSubAgent}
   */
  public get agentId(): string | null {
    return this.isSubAgent()
      ? this.message.content.output._agent_conversation_details?.agent_id!
      : null;
  }

  /**
   * The tool/agent's corresponding project.
   *
   * @property {string}
   */
  public get project(): string {
    return this.message.content.tool_config.project;
  }

  /**
   * The tool/agent's corresponding region.
   *
   * @property {Region}
   */
  public get region(): Region {
    return this.message.content.tool_config.region;
  }

  /**
   * The task ID the sub-agent ran. Will be `null` if the tool message is not
   * a sub-agent.
   *
   * @property {string}
   * @see {@link ToolMessage.isSubAgent}
   */
  public get subAgentTaskId(): string | null {
    return this.message.content.output._agent_conversation_details
      ?.conversation_id ?? null;
  }

  /**
   * Checks if the tool message came from a sub-agent.
   *
   * @returns {boolean}
   */
  public isSubAgent(): boolean {
    return this.message.content.tool_config.type === "agent";
  }

  /**
   * Checks if the tool call parameters where valid.
   *
   * @returns {boolean}
   */
  public areParamsValid(): boolean {
    return this.message.content.params.valid;
  }

  /**
   * Returns if the tool message has any errors.
   *
   * @returns {boolean}
   */
  public hasErrors(): boolean {
    return this.message.content.errors.length > 0;
  }

  /**
   * Checks if the tool message is currently running. Note that pending tools
   * are also classified as running as they are just scheduled for running.
   *
   * @returns {boolean}
   */
  public isRunning(): boolean {
    switch (this.status) {
      case "pending":
      case "running":
        return true;

      default:
        return false;
    }
  }
}
