import { Client } from "../../../client.ts";
import { createClient, Key, type Region } from "../../../mod.ts";

/**
 * @todo: run with --env or set params
 */
const apiKey = Deno.env.get("RELEVANCE_AI_API_KEY") ?? "";
const region = (Deno.env.get("RELEVANCE_AI_REGION") ?? "") as Region;
const project = Deno.env.get("RELEVANCE_AI_PROJECT") ?? "";

// default client
createClient({
  apiKey,
  region,
  project,
});

export function createEmbedClient(): Client {
  const agentId = Deno.env.get("RELEVANCE_AI_AGENT") ?? "";
  const taskPrefix = Deno.env.get("RELEVANCE_AI_TASK_PREFIX") ?? "";

  return new Client(
    new Key({
      key: apiKey,
      region,
      project,
      agentId,
      taskPrefix,
    }),
  );
}
