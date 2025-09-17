import { createClient, type Region } from "../../../mod.ts";

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
