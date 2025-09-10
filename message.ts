type TaskMessageType =
  | "user-message"
  | "agent-message"
  | "tool-run"
  | "agent-error";

export type MessageData = {
  item_id: string;
  insert_date_: string;
  content: {
    type: TaskMessageType;
    text: string;
  };
};

export class TaskMessage<T extends TaskMessageType = TaskMessageType> {
  #data: MessageData;

  public constructor(data: MessageData) {
    this.#data = data;
  }

  public get id() {
    return this.#data.item_id;
  }

  public get type(): T {
    return this.#data.content.type as T;
  }

  public get createdAt() {
    return new Date(this.#data.insert_date_);
  }

  public get text() {
    return this.#data.content.text;
  }
}
