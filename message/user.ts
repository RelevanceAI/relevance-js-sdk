import { GenericMessage } from "./task.ts";

export interface UserMessageContent {
  type: "user-message";
  text: string;
  is_trigger_message: boolean;
}

export class UserMessage extends GenericMessage<UserMessageContent> {
  /**
   * The message as text sent.
   *
   * @property {string} text
   */
  public get text(): string {
    return this.message.content.text;
  }

  /**
   * Returns if the message triggered a subject.
   *
   * @returns {boolean}
   */
  public isTrigger(): boolean {
    return this.message.content.is_trigger_message;
  }
}
