import type { AgentErrorMessage } from "./message/agent-error.ts";
import type { AnyTaskMessage } from "./message/task.ts";

export class TaskUpdateEvent extends CustomEvent<void> {
  public override readonly type = "update";

  public constructor() {
    super("update");
  }
}

export class TaskMessageEvent extends CustomEvent<{ message: AnyTaskMessage }> {
  public override readonly type = "message";

  public constructor(message: AnyTaskMessage) {
    super("message", { detail: { message } });
  }
}

export class TaskErrorEvent
  extends CustomEvent<{ message: AgentErrorMessage }> {
  public override readonly type = "error";

  public constructor(message: AgentErrorMessage) {
    super("error", { detail: { message } });
  }
}
