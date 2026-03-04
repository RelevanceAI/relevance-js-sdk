import { GenericMessage } from "./task.ts";

export type ThinkingMessageContent = {
  type: "agent-thinking";
  text: string;
};

export type TypingMessageContent = {
  type: "agent-typing";
  text: string;
};

export class ThinkingMessage extends GenericMessage<ThinkingMessageContent> {
  public get text(): string {
    return this.message.content.text;
  }
}

export class TypingMessage extends GenericMessage<TypingMessageContent> {
  public get text(): string {
    return this.message.content.text;
  }
}
