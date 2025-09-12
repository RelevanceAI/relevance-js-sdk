import { TaskMessage } from "./task.ts";

export class UserMessage extends TaskMessage<"user-message"> {
  public get text(): string {
    return this.message.content.text;
  }
}
