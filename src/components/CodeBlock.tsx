import { useEffect, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki";
import { CopyButton } from "./CopyButton";
import { playgroundURL } from "@/lib/playground";

interface CodeBlockProps {
  code: string;
  anchor: string;
}

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["typescript"],
    });
  }
  return highlighterPromise;
}

export function CodeBlock({ code, anchor }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    getHighlighter().then((highlighter) => {
      if (cancelled) return;
      const result = highlighter.codeToHtml(code, {
        lang: "typescript",
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
      setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton code={code} />
        <a
          href={playgroundURL(code)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center h-7 px-2.5 text-xs rounded-md bg-gray-200 text-gray-600 border border-gray-300 hover:bg-gray-300 hover:text-gray-800 dark:bg-white/10 dark:text-gray-300 dark:border-white/20 dark:hover:bg-white/20 dark:hover:text-white transition-colors no-underline"
          title="Open in TypeScript Playground"
        >
          Playground
        </a>
      </div>
      {html ? (
        <div
          data-code-block={anchor}
          className="[&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:text-sm [&_pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="rounded-lg p-4 overflow-x-auto text-sm leading-relaxed bg-gray-100 dark:bg-[#1e1e2e] text-gray-800 dark:text-gray-300">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
