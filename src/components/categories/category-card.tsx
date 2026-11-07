import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn, pluralize } from "@/lib/utils";
import type { Category } from "@/types";
import { CategoryIcon } from "./category-icon";

interface CategoryCardProps {
  category: Category;
  resourceCount: number;
  variant?: "default" | "compact";
}

export function CategoryCard({ category, resourceCount, variant = "default" }: CategoryCardProps) {
  const compact = variant === "compact";

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex h-full rounded-xl border border-border bg-surface shadow-card transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:shadow-raised",
        compact ? "items-center gap-3 p-3" : "flex-col p-5",
      )}
    >
      <div className={cn("flex items-start justify-between", compact ? "shrink-0" : "mb-5")}>
        <span
          className={cn(
            "flex items-center justify-center rounded-lg bg-surface-muted text-fg-muted ring-1 ring-border transition-colors group-hover:bg-accent-soft group-hover:text-accent",
            compact ? "size-9" : "size-10",
          )}
        >
          <CategoryIcon icon={category.icon} className="size-[18px]" />
        </span>
        {!compact && (
          <ArrowUpRight
            aria-hidden
            className="size-4 text-fg-subtle opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        )}
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-fg">{category.name}</h3>
        {compact ? (
          <p className="text-xs text-fg-subtle">{pluralize(resourceCount, "resource")}</p>
        ) : (
          <>
            <p className="mt-1.5 line-clamp-2 text-sm text-fg-muted">{category.description}</p>
            <p className="mt-4 text-xs text-fg-subtle">
              {pluralize(resourceCount, "resource")} <span aria-hidden>·</span>{" "}
              {pluralize(category.subcategories.length, "subcategory", "subcategories")}
            </p>
          </>
        )}
      </div>
    </Link>
  );
}
