import { Progress } from "@/components/ui/progress";

interface ProgressDisplayProps {
  completed: number;
  total: number;
}

export function ProgressDisplay({ completed, total }: ProgressDisplayProps) {
  const percent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="mb-4">
      <p className="text-xs text-muted-foreground mb-2">
        {completed}/{total} topics completed
      </p>
      <Progress value={percent} className="h-1" />
    </div>
  );
}
