import type { ResourceSummary } from "@/types";
import { getCategoryNameMap } from "./categories";
import { getResources } from "./resources";

/** Lightweight resource summaries for client-side bookmark lookups. */
export async function getResourceSummaries(): Promise<ResourceSummary[]> {
  const [resources, categoryNames] = await Promise.all([getResources(), getCategoryNameMap()]);
  return resources.map(({ slug, title, type, categorySlug }) => ({
    slug,
    title,
    type,
    categoryName: categoryNames[categorySlug] ?? "Uncategorized",
  }));
}
