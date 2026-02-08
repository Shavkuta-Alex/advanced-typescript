import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import type { Topic } from "@/types";

export function useSearch(topics: Topic[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const fuse = useMemo(() => {
    const searchData = topics.map((t) => ({
      id: t.id,
      anchor: t.anchor,
      title: t.title,
      overview: t.overview.replace(/<[^>]+>/g, ""),
      keyConcepts: t.keyConcepts.join(" ").replace(/<[^>]+>/g, ""),
      prerequisites: t.prerequisites,
    }));

    return new Fuse(searchData, {
      keys: [
        { name: "title", weight: 3 },
        { name: "overview", weight: 1 },
        { name: "keyConcepts", weight: 2 },
        { name: "prerequisites", weight: 1 },
      ],
      threshold: 0.4,
      includeMatches: true,
    });
  }, [topics]);

  const filteredTopics = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return topics;

    const results = fuse.search(query);
    const matchedAnchors = new Set(results.map((r) => r.item.anchor));
    return topics.filter((t) => matchedAnchors.has(t.anchor));
  }, [searchQuery, topics, fuse]);

  return { searchQuery, setSearchQuery, filteredTopics };
}
