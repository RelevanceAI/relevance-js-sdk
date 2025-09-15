import type { AgentErrorMessage } from "./message/agent-error.ts";
import type { AgentMessage } from "./message/agent.ts";
import type { ToolMessage } from "./message/tool.ts";
import type { UserMessage } from "./message/user.ts";
import type { TaskStatus } from "./task.ts";

export class TaskStartEvent
  extends CustomEvent<{ id: string; status: TaskStatus }> {
  public override readonly type = "start";

  public constructor(id: string, status: TaskStatus) {
    super("start", { detail: { id, status } });
  }
}

export class TaskStatusEvent extends CustomEvent<{ status: TaskStatus }> {
  public override readonly type = "status";

  public constructor(status: TaskStatus) {
    super("status", { detail: { status } });
  }
}

export class TaskMessageEvent
  extends CustomEvent<{ message: AgentMessage | UserMessage }> {
  public override readonly type = "message";

  public constructor(message: AgentMessage | UserMessage) {
    super("message", { detail: { message } });
  }

  public isUserMessage() {
    return this.detail.message.type === "user-message";
  }
}

export class TaskUpdateEvent extends CustomEvent<{ message: ToolMessage }> {
  public override readonly type = "update";

  public constructor(message: ToolMessage) {
    super("update", { detail: { message } });
  }
}

export class TaskErrorEvent
  extends CustomEvent<{ message: AgentErrorMessage }> {
  public override readonly type = "error";

  public constructor(message: AgentErrorMessage) {
    super("error", { detail: { message } });
  }
}
