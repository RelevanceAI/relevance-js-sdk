import { For, Show } from "@preact/signals/utils";
import type {
  AgentMessage as AgentMessageType,
  UserMessage as UserMessageType,
} from "@relevanceai/sdk";
import { AgentMessage } from "@/components/agent-message";
import { AgentTyping } from "@/components/agent-typing";
import { EmptyState } from "@/components/empty-state";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { UserMessage } from "@/components/user-message";
import { agent, isAgentTyping, messages } from "@/signals";

export function App() {
  return agent.value ? (
    <div class="flex flex-col min-h-dvh dark:bg-zinc-950">
      <Header />
      <main class="flex-1 p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors">
        <div class="max-w-3xl mx-auto flex flex-col gap-y-4">
          <For each={messages} fallback={<EmptyState />}>
            {(m) =>
              m.isAgent() ? (
                <AgentMessage message={m as AgentMessageType} />
              ) : (
                <UserMessage message={m as UserMessageType} />
              )
            }
          </For>
          <Show when={isAgentTyping}>
            <AgentTyping />
          </Show>
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
}
