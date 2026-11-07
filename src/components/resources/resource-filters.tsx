"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { Input, Label, Select } from "@/components/ui/field";
import { DIFFICULTY_LABELS, RESOURCE_TYPE_LABELS, SORT_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { resourceQuerySchema, toSearchParams } from "@/lib/validation/resource-query";
import { DIFFICULTIES, RESOURCE_TYPES, SORT_OPTIONS, type Category, type ResourceQuery } from "@/types";

interface ResourceFiltersProps {
  query: ResourceQuery;
  categories: Pick<Category, "slug" | "name" | "subcategories">[];
  tags: string[];
  children: ReactNode;
}

const SEARCH_DEBOUNCE_MS = 300;

export function ResourceFilters({ query, categories, tags, children }: ResourceFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [text, setText] = useState(query.q ?? "");
  const [syncedQ, setSyncedQ] = useState(query.q);
  // Keep the input in sync when the URL changes from elsewhere (e.g. header search).
  if (query.q !== syncedQ) {
    setSyncedQ(query.q);
    if ((query.q ?? "") !== text.trim()) setText(query.q ?? "");
  }

  const update = (patch: Partial<ResourceQuery>) => {
    // Validate through the same schema the server uses before touching the URL.
    const next = resourceQuerySchema.parse({ ...query, ...patch, tags: (patch.tags ?? query.tags).join(",") });
    const params = toSearchParams(next).toString();
    startTransition(() => {
      router.replace(params ? `${pathname}?${params}` : pathname, { scroll: false });
    });
  };

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const onSearchChange = (value: string) => {
    setText(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => update({ q: value }), SEARCH_DEBOUNCE_MS);
  };

  const toggleTag = (tag: string) =>
    update({ tags: query.tags.includes(tag) ? query.tags.filter((t) => t !== tag) : [...query.tags, tag] });

  const activeCategory = categories.find((c) => c.slug === query.category);
  const hasFilters = Boolean(
    query.q || query.category || query.type || query.difficulty || query.tags.length,
  );

  return (
    <div>
      <form
        role="search"
        aria-label="Filter resources"
        onSubmit={(event) => {
          event.preventDefault();
          clearTimeout(debounceRef.current);
          update({ q: text });
        }}
        className="space-y-4 rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Label htmlFor="explore-q" className="sr-only">
              Search by title or description
            </Label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" />
            <Input
              id="explore-q"
              type="search"
              value={text}
              maxLength={100}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search by title or description…"
              className="pl-9"
            />
          </div>
          <div className="sm:w-44">
            <Label htmlFor="explore-sort" className="sr-only">
              Sort by
            </Label>
            <Select
              id="explore-sort"
              value={query.sort}
              onChange={(event) => update({ sort: event.target.value as ResourceQuery["sort"] })}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {SORT_LABELS[option]}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className={cn("grid grid-cols-1 gap-3 sm:grid-cols-3", activeCategory && "lg:grid-cols-4")}>
          <div>
            <Label htmlFor="explore-category">Category</Label>
            <Select
              id="explore-category"
              value={query.category ?? ""}
              onChange={(event) => update({ category: event.target.value || undefined, sub: undefined })}
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
          {activeCategory && (
            <div>
              <Label htmlFor="explore-sub">Subcategory</Label>
              <Select
                id="explore-sub"
                value={query.sub ?? ""}
                onChange={(event) => update({ sub: event.target.value || undefined })}
              >
                <option value="">All subcategories</option>
                {activeCategory.subcategories.map((sub) => (
                  <option key={sub.slug} value={sub.slug}>
                    {sub.name}
                  </option>
                ))}
              </Select>
            </div>
          )}
          <div>
            <Label htmlFor="explore-type">Resource type</Label>
            <Select
              id="explore-type"
              value={query.type ?? ""}
              onChange={(event) => update({ type: (event.target.value || undefined) as ResourceQuery["type"] })}
            >
              <option value="">All types</option>
              {RESOURCE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {RESOURCE_TYPE_LABELS[type]}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="explore-difficulty">Difficulty</Label>
            <Select
              id="explore-difficulty"
              value={query.difficulty ?? ""}
              onChange={(event) =>
                update({ difficulty: (event.target.value || undefined) as ResourceQuery["difficulty"] })
              }
            >
              <option value="">All levels</option>
              {DIFFICULTIES.map((level) => (
                <option key={level} value={level}>
                  {DIFFICULTY_LABELS[level]}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-xs font-medium text-fg-muted">Tags</legend>
          <div className="flex flex-wrap gap-1.5">
            {[...new Set([...query.tags, ...tags])].map((tag) => {
              const active = query.tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "rounded-md border px-2 py-1 font-mono text-xs transition-colors",
                    active
                      ? "border-accent/40 bg-accent-soft text-accent"
                      : "border-border text-fg-muted hover:border-border-strong hover:text-fg",
                  )}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </fieldset>

        {hasFilters && (
          <div className="flex justify-end border-t border-border pt-3">
            <button
              type="button"
              onClick={() => {
                setText("");
                update({ q: undefined, category: undefined, sub: undefined, type: undefined, difficulty: undefined, tags: [] });
              }}
              className="inline-flex items-center gap-1.5 rounded-md text-xs font-medium text-fg-muted hover:text-fg"
            >
              <X aria-hidden className="size-3.5" />
              Clear all filters
            </button>
          </div>
        )}
      </form>

      <div
        aria-busy={isPending}
        className={cn("mt-8 transition-opacity duration-200", isPending && "opacity-60")}
      >
        {children}
      </div>
    </div>
  );
}
