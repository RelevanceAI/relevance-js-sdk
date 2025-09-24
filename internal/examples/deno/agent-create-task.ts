import { Agent } from "../../../mod.ts";
import "./client.ts";

if (import.meta.main) {
  void main();
}

/**
 * This program creates a new task from a message input and displays an agent's
 * response before exiting.
 */
async function main() {
  const agentId = Deno.env.get("RELEVANCE_AI_AGENT") ?? "";

  // fetch the agent
  const agent = await Agent.get(agentId);

  // message input
  const text = prompt("you >");
  if (!text?.trim()) {
    console.error("message required.");
    Deno.exit(-1);
  }

  // create task from input
  const task = await agent.sendMessage(text);

  // listen for agent response
  task.addEventListener("message", ({ detail }) => {
    const { message } = detail;
    if (message.isAgent()) {
      console.log("%s > %s", agent.name, message.text);

      // stop listening and to allow exit
      task.unsubscribe();
    }
  });
}
