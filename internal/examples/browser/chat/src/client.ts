import { Client, Key } from "@relevanceai/sdk";
import { AGENT_ID, PROJECT, REGION, WORKFORCE_ID } from "@/constant";
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
    ...(WORKFORCE_ID
      ? { workforceId: WORKFORCE_ID }
      : { agentId: AGENT_ID }),
  });

  const { key: embedKey, taskPrefix } = key.toJSON();
  const storageKey = WORKFORCE_ID ? `r-wf-${WORKFORCE_ID}` : `r-${AGENT_ID}`;
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      embedKey: embedKey,
      conversationPrefix: taskPrefix,
    }),
  );

  return key;
}

function tryStoredEmbedKey() {
  try {
    const storageKey = WORKFORCE_ID ? `r-wf-${WORKFORCE_ID}` : `r-${AGENT_ID}`;
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? "null");

    if (stored?.embedKey && stored?.conversationPrefix) {
      return new Key({
        key: stored.embedKey,
        region: REGION,
        project: PROJECT,
        ...(WORKFORCE_ID
          ? { workforceId: WORKFORCE_ID }
          : { agentId: AGENT_ID }),
        taskPrefix: stored.conversationPrefix,
      });
    }
  } catch (_) {
    // silent
  }
}
