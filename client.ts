import { type Region, regionBaseURL } from "./region.ts";
import { cleanPath, getFileExtension } from "./utils.ts";
import { Key } from "./key.ts";

type CreateClientOptions = {
  apiKey: string;
  region: Region;
  project: string;
};

export type Attachment = {
  fileName: string;
  fileUrl: string;
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
      | "/agents/conversations/list"
      | "/services/get_temporary_file_upload_url"
      | `/workforce/items/${string}`,
    init?: RequestInit,
  ): Promise<T> {
    const url = this.url(input);

    const reqInit = Object.assign({}, init, {
      headers: {
        ...this.key.fetchHeaders(),
        ...init?.headers,
      },
    });
    const response = await fetch(url, reqInit);

    if (!response.ok) {
      const body = await response.text();
      console.error("client#fetch(): request failed.", url, body, reqInit);
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

  public async uploadTempFile(file: File): Promise<Attachment> {
    const { upload_url: uploadUrl, download_url: downloadUrl } = await this
      .fetch<{ upload_url: string; download_url: string }>(
        "/services/get_temporary_file_upload_url",
        {
          method: "POST",
          body: JSON.stringify({
            filename: file.name,
            extension: getFileExtension(file.name),
          }),
        },
      );

    let content = file.type;
    if (file.type.startsWith("text/")) {
      content += "; charset=utf-8"; // force utf-8 for text files
    }

    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "content-type": content,
        "x-amz-tagging": "Expire=true",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return {
      fileName: file.name,
      fileUrl: downloadUrl,
    };
  }
}
