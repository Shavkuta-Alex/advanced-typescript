import type { Topic } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { TopicMeta } from "./TopicMeta";
import { CodeBlock } from "./CodeBlock";
import { ResourcesList } from "./ResourcesList";
import { ExercisesSection } from "./ExercisesSection";

interface TopicArticleProps {
  topic: Topic;
  isCompleted: boolean;
  onToggleComplete: (anchor: string, checked: boolean) => void;
}

export function TopicArticle({
  topic,
  isCompleted,
  onToggleComplete,
}: TopicArticleProps) {
  return (
    <article
      className="mb-16 pb-12 border-b border-border border-l-[3px] border-l-accent pl-6 last:border-b-0 [content-visibility:auto] [contain-intrinsic-size:auto_800px] scroll-mt-8"
      id={topic.anchor}
    >
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-3 flex-wrap">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={(checked) =>
            onToggleComplete(topic.anchor, checked === true)
          }
          aria-label="Mark as complete"
          className="w-5 h-5"
        />
        {topic.id}. {topic.title}
      </h2>

      <TopicMeta
        difficulty={topic.difficulty}
        diffClass={topic.diffClass}
        prerequisites={topic.prerequisites}
      />

      <h3 className="text-xl font-semibold mt-8 mb-4 pb-2 border-b-2 border-accent">
        Overview
      </h3>
      <p
        className="text-muted-foreground mb-4 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-[0.9em] [&_code]:font-mono [&_code]:text-pink-500 [&_code]:dark:text-pink-400"
        dangerouslySetInnerHTML={{ __html: topic.overview }}
      />

      <h3 className="text-xl font-semibold mt-8 mb-4 pb-2 border-b-2 border-accent">
        Key Concepts
      </h3>
      <ul className="space-y-2 mb-6">
        {topic.keyConcepts.map((concept, i) => (
          <li
            key={i}
            className="relative pl-6 text-muted-foreground before:content-['→'] before:absolute before:left-0 before:text-primary before:font-bold [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-[0.9em] [&_code]:font-mono [&_code]:text-pink-500 [&_code]:dark:text-pink-400"
            dangerouslySetInnerHTML={{ __html: concept }}
          />
        ))}
      </ul>

      <h3 className="text-xl font-semibold mt-8 mb-4 pb-2 border-b-2 border-accent">
        Code Example
      </h3>
      <CodeBlock code={topic.code} anchor={topic.anchor} />

      <ResourcesList resources={topic.resources} />
      <ExercisesSection exercises={topic.exercises} hints={topic.hints} />
    </article>
  );
}
