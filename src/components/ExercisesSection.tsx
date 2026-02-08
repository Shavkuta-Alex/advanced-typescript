import type { Exercise } from "@/types";
import { HintPopover } from "./HintPopover";

interface ExercisesSectionProps {
  exercises: Exercise[];
  hints: string[];
}

const diffColors: Record<string, string> = {
  "ex-easy": "bg-emerald-100 text-emerald-800",
  "ex-medium": "bg-amber-100 text-amber-800",
  "ex-hard": "bg-red-100 text-red-800",
  "ex-extreme": "bg-purple-100 text-purple-800",
};

export function ExercisesSection({ exercises, hints }: ExercisesSectionProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-700 rounded-lg p-6 mt-6 text-white">
      <h4 className="font-semibold mb-4">Hands-On Exercises</h4>
      <ul className="space-y-3">
        {exercises.map((ex, i) => (
          <li key={i}>
            <a
              href={ex.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-300 font-semibold no-underline hover:text-emerald-200 hover:underline"
            >
              {ex.title}
            </a>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ml-2 font-medium ${diffColors[ex.diffClass] || "bg-blue-100 text-blue-800"}`}
            >
              {ex.difficulty}
            </span>
            <span className="text-xs opacity-80 ml-1">{ex.source}</span>
          </li>
        ))}
      </ul>
      {hints.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {hints.map((hint, i) => (
            <HintPopover key={i} hint={hint} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
