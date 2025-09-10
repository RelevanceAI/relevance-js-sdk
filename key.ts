import type { Region } from "@relevanceai/sdk";
import { regionBaseURL } from "./region.ts";
import { cleanPath } from "./utils.ts";

type CreateKeyOptions = {
  key: string;
  region: Region;
  project: string;
  agentId?: string;
  taskPrefix?: string;
};

type GenerateEmbedKeyOptions = Omit<CreateKeyOptions, "key" | "taskPrefix">;

/**
 * Key is used to authenticate requests for the {@link Client}. A Key can be
 * either a _full_ key or an _embed_ key.
 *
 * A full key has access to SDK features. An embed key is scoped to a specific
 * agent and is only used to create and interact with tasks for that agent.
 *
 * @see {@link Key.generateEmbedKey} to generate an embed key for a specific agent.
 *
 * @class Key
 */
export class Key {
  /**
   * Generates an embed key for the specified agent. The embed key can then be
   * used to create a {@link Client} instance that can create and interact with
   * tasks for that agent.
   *
   * @throws {Error} if the request to generate an embed key fails.
   *
   * @param {GenerateEmbedKeyOptions} options The generation options.
   *
   * @returns {Promise<Key>}
   */
  static async generateEmbedKey({
    region,
    project,
    agentId,
  }: GenerateEmbedKeyOptions): Promise<Key> {
    const embedKeyURL = new URL(
      cleanPath("/agents/get_embed_key"),
      regionBaseURL(region),
    );

    const response = await fetch(embedKeyURL, {
      method: "POST",
      body: JSON.stringify({ agent_id: agentId, project }),
    });

    if (!response.ok) {
      throw new Error("failed to fetch embed key", { cause: response });
    }

    const { embed_key: embedKey, conversation_prefix: taskPrefix } =
      await response.json() as {
        embed_key: string;
        conversation_prefix: string;
      };

    return new Key({
      key: embedKey,
      region,
      project,
      agentId,
      taskPrefix,
    });
  }

  /**
   * The region the key is scoped to.
   *
   * @property {string} region
   */
  public readonly region: Region;

  /**
   * The project the key is scoped to.
   *
   * @property {string} project
   */
  public readonly project: string;

  /**
   * The API key used for authentication.
   *
   * @private
   * @property {string} key
   */
  readonly #key: string;

  /**
   * The agent ID the embed key is scoped to. This is `undefined` for full
   * keys.
   *
   * @property {string | undefined} agentId
   */
  public readonly agentId: string | undefined;

  /**
   * The task prefix used to namespace tasks created with the embed key. This
   * is `undefined` for full keys.
   *
   * @property {string | undefined} taskPrefix
   */
  public readonly taskPrefix: string | undefined;

  /**
   * Creates a new {@link Key} instance with the provided options.
   *
   * @param {CreateKeyOptions} options
   */
  public constructor(
    { key, region, project, agentId, taskPrefix }: CreateKeyOptions,
  ) {
    this.#key = key;
    this.region = region;
    this.project = project;
    this.agentId = agentId;
    this.taskPrefix = taskPrefix;
  }

  /**
   * Returns whether the key is an embed key.
   *
   * @returns {boolean}
   */
  public isEmbed(): boolean {
    return (this.agentId !== undefined && this.taskPrefix !== undefined);
  }

  /**
   * Returns the headers required for authenticating requests with this key.
   *
   * @returns {HeadersInit}
   */
  public fetchHeaders(): HeadersInit {
    return {
      Authorization: `${this.project}:${this.#key}`,
    };
  }

  /**
   * Returns a JSON representation of the key.
   *
   * @returns {CreateKeyOptions}
   */
  public toJSON(): CreateKeyOptions {
    return {
      key: this.#key,
      region: this.region,
      project: this.project,
      agentId: this.agentId,
      taskPrefix: this.taskPrefix,
    };
  }
}
