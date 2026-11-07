import Link from "next/link";
import { DifficultyBadge } from "@/components/ui/badge";
import { RESOURCE_TYPE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Resource } from "@/types";
import { BookmarkButton } from "./bookmark-button";
import { ResourceCover } from "./resource-cover";

interface ResourceCardProps {
  resource: Resource;
  categoryName: string;
  className?: string;
}

export function ResourceCard({ resource, categoryName, className }: ResourceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:shadow-raised",
        className,
      )}
    >
      <ResourceCover resource={resource} className="h-28 border-b border-border" />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-fg-subtle">
          {categoryName} <span aria-hidden>·</span> {RESOURCE_TYPE_LABELS[resource.type]}
        </p>
        <h3 className="mt-1.5 text-[15px] leading-snug font-semibold text-fg">
          <Link
            href={`/resources/${resource.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[a:focus-visible]:underline"
          >
            {resource.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-fg-muted">{resource.description}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="flex min-w-0 items-center gap-2">
            <DifficultyBadge level={resource.difficulty} />
            <span className="truncate text-xs text-fg-subtle">{resource.author}</span>
          </div>
          <BookmarkButton slug={resource.slug} title={resource.title} className="-mr-1.5" />
        </div>
      </div>
    </article>
  );
}
