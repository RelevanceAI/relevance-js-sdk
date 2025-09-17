import { type Region, regionBaseURL } from "./region.ts";
import { cleanPath } from "./utils.ts";
import { Key } from "./key.ts";

type CreateClientOptions = {
  apiKey: string;
  region: Region;
  project: string;
};

let defaultClient: Client | undefined;

/**
 * Creates and returns the _default_ client instance.
 *
 * @throws {Error} if a default client already exists.
 * @see {@link Client.default}
 */
export function createClient(
  keyOrOptions: Key | CreateClientOptions,
): Client {
  if (defaultClient) {
    throw new Error("default client already exists");
  }

  const key = keyOrOptions instanceof Key ? keyOrOptions : new Key({
    key: keyOrOptions.apiKey,
    region: keyOrOptions.region,
    project: keyOrOptions.project,
  });
  defaultClient = new Client(key);

  return defaultClient;
}

export class Client {
  /**
   * Returns the _default_ client instance.
   *
   * @throws {Error} if there is no default client.
   * @see {@link createClient}
   */
  public static default(): Client {
    if (!defaultClient) {
      throw new Error("no default client");
    }
    return defaultClient;
  }

  public readonly key: Key;
  private readonly baseURL: string;

  public constructor(key: Key) {
    this.key = key;
    this.baseURL = regionBaseURL(this.key.region);
  }

  public get region(): Region {
    return this.key.region;
  }

  public get project(): string {
    return this.key.project;
  }

  public isEmbedKey(): boolean {
    return this.key.isEmbed();
  }

  public async fetch<T>(
    input:
      | "/agents/trigger"
      | `/agents/${string}/get`
      | `/agents/${string}/tasks/${string}/metadata`
      | `/agents/${string}/tasks/${string}/view`
      | "/agents/conversations/list",
    init?: RequestInit,
  ): Promise<T> {
    const url = this.url(input);

    const headers = new Headers(this.key.fetchHeaders());
    const response = await fetch(url, Object.assign({ headers }, init));

    if (!response.ok) {
      const body = await response.text();
      console.error(url, init, headers, body);
      throw new Error(response.statusText);
    }

    return response.json() as T;
  }

  public url(path: string): URL {
    if (/^https?:\/\//.test(path)) {
      return new URL(path);
    }
    return new URL(cleanPath(path), this.baseURL);
  }
}
