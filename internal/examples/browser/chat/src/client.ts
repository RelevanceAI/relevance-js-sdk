import { Client, Key } from "@relevanceai/sdk";
import { AGENT_ID, PROJECT, REGION } from "@/constant";
import { client } from "@/signals";

Promise.resolve(tryStoredEmbedKey())
  .then((key) => key ?? generateEmbedKey())
  .then((key) => {
    client.value = new Client(key);
  });

async function generateEmbedKey() {
  const key = await Key.generateEmbedKey({
    region: REGION,
    project: PROJECT,
    agentId: AGENT_ID,
  });

  const { key: embedKey, taskPrefix } = key.toJSON();
  localStorage.setItem(
    `r-${AGENT_ID}`,
    JSON.stringify({
      embedKey: embedKey,
      conversationPrefix: taskPrefix,
    }),
  );

  return key;
}

function tryStoredEmbedKey() {
  try {
    const stored = JSON.parse(localStorage.getItem(`r-${AGENT_ID}`));

    if (stored.embedKey && stored.conversationPrefix) {
      return new Key({
        key: stored.embedKey,
        region: REGION,
        project: PROJECT,
        agentId: AGENT_ID,
        taskPrefix: stored.conversationPrefix,
      });
    }
  } catch (_) {
    // silent
  }
}
