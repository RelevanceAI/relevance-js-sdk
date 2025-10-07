import type { JSONSchema4 } from "json-schema";
import type { Region } from "../region.ts";
import { GenericMessage, type TaskMessageData } from "./task.ts";
import { Tool } from "../tool.ts";

type ToolState =
  | "cancelled"
  | "error"
  | "finished"
  | "pending"
  | "running";

export type ToolStatus =
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
    type: "agent" | "tool";
    title: string;
    description: string;
    region: Region;
    project: string;
    id: string;
    emoji?: string;
    params_schema: JSONSchema4;
  };
}

export class ToolMessage extends GenericMessage<ToolMessageContent> {
  public readonly tool?: Tool;

  public constructor(message: TaskMessageData<ToolMessageContent>) {
    super(message);
    if (message.content.tool_config.type === "tool") {
      const { id, ...config } = message.content.tool_config;
      this.tool = new Tool({ studio_id: id, ...config });
    }
    // @todo: subagent
  }

  /**
   * The tool status for _this_ message.
   *
   * @property {ToolStatus}
   */
  // deno-lint-ignore getter-return
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
    }
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
   * The tool or agent ID.
   *
   * @property {string}
   */
  public get toolOrAgentId(): string {
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
   * The task ID the subagent ran. Will be `null` if the tool message is not
   * a subagent.
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
