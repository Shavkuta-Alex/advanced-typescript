import type { Topic } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchInput } from "./SearchInput";
import { ProgressDisplay } from "./ProgressDisplay";
import { TOCList } from "./TOCList";

interface SidebarProps {
  topics: Topic[];
  allTopics: Topic[];
  completion: Record<string, boolean>;
  activeId: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onToggleComplete: (anchor: string, checked: boolean) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export function Sidebar({
  topics,
  allTopics,
  completion,
  activeId,
  searchQuery,
  onSearchChange,
  onToggleComplete,
  searchInputRef,
}: SidebarProps) {
  const completedCount = Object.values(completion).filter(Boolean).length;

  return (
    <aside
      className="sticky top-8 self-start max-h-[calc(100vh-4rem)] max-lg:static max-lg:max-h-none max-lg:bg-secondary max-lg:p-6 max-lg:rounded-lg"
      aria-label="Navigation"
    >
      <ScrollArea className="h-full max-lg:h-auto">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          inputRef={searchInputRef}
        />
        <nav className="toc" aria-label="Table of contents">
          <h2 className="text-xl font-semibold mb-4">Contents</h2>
          <ProgressDisplay
            completed={completedCount}
            total={allTopics.length}
          />
          <TOCList
            topics={topics}
            completion={completion}
            activeId={activeId}
            onToggleComplete={onToggleComplete}
          />
        </nav>
      </ScrollArea>
    </aside>
  );
}
