import type { Topic } from "@/types";
import { TOCItem } from "./TOCItem";

interface TOCListProps {
  topics: Topic[];
  completion: Record<string, boolean>;
  activeId: string;
  onToggleComplete: (anchor: string, checked: boolean) => void;
}

export function TOCList({
  topics,
  completion,
  activeId,
  onToggleComplete,
}: TOCListProps) {
  return (
    <ol className="list-none grid gap-1">
      {topics.map((topic) => (
        <TOCItem
          key={topic.anchor}
          id={topic.id}
          anchor={topic.anchor}
          title={topic.title}
          isCompleted={!!completion[topic.anchor]}
          isActive={activeId === topic.anchor}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ol>
  );
}
