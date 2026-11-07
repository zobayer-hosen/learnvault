import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ResourceFilters } from "@/components/resources/resource-filters";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceGridSkeleton } from "@/components/resources/resource-grid-skeleton";
import { ButtonLink } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { getCategories } from "@/lib/services/categories";
import { getPopularTags, searchResources } from "@/lib/services/resources";
import { pluralize } from "@/lib/utils";
import { parseResourceQuery } from "@/lib/validation/resource-query";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search and filter every learning resource in LearnVault.",
};

export default function ExplorePage({ searchParams }: PageProps<"/explore">) {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Explore resources"
        description="Search the whole vault and narrow it down by category, type, difficulty, or tag."
      />
      <div className="mt-8">
        <Suspense fallback={<ExploreFallback />}>
          <ExploreResults searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function ExploreResults({ searchParams }: Pick<PageProps<"/explore">, "searchParams">) {
  const query = parseResourceQuery(await searchParams);
  const [results, categories, tags] = await Promise.all([
    searchResources(query),
    getCategories(),
    getPopularTags(14),
  ]);

  return (
    <ResourceFilters query={query} categories={categories} tags={tags}>
      <p aria-live="polite" className="mb-4 text-sm text-fg-muted">
        {pluralize(results.length, "resource")}
        {query.q && (
          <>
            {" "}
            matching <span className="font-medium text-fg">“{query.q}”</span>
          </>
        )}
      </p>
      {results.length > 0 ? (
        <ResourceGrid resources={results} />
      ) : (
        <EmptyState
          icon={SearchX}
          title="No resources match these filters"
          description="Try a broader search term or remove a filter or two. New resources are added regularly."
          action={
            <ButtonLink href="/explore" variant="secondary">
              Reset filters
            </ButtonLink>
          }
        />
      )}
    </ResourceFilters>
  );
}

function ExploreFallback() {
  return (
    <div>
      <div className="space-y-4 rounded-xl border border-border bg-surface p-5">
        <Skeleton className="h-10" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-6 w-2/3" />
      </div>
      <div className="mt-8">
        <Skeleton className="mb-4 h-4 w-24" />
        <ResourceGridSkeleton />
      </div>
    </div>
  );
}
