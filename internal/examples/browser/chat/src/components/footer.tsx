import type { UserMessage } from "@relevanceai/sdk";
import { SendHorizonal } from "lucide-react";
import type { SubmitEventHandler } from "preact";
import { useCallback, useRef } from "preact/hooks";
import { agent, isAgentTyping, messages, task } from "@/signals";

export function Footer() {
  const input = useRef<HTMLInputElement>();

  const handleSubmit = useCallback<SubmitEventHandler<HTMLFormElement>>(
    async (e) => {
      e.preventDefault();

      if (isAgentTyping.value) {
        return;
      }

      const form = e.currentTarget;
      const data = new FormData(form);
      const message = data.get("message") as string | null;
      if (!message?.trim()) {
        return;
      }

      messages.value = [
        ...messages.value,
        {
          id: "optimistic",
          type: "user-message",
          text: message,
          createdAt: new Date(),
          isAgent: () => false,
        } as UserMessage,
      ];

      const t = await agent.value.sendMessage(message, task.value);
      if (task.value !== t) {
        task.value = t;
      }

      if (input.current) {
        input.current.value = "";
        input.current.focus();
      }
    },
    [input],
  );

  return (
    <footer class="p-4 border-t border-zinc-500/25 sticky bottom-0 bg-white dark:bg-zinc-900 transition-colors">
      <form
        class="max-w-3xl mx-auto flex items-center gap-x-2"
        onSubmit={handleSubmit}
      >
        <input
          ref={input}
          type="text"
          placeholder="Write something..."
          class="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-full outline-indigo-500 outline-offset-3 text-zinc-800 dark:text-white dark:placeholder-zinc-400 transition-colors"
          name="message"
        />
        <button
          type="submit"
          class="bg-indigo-500 dark:bg-indigo-600 text-white rounded-full p-3 cursor-pointer hover:bg-indigo-600 dark:hover:bg-indigo-700 active:bg-indigo-700 dark:active:bg-indigo-800 outline-indigo-500 outline-offset-3 transition-colors"
          aria-label="Send message"
        >
          <SendHorizonal size={24} strokeWidth={1.5} />
        </button>
      </form>
    </footer>
  );
}
