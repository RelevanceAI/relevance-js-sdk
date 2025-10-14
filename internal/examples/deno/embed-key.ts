import { Key, type Region } from "../../../mod.ts";
import "./client.ts";

if (import.meta.main) {
  void main();
}

/**
 * This program sends an image and asks the agent to perform OCR and return the
 * text.
 */
async function main() {
  const agentId = Deno.env.get("RELEVANCE_AI_AGENT")!;
  const key = await Key.generateEmbedKey({
    region: Deno.env.get("RELEVANCE_AI_REGION")! as Region,
    project: Deno.env.get("RELEVANCE_AI_PROJECT")!,
    agentId,
  });

  console.log(key.toJSON());
}
