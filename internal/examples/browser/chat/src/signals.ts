import { computed, effect, signal } from "@preact/signals";
import {
  Agent,
  type AgentMessage,
  type Client,
  type Task,
  type UserMessage,
} from "@relevanceai/sdk";
import { AGENT_ID } from "@/constant";

export const client = signal<Client>();
export const agent = signal<Agent>();
export const task = signal<Task>();
export const messages = signal<(AgentMessage | UserMessage)[]>([]);
export const isAgentTyping = signal(false);
export const isDarkMode = signal(
  localStorage.getItem("darkMode") === "true" ||
    (localStorage.getItem("darkMode") === "false"
      ? false
      : window.matchMedia("(prefers-color-scheme: dark)").matches),
);

export const agentName = computed(() => agent.value?.name);
export const agentInitials = computed(() =>
  agentName.value
    ?.split(/\W+/)
    .slice(0, 2)
    .map((s) => s.toLocaleUpperCase().charAt(0))
    .join(""),
);
export const agentAvatar = computed(() => agent.value?.avatar);
export const agentDescription = computed(() => agent.value?.description);

// Persist dark mode preference
effect(() => {
  localStorage.setItem("darkMode", isDarkMode.value.toString());
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

effect(() => {
  if (client.value) {
    Agent.get(AGENT_ID, client.value).then((a) => {
      agent.value = a;
    });
  }
});

effect(() => {
  const t = task.value;

  if (t) {
    t.addEventListener("message", ({ detail }) => {
      const { message } = detail;
      const msgs = messages.value;
      const optimistic = msgs.find(
        (m) => m.type === "user-message" && m.id === "optimistic",
      );

      if (optimistic) {
        const i = msgs.indexOf(optimistic);
        const copy = msgs.concat();
        copy.splice(i, 1, message);

        messages.value = copy;
        isAgentTyping.value = true;
      } else {
        messages.value = [...msgs, message];

        if (message.type === "agent-message") {
          isAgentTyping.value = false;
        }
      }
    });
  }

  return () => {
    t?.unsubscribe();
  };
});
