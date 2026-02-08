import type { IntroContent } from "@/types";

interface IntroSectionProps {
  content: IntroContent;
}

export function IntroSection({ content }: IntroSectionProps) {
  return (
    <section className="mb-16 pb-8 border-b-2 border-border scroll-mt-8" id="intro">
      <h2 className="text-4xl font-bold mb-6">Introduction</h2>
      <p
        className="mb-4 text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
      <h3 className="text-lg font-semibold mt-6 mb-4">
        {content.howToUseTitle}
      </h3>
      <ol className="ml-6 text-muted-foreground list-decimal">
        {content.steps.map((step, i) => (
          <li key={i} className="mb-2">
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
