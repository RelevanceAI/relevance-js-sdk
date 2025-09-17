import * as Avatar from "@radix-ui/react-avatar";
import type { AgentMessage as AgentMessageType } from "@relevanceai/sdk";
import TimeAgo from "react-timeago";
import { agentAvatar, agentInitials, agentName } from "@/signals";

interface AgentMessageProps {
  message: AgentMessageType;
}

export function AgentMessage({ message }: AgentMessageProps) {
  return (
    <div class="flex items-start gap-x-2 pr-12 md:pr-0 md:max-w-4/6 self-start">
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
          <span class="text-zinc-700 dark:text-zinc-300">{agentName}</span>{" "}
          <TimeAgo
            date={message.createdAt}
            className="text-zinc-500 dark:text-zinc-400"
          />
        </small>
        <div class="py-2 px-4 rounded-3xl rounded-tl-xs bg-zinc-200 dark:bg-zinc-800 transition-colors">
          <p class="text-zinc-800 dark:text-white">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
