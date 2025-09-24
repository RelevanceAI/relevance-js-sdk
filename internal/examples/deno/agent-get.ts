import { Agent } from "../../../mod.ts";
import { printImage } from "https://deno.land/x/terminal_images@3.1.0/mod.ts";
import "./client.ts";

if (import.meta.main) {
  void main();
}

/**
 * This program loads an agent and displays some information.
 */
async function main() {
  const agentId = Deno.env.get("RELEVANCE_AI_AGENT") ?? "";

  // fetch the agent
  const agent = await Agent.get(agentId);

  // agent avatar
  if (!agent.avatar?.endsWith(".svg")) {
    await printImage({
      path: agent.avatar,
      width: 32,
    });
    console.log("");
  }

  // agent info.
  console.log("id:       %s", agent.id);
  console.log("name:     %s", agent.name);
  console.log("desc.:    %s", agent.description);
  console.log("region:   %s", agent.region);
  console.log("project:  %s", agent.project);
}
