import { useMemo, useRef } from "react";
import { ThemeProvider } from "@/contexts/theme-context";
import { useCompletion } from "@/hooks/use-completion";
import { useSearch } from "@/hooks/use-search";
import { useScrollspy } from "@/hooks/use-scrollspy";
import { useKeyboardNav } from "@/hooks/use-keyboard-nav";
import { topics, quickRefResources, introContent } from "@/data/topics";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { IntroSection } from "@/components/IntroSection";
import { TopicArticle } from "@/components/TopicArticle";
import { QuickReference } from "@/components/QuickReference";

function AppContent() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { completion, toggleComplete } = useCompletion(topics.length);
  const { searchQuery, setSearchQuery, filteredTopics } = useSearch(topics);

  const topicIds = useMemo(
    () => filteredTopics.map((t) => t.anchor),
    [filteredTopics],
  );

  const activeId = useScrollspy(topicIds);
  useKeyboardNav(topicIds, searchInputRef);

  return (
    <>
      <ReadingProgressBar />
      <a
        href="#main-content"
        className="absolute -top-full left-4 px-4 py-2 bg-primary text-primary-foreground rounded-md z-[200] no-underline font-semibold focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main
        id="main-content"
        className="grid grid-cols-[280px_1fr] gap-12 max-w-[1228px] mx-auto p-8 max-lg:grid-cols-1 max-md:p-4 max-[480px]:p-2"
      >
        <Sidebar
          topics={filteredTopics}
          allTopics={topics}
          completion={completion}
          activeId={activeId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggleComplete={toggleComplete}
          searchInputRef={searchInputRef}
        />
        <div className="min-w-0">
          <IntroSection content={introContent} />
          {filteredTopics.map((topic) => (
            <TopicArticle
              key={topic.anchor}
              topic={topic}
              isCompleted={!!completion[topic.anchor]}
              onToggleComplete={toggleComplete}
            />
          ))}
          <QuickReference resources={quickRefResources} />
        </div>
      </main>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
