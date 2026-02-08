import type { QuickRefResource } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface QuickRefItemProps {
  resource: QuickRefResource;
}

export function QuickRefItem({ resource }: QuickRefItemProps) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardContent className="flex gap-4 items-start p-4">
        <span className="bg-white/10 p-2 rounded-lg text-xl shrink-0 w-10 h-10 flex items-center justify-center">
          {resource.icon}
        </span>
        <div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 font-semibold no-underline hover:underline block"
          >
            {resource.title}
          </a>
          <span className="text-sm opacity-70">{resource.description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
