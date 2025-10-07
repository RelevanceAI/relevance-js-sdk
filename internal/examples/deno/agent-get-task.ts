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

  // fetch the task
  const task = await agent.getTask(
    "d6185a36-7f6c-43b4-87cf-a4b50dd7e608_-_d0fbb83a-add4-40ed-8480-6479778eb592",
  );

  // task info.
  console.log("id:       %s", task.id);
  console.log("title:    %s", task.name);
  console.log("created:  %s", agent.createdAt.toLocaleString());
  console.log("updated:  %s", agent.updatedAt.toLocaleString());
  console.log("\n---\n");

  // display messages
  const messages = await task.getMessages();
  messages.forEach((message) => {
    switch (message.type) {
      case "user-message":
        console.log(
          "[%s]\nyou > %s\n",
          message.createdAt.toLocaleString(),
          message.text,
        );
        break;

      case "agent-message":
        console.log(
          "[%s]\n%s > %s\n",
          message.createdAt.toLocaleString(),
          task.subject.name,
          message.text,
        );
        break;

      default:
        console.dir(message, { depth: null, compact: true, colors: true });
    }
  });
}
