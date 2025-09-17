import * as Avatar from "@radix-ui/react-avatar";
import type { UserMessage as UserMessageType } from "@relevanceai/sdk";
import TimeAgo from "react-timeago";

interface UserMessageProps {
  message: UserMessageType;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div class="flex items-start gap-x-2 pl-12 md:pl-0 md:max-w-4/6 self-end flex-row-reverse">
      <div class="shrink-0">
        <Avatar.Root>
          <Avatar.Image
            src="/default-user-avatar.png"
            class="size-10 rounded-full border border-zinc-200 dark:border-zinc-700"
          />
          <Avatar.Fallback asChild>
            <div class="p-2 bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 font-semibold rounded-full transition-colors">
              ME
            </div>
          </Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div class="flex flex-col gap-y-1 items-end">
        <small class="flex gap-x-1.5 flex-row-reverse">
          <span class="text-zinc-700 dark:text-zinc-300">You</span>{" "}
          {message.id === "optimistic" ? (
            <span class="text-zinc-500 dark:text-zinc-400">sending...</span>
          ) : (
            <TimeAgo
              date={message.createdAt}
              className="text-zinc-500 dark:text-zinc-400"
            />
          )}
        </small>
        <div class="py-2 px-4 rounded-3xl rounded-tr-xs bg-indigo-500 dark:bg-indigo-600 text-white transition-colors">
          <p class="text-end">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
