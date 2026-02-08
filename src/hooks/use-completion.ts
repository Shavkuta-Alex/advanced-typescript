import { useState, useCallback } from "react";

const STORAGE_KEY = "ts-guide-completion";

function loadCompletion(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function useCompletion(totalTopics: number) {
  const [completion, setCompletion] = useState<Record<string, boolean>>(
    loadCompletion,
  );

  const toggleComplete = useCallback(
    (anchor: string, checked: boolean) => {
      setCompletion((prev) => {
        const next = { ...prev, [anchor]: checked };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

        // Fire confetti when all done
        const completedCount = Object.values(next).filter(Boolean).length;
        if (completedCount === totalTopics && checked) {
          import("canvas-confetti").then((mod) => {
            mod.default({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
          }).catch(() => {});
        }

        return next;
      });
    },
    [totalTopics],
  );

  return { completion, toggleComplete };
}
