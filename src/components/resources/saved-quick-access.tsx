"use client";

import { ArrowRight, Bookmark } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmarks } from "@/lib/bookmarks/store";
import { RESOURCE_TYPE_LABELS } from "@/lib/constants";
import type { ResourceSummary } from "@/types";
import { ResourceTypeIcon } from "./resource-type-icon";

export function SavedQuickAccess({ items, limit = 4 }: { items: ResourceSummary[]; limit?: number }) {
  const { slugs, hydrated } = useBookmarks();
  const lookup = new Map(items.map((item) => [item.slug, item]));
  const saved = slugs.map((slug) => lookup.get(slug)).filter((item): item is ResourceSummary => Boolean(item));

  return (
    <section aria-labelledby="saved-heading" className="rounded-xl border border-border bg-surface p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="saved-heading" className="flex items-center gap-2 text-sm font-semibold text-fg">
          <Bookmark aria-hidden className="size-4 text-accent" />
          Saved for later
        </h2>
        {saved.length > 0 && (
          <Link href="/bookmarks" className="text-xs font-medium text-fg-muted hover:text-fg">
            View all <span className="sr-only">saved resources</span>
            <span className="tabular-nums"> ({saved.length})</span>
          </Link>
        )}
      </div>

      {!hydrated ? (
        <div className="space-y-3">
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      ) : saved.length === 0 ? (
        <div className="rounded-lg bg-surface-muted px-4 py-5 text-center">
          <p className="text-sm text-fg-muted">Nothing saved yet.</p>
          <p className="mt-1 text-xs text-fg-subtle">
            Use the bookmark icon on any resource to keep it here.
          </p>
        </div>
      ) : (
        <ul className="-mx-2 space-y-0.5">
          {saved.slice(0, limit).map((item) => (
            <li key={item.slug}>
              <Link
                href={`/resources/${item.slug}`}
                className="group flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-muted"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface-muted text-fg-muted ring-1 ring-border group-hover:bg-surface">
                  <ResourceTypeIcon type={item.type} className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-fg">{item.title}</span>
                  <span className="block truncate text-xs text-fg-subtle">
                    {item.categoryName} · {RESOURCE_TYPE_LABELS[item.type]}
                  </span>
                </span>
                <ArrowRight aria-hidden className="size-3.5 text-fg-subtle opacity-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
