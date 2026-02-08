import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [useJS, setUseJS] = useState(false);

  useEffect(() => {
    // Only use JS fallback if scroll-timeline is not supported
    if (CSS.supports("animation-timeline: scroll()")) return;
    setUseJS(true);

    function handleScroll() {
      const scrolled = window.scrollY;
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-[3px] bg-primary origin-left z-50 supports-[animation-timeline:scroll()]:animate-[grow-progress_linear_both] supports-[animation-timeline:scroll()]:[animation-timeline:scroll()]"
      style={useJS ? { transform: `scaleX(${progress})` } : undefined}
      aria-hidden="true"
    />
  );
}
