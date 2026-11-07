"use client";

import { Bookmark, Compass } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useBookmarks } from "@/lib/bookmarks/store";
import { pluralize } from "@/lib/utils";
import type { Resource } from "@/types";
import { ResourceCard } from "./resource-card";
import { ResourceGridSkeleton } from "./resource-grid-skeleton";

interface BookmarksListProps {
  resources: Resource[];
  categoryNames: Record<string, string>;
}

export function BookmarksList({ resources, categoryNames }: BookmarksListProps) {
  const { slugs, hydrated, clear } = useBookmarks();

  if (!hydrated) return <ResourceGridSkeleton count={3} />;

  const lookup = new Map(resources.map((resource) => [resource.slug, resource]));
  const saved = slugs.map((slug) => lookup.get(slug)).filter((r): r is Resource => Boolean(r));

  if (saved.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="Your vault is empty"
        description="Save resources with the bookmark icon and they’ll appear here, ready whenever you are."
        action={
          <ButtonLink href="/explore">
            <Compass aria-hidden />
            Explore resources
          </ButtonLink>
        }
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-fg-muted" aria-live="polite">
          {pluralize(saved.length, "saved resource")}
        </p>
        <Button variant="ghost" size="sm" onClick={clear}>
          Clear all
        </Button>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {saved.map((resource) => (
          <li key={resource.slug} className="flex animate-fade-in">
            <ResourceCard
              resource={resource}
              categoryName={categoryNames[resource.categorySlug] ?? "Uncategorized"}
              className="w-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
