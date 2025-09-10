import type { TaskMessage } from "./message.ts";
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

export class TaskMessageEvent extends CustomEvent<{ message: TaskMessage }> {
  public override readonly type = "message";

  public constructor(message: TaskMessage) {
    super("message", { detail: { message } });
  }

  public isUserMessage() {
    return this.detail.message.type === "user-message";
  }
}

export class TaskUpdateEvent extends CustomEvent<{ message: TaskMessage }> {
  public override readonly type = "update";

  public constructor(message: TaskMessage) {
    super("update", { detail: { message } });
  }
}

export class TaskActionEvent extends CustomEvent<{ message: TaskMessage }> {
  public override readonly type = "action";

  public constructor(message: TaskMessage) {
    super("action", { detail: { message } });
  }
}

export class TaskErrorEvent extends CustomEvent<{ message: TaskMessage }> {
  public override readonly type = "error";

  public constructor(message: TaskMessage) {
    super("error", { detail: { message } });
  }
}
