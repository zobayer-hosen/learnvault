import { categories } from "@/lib/data/categories";
import { learningPaths } from "@/lib/data/learning-paths";
import { resources } from "@/lib/data/resources";
import type { Resource, ResourceQuery } from "@/types";

/*
 * Data-access layer. Every function is async and returns plain data so the
 * mock arrays can be swapped for PostgreSQL or an API without touching the UI.
 */

const byNewest = (a: Resource, b: Resource) => b.dateAdded.localeCompare(a.dateAdded);
const byPopularity = (a: Resource, b: Resource) => b.saves - a.saves;

export async function getResources() {
  return [...resources].sort(byNewest);
}

export async function getResourceBySlug(slug: string) {
  return resources.find((resource) => resource.slug === slug) ?? null;
}

export async function getRecentResources(limit = 6) {
  return [...resources].sort(byNewest).slice(0, limit);
}

export async function getPopularResources(limit = 6) {
  return [...resources].sort(byPopularity).slice(0, limit);
}

export async function getFeaturedResources(limit = 6) {
  return resources.filter((resource) => resource.featured).slice(0, limit);
}

export async function getResourcesByCategory(categorySlug: string) {
  return resources.filter((resource) => resource.categorySlug === categorySlug).sort(byPopularity);
}

export async function getRelatedResources(resource: Resource, limit = 3) {
  return resources
    .filter((r) => r.slug !== resource.slug && r.categorySlug === resource.categorySlug)
    .sort(byPopularity)
    .slice(0, limit);
}

export async function getResourcesBySlugs(slugs: string[]) {
  const lookup = new Map(resources.map((resource) => [resource.slug, resource]));
  return slugs.map((slug) => lookup.get(slug)).filter((r): r is Resource => Boolean(r));
}

/** Tags ordered by how many resources use them. */
export async function getPopularTags(limit = 16) {
  const counts = new Map<string, number>();
  for (const resource of resources) {
    for (const tag of resource.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

export async function searchResources(query: ResourceQuery) {
  const terms = query.q?.toLowerCase().split(/\s+/).filter(Boolean) ?? [];

  const matches = resources.filter((resource) => {
    if (query.category && resource.categorySlug !== query.category) return false;
    if (query.sub && resource.subcategorySlug !== query.sub) return false;
    if (query.type && resource.type !== query.type) return false;
    if (query.difficulty && resource.difficulty !== query.difficulty) return false;
    if (query.tags.length && !query.tags.every((tag) => resource.tags.includes(tag))) return false;
    if (terms.length) {
      const haystack = `${resource.title} ${resource.description}`.toLowerCase();
      if (!terms.every((term) => haystack.includes(term))) return false;
    }
    return true;
  });

  return matches.sort(query.sort === "popular" ? byPopularity : byNewest);
}

export async function getCatalogStats() {
  return {
    resources: resources.length,
    categories: categories.length,
    learningPaths: learningPaths.length,
  };
}
