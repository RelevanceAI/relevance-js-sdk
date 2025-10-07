import { Agent } from "../../../mod.ts";
import "./client.ts";

if (import.meta.main) {
  void main();
}

/**
 * This program loads an agent and displays some information.
 */
async function main() {
  // fetch all the agents (pageSize=20 default)
  const agents = await Agent.getAll();

  agents.forEach((agent) => {
    console.log("id:       %s", agent.id);
    console.log("name:     %s", agent.name);
    console.log("desc.:    %s", agent.description);
    console.log("region:   %s", agent.region);
    console.log("project:  %s", agent.project);
    console.log("");
  });
}
