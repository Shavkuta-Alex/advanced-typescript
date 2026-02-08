import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface TOCItemProps {
  id: number;
  anchor: string;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  onToggleComplete: (anchor: string, checked: boolean) => void;
}

export function TOCItem({
  id,
  anchor,
  title,
  isCompleted,
  isActive,
  onToggleComplete,
}: TOCItemProps) {
  return (
    <li className="flex items-center gap-2">
      <Checkbox
        checked={isCompleted}
        onCheckedChange={(checked) =>
          onToggleComplete(anchor, checked === true)
        }
        aria-label={`Mark ${title} as complete`}
        className="shrink-0"
      />
      <a
        href={`#${anchor}`}
        className={cn(
          "flex items-center gap-3 py-0.5 text-sm transition-colors flex-1 text-primary hover:text-primary/80",
          isActive && "text-primary font-semibold",
        )}
        data-toc-link={anchor}
      >
        <span className="bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0">
          {id}
        </span>
        <span>{title}</span>
      </a>
    </li>
  );
}
