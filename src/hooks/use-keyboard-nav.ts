import { useEffect, useRef } from "react";

export function useKeyboardNav(
  visibleIds: string[],
  searchInputRef: React.RefObject<HTMLInputElement | null>,
) {
  const indexRef = useRef(-1);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (target.matches("input, textarea")) return;

      switch (e.key) {
        case "j": {
          indexRef.current = Math.min(
            indexRef.current + 1,
            visibleIds.length - 1,
          );
          document
            .getElementById(visibleIds[indexRef.current])
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "k": {
          indexRef.current = Math.max(indexRef.current - 1, 0);
          document
            .getElementById(visibleIds[indexRef.current])
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "t": {
          document
            .querySelector(".toc")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
        case "/": {
          e.preventDefault();
          searchInputRef.current?.focus();
          break;
        }
        case "Escape": {
          searchInputRef.current?.blur();
          break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visibleIds, searchInputRef]);
}
