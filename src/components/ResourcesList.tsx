import type { Resource } from "@/types";

interface ResourcesListProps {
  resources: Resource[];
}

export function ResourcesList({ resources }: ResourcesListProps) {
  return (
    <div className="bg-secondary rounded-lg p-6 mt-6">
      <h4 className="font-semibold mb-4">Learning Resources</h4>
      <ul className="space-y-4">
        {resources.map((r, i) => (
          <li
            key={i}
            className="pb-4 border-b border-border last:pb-0 last:border-b-0"
          >
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold no-underline hover:underline"
            >
              {r.title}
            </a>
            <span className="block text-sm text-muted-foreground mt-1">
              {r.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
