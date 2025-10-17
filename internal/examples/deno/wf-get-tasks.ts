import { Workforce } from "../../../mod.ts";
import "./client.ts";

if (import.meta.main) {
  void main();
}

/**
 * This program loads a workforce and displays information about its tasks.
 */
async function main() {
  const wfId = Deno.env.get("RELEVANCE_AI_WORKFORCE") ?? "";

  // fetch the workforce
  const wf = await Workforce.get(wfId);

  console.log("Workforce: %s\n", wf.name);

  // fetch all workforce's tasks
  const tasks = await wf.getTasks({
    pageSize: 10,
    page: 1,
    search: "",
  });

  console.log("Found %d tasks:\n", tasks.length);

  for (const t of tasks) {
    console.log("- %s [%s]", t.name, t.id);
    console.log("  Status: %s", t.status);
    console.log("  Created: %s", t.createdAt.toISOString());
    console.log("  Updated: %s\n", t.updatedAt.toISOString());
  }
}
