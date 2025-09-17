import * as Avatar from "@radix-ui/react-avatar";
import { Moon, Sun } from "lucide-react";
import { agentAvatar, agentInitials, agentName, isDarkMode } from "@/signals";

export function Header() {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  return (
    <header class="p-4 border-b border-zinc-500/25 sticky top-0 bg-white dark:bg-zinc-900 transition-colors">
      <div class="max-w-3xl mx-auto">
        <div class="flex items-center gap-x-2.5">
          <Avatar.Root>
            <Avatar.Image
              src={agentAvatar}
              class="size-10 rounded-full border border-zinc-200 dark:border-zinc-700 transition-colors"
              alt={agentName}
            />
            <Avatar.Fallback>{agentInitials}</Avatar.Fallback>
          </Avatar.Root>
          <hgroup class="flex flex-col flex-1 gap-y-1">
            <h1 class="font-medium text-md leading-none text-zinc-800 dark:text-white transition-colors">
              Task title
            </h1>
            <h2 class="text-xs text-zinc-500 dark:text-zinc-400 leading-none">
              {agentName}
            </h2>
          </hgroup>
          <button
            type="button"
            onClick={toggleDarkMode}
            class="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
          >
            {isDarkMode.value ? (
              <Sun size={20} strokeWidth={1.5} />
            ) : (
              <Moon size={20} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
