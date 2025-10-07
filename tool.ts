import type { Region } from "./region.ts";
import type { JSONSchema4 } from "json-schema";

export type ToolConfig = {
  region: Region;
  project: string;
  studio_id: string;
  title: string;
  description: string;
  emoji?: string;
  params_schema: JSONSchema4;
};

export class Tool {
  readonly #config: ToolConfig;

  public constructor(config: ToolConfig) {
    this.#config = config;
  }

  public get id(): string {
    return this.#config.studio_id;
  }

  public get region(): Region {
    return this.#config.region;
  }

  public get project(): string {
    return this.#config.project;
  }

  public get name(): string {
    return this.#config.title;
  }

  public get avatar(): string | undefined {
    return this.#config.emoji;
  }

  public get description(): string | undefined {
    return this.#config.description;
  }

  public get parametersSchema(): JSONSchema4 {
    return this.#config.params_schema;
  }
}
