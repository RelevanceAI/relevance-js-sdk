import { Agent, createClient, REGION_US } from "jsr:@relevanceai/sdk";

/**
 * @todo: set these constants.
 */
const apiKey = "";
const region = REGION_US;
const project = "";
const agentId = "";

// ---

if (import.meta.main) {
  void main();
}

async function main() {
  const cli = createClient({
    apiKey,
    region,
    project,
  });

  const agent = await Agent.fetch(agentId);

  console.log("Agent Info.");
  console.log("       id: %s", agent.id);
  console.log("   region: %s", region);
  console.log("  project: %s", project);
  console.log("     name: %s", agent.name);
  console.log("    desc.: %s", agent.description);
  console.log("");

  const task = await cli.createTask({ agent });

  let message: string | null = null;
  while (!(message = prompt("send > "))) {}

  task.sendMessage(message);

  task.addEventListener("message", ({ detail }) => {
    const { message } = detail;
    if (message.type === "agent-message") {
      console.log(message.text);

      // end the example
      task.stopListening();
    }
  });
}
