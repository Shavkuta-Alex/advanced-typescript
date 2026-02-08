import type { QuickRefResource } from "@/types";
import { QuickRefItem } from "./QuickRefItem";

interface QuickReferenceProps {
  resources: QuickRefResource[];
}

export function QuickReference({ resources }: QuickReferenceProps) {
  return (
    <section
      className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white p-12 rounded-lg mt-12"
      id="quick-ref"
      aria-label="Essential resources"
    >
      <h2 className="text-2xl font-bold mb-6">Essential Resources</h2>
      <div className="grid gap-4">
        {resources.map((r, i) => (
          <QuickRefItem key={i} resource={r} />
        ))}
      </div>
    </section>
  );
}
