import { Agent } from "../../../mod.ts";
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

  // fetch all agent's tasks
  const tasks = await agent.getTasks({
    filter: {
      status: ["queued", "idle"],
    },
    pageSize: 10,
    page: 1,
    sort: {
      updatedAt: "desc",
    },
    search: "wait",
  });

  for (const t of tasks) {
    console.log("%s\n[%s]\n", t.name, t.id);
  }
}
