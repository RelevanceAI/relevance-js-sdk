import * as Avatar from "@radix-ui/react-avatar";
import { agentAvatar, agentInitials, agentName } from "@/signals";

export function AgentTyping() {
  return (
    <div class="flex items-start gap-x-2 max-w-4/6 self-start">
      <div class="shrink-0">
        <Avatar.Root>
          <Avatar.Image
            src={agentAvatar}
            class="size-10 rounded-full border border-zinc-200 dark:border-zinc-700"
          />
          <Avatar.Fallback>{agentInitials}</Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div class="flex flex-col gap-y-1 items-start">
        <small class="flex gap-x-1.5">
          <span class="text-zinc-700 dark:text-zinc-300 transition-colors">
            {agentName}
          </span>{" "}
          <span class="text-zinc-500 dark:text-zinc-400 transition-colors">
            typing...
          </span>
        </small>
        <div class="py-3 px-4 rounded-3xl rounded-tl-xs bg-zinc-200 dark:bg-zinc-800 transition-colors">
          <div class="flex">
            <span class="typing-dot text-zinc-600 dark:text-zinc-400">•</span>
            <span class="typing-dot typing-dot-delay-1 text-zinc-600 dark:text-zinc-400">
              •
            </span>
            <span class="typing-dot typing-dot-delay-2 text-zinc-600 dark:text-zinc-400">
              •
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
