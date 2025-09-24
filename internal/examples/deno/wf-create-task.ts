import { Workforce } from "../../../mod.ts";
import "./client.ts";

if (import.meta.main) {
  void main();
}

/**
 * This program creates a new task from a message input and displays an agent's
 * response before exiting.
 */
async function main() {
  const wfId = Deno.env.get("RELEVANCE_AI_WORKFORCE") ?? "";

  // fetch the workforce
  const wf = await Workforce.get(wfId);

  // message input
  const text = prompt("you >");
  if (!text?.trim()) {
    console.error("message required.");
    Deno.exit(-1);
  }

  // create task from input
  const task = await wf.sendMessage(text);

  // listen for agent response
  task.addEventListener("message", ({ detail }) => {
    const { message } = detail;
    if (message.isAgent()) {
      // @todo: work out how to get the specific agent
      console.log("%s > %s", message.text);

      // stop listening and to allow exit
      task.unsubscribe();
    }
  });
}
