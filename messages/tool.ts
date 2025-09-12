import { TaskMessage } from "./task.ts";

export class ToolMessage extends TaskMessage<"tool-run"> {
  public get status() {
    return this.message.content.tool_run_state;
  }
}
