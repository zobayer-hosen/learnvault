import { getCategoryNameMap } from "@/lib/services/categories";
import { cn } from "@/lib/utils";
import type { Resource } from "@/types";
import { ResourceCard } from "./resource-card";

export async function ResourceGrid({ resources, className }: { resources: Resource[]; className?: string }) {
  const categoryNames = await getCategoryNameMap();

  return (
    <ul className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {resources.map((resource) => (
        <li key={resource.slug} className="flex">
          <ResourceCard
            resource={resource}
            categoryName={categoryNames[resource.categorySlug] ?? "Uncategorized"}
            className="w-full"
          />
        </li>
      ))}
    </ul>
  );
}
