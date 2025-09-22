import { Client, type Region } from "@relevanceai/sdk";

type WorkforceConfig = {
  id: string;
  workforce_metadata: {
    name: string;
  };
};

export class Workforce {
  public static async get(
    id: string,
    client: Client = Client.default(),
  ): Promise<Workforce> {
    const config = await client.fetch<WorkforceConfig>(
      `/workforce/items/${id}`,
    );

    return new Workforce(config, client);
  }

  protected client: Client;
  #config: WorkforceConfig;

  public constructor(config: WorkforceConfig, client: Client) {
    this.#config = config;
    this.client = client;
  }

  public get id(): string {
    return this.#config.id;
  }

  public get region(): Region {
    return this.client.region;
  }

  public get project(): string {
    return this.client.project;
  }

  public get name(): string {
    return this.#config.workforce_metadata.name;
  }
}
