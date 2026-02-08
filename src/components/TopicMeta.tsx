import { Badge } from "@/components/ui/badge";

interface TopicMetaProps {
  difficulty: string;
  diffClass: string;
  prerequisites: string;
}

function difficultyClassName(diffClass: string): string {
  if (diffClass === "advanced")
    return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400 border-orange-200 dark:border-orange-800";
  if (diffClass === "expert")
    return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400 border-purple-200 dark:border-purple-800";
  // Intermediate / Upper Intermediate
  return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-200 dark:border-blue-800";
}

export function TopicMeta({
  difficulty,
  diffClass,
  prerequisites,
}: TopicMetaProps) {
  return (
    <div className="flex gap-6 flex-wrap text-sm mb-6">
      <span>
        <strong>Difficulty:</strong>{" "}
        <Badge variant="outline" className={difficultyClassName(diffClass)}>
          {difficulty}
        </Badge>
      </span>
      <span>
        <strong>Prerequisites:</strong> {prerequisites}
      </span>
    </div>
  );
}
