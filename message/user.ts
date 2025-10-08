import type { Attachment } from "../client.ts";
import { GenericMessage } from "./task.ts";

export interface UserMessageContent {
  attachments?: { file_url: string; file_name: string }[];
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

  /**
   * The attachments sent with the message.
   *
   * @property {Attachment[]}
   */
  public get attachments(): Attachment[] {
    return (
      this.message.content.attachments?.map(({ file_name, file_url }) => ({
        fileName: file_name,
        fileUrl: file_url,
      })) ?? []
    );
  }

  /**
   * Returns if the message has attachments.
   *
   * @returns {boolean}
   */
  public hasAttachments(): boolean {
    return this.attachments.length > 0;
  }
}
