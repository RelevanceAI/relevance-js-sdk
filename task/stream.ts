import { Emitter } from "../emitter.ts";
import { type Region, regionStreamingURL } from "../region.ts";
import type { TaskStrategy } from "./task.ts";

export type StreamingToken = {
  token: string;
  expiresAt: number;
};

export type StreamDetail = {
  content: string;
  documentId: string;
};

type TaskStreamEventMap = {
  thinking: StreamDetail;
  typing: StreamDetail;
};

export class TaskStream extends Emitter<TaskStreamEventMap> {
  #strategy: TaskStrategy<any>;
  #region: Region;
  #token: StreamingToken;
  #closed = false;
  #refreshTimer: ReturnType<typeof setTimeout> | null = null;
  #source: EventSource | null = null;
  #fetchController: AbortController | null = null;

  public constructor(
    strategy: TaskStrategy<any>,
    metadata: { region: Region; streamingToken: StreamingToken },
  ) {
    super();
    this.#strategy = strategy;
    this.#region = metadata.region;
    this.#token = metadata.streamingToken;
    this.#connect();
  }

  public close() {
    this.#closed = true;
    this.#clearRefreshTimer();
    this.#disconnect();
  }

  #connect() {
    if (this.#closed) return;
    this.#scheduleRefresh();

    if (typeof EventSource !== "undefined") {
      this.#connectEventSource();
    } else {
      this.#connectFetch();
    }
  }

  #disconnect() {
    this.#clearRefreshTimer();

    if (this.#source) {
      this.#source.close();
      this.#source = null;
    }

    if (this.#fetchController) {
      this.#fetchController.abort();
      this.#fetchController = null;
    }
  }

  #connectEventSource() {
    const url = regionStreamingURL(this.#region, this.#token.token);
    const source = new EventSource(url);
    this.#source = source;

    source.addEventListener("message", (event) => {
      this.#handleData(event.data);
    });
  }

  #connectFetch() {
    const url = regionStreamingURL(this.#region, this.#token.token);
    const controller = new AbortController();
    this.#fetchController = controller;

    void (async () => {
      try {
        const response = await fetch(url, {
          headers: { Accept: "text/event-stream" },
          signal: controller.signal,
        });

        if (!response.ok || !response.body) return;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const { events, remainder } = this.#parseSSE(buffer);
          buffer = remainder;

          for (const data of events) {
            this.#handleData(data);
          }
        }
      } catch {
        // aborted or network error — ignore if closed
      }
    })();
  }

  #parseSSE(buffer: string): { events: string[]; remainder: string } {
    const events: string[] = [];
    const blocks = buffer.split("\n\n");
    const remainder = blocks.pop()!; // last chunk may be incomplete

    for (const block of blocks) {
      for (const line of block.split("\n")) {
        if (line.startsWith("data:")) {
          events.push(line.slice(5).trimStart());
        }
      }
    }

    return { events, remainder };
  }

  #handleData(raw: string) {
    try {
      const data = JSON.parse(raw);
      switch (data.type) {
        case "thinking":
          this.dispatchEvent(
            new CustomEvent("thinking", {
              detail: { content: data.content, documentId: data.documentId },
            }),
          );
          break;

        case "text":
          this.dispatchEvent(
            new CustomEvent("typing", {
              detail: { content: data.content, documentId: data.documentId },
            }),
          );
          break;
      }
    } catch {
      // ignore malformed JSON
    }
  }

  #scheduleRefresh() {
    this.#clearRefreshTimer();
    const delay = this.#token.expiresAt - Date.now() - 30_000;
    if (delay <= 0) return; // already expired or about to
    this.#refreshTimer = setTimeout(() => this.#refresh(), delay);
  }

  #clearRefreshTimer() {
    if (this.#refreshTimer !== null) {
      clearTimeout(this.#refreshTimer);
      this.#refreshTimer = null;
    }
  }

  async #refresh() {
    if (this.#closed) return;

    try {
      const metadata = await this.#strategy.getMetadata();

      if (this.#closed) return;

      if (!metadata.streamingToken) {
        this.close();
        return;
      }

      this.#region = metadata.region;
      this.#token = metadata.streamingToken;
      this.#disconnect();
      this.#connect();
    } catch {
      // refresh failed — try again on next schedule
    }
  }
}
