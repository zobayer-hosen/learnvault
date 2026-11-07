"use client";

import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks/store";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  slug: string;
  title: string;
  variant?: "icon" | "full";
  className?: string;
}

export function BookmarkButton({ slug, title, variant = "icon", className }: BookmarkButtonProps) {
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(slug);

  const icon = (
    <Bookmark
      aria-hidden
      className={cn("size-4 transition-transform duration-200", saved && "scale-110 fill-current")}
    />
  );

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={() => toggle(slug)}
        aria-pressed={saved}
        className={cn(
          "inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium shadow-card transition-colors",
          saved
            ? "border-accent/30 bg-accent-soft text-accent"
            : "border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-muted",
          className,
        )}
      >
        {icon}
        {saved ? "Saved" : "Save for later"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={saved}
      aria-label={saved ? `Remove “${title}” from bookmarks` : `Save “${title}” to bookmarks`}
      className={cn(
        "relative z-10 flex size-8 items-center justify-center rounded-lg transition-colors",
        saved ? "text-accent hover:bg-accent-soft" : "text-fg-subtle hover:bg-surface-muted hover:text-fg",
        className,
      )}
    >
      {icon}
    </button>
  );
}
