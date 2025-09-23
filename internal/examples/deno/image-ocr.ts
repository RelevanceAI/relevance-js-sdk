import { basename, extname } from "node:path";
import { contentType } from "jsr:@std/media-types";
import { Agent } from "../../../mod.ts";
import "./client.ts";

if (import.meta.main) {
  void main();
}

/**
 * This program sends an image and asks the agent to perform OCR and return the
 * text.
 */
async function main() {
  const agentId = Deno.env.get("RELEVANCE_AI_AGENT") ?? "";

  // fetch the agent
  const agent = await Agent.get(agentId);

  // take the image path
  const [input] = Deno.args;
  if (!input) {
    console.error("no input file");
    return;
  }

  // read the file contents and construct a buffered file instance
  const contents = await Deno.readFile(input);
  const file = new File(
    [contents],
    basename(input),
    { type: contentType(extname(input)) },
  );

  // send the agent a message along with the attachment
  const task = await agent.sendMessage(`What does ${file.name} image say?`, [
    file,
  ]);

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
