import { categories } from "@/lib/data/categories";
import { resources } from "@/lib/data/resources";
import type { Category } from "@/types";

export async function getCategories() {
  return categories;
}

export async function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getCategoryNameMap() {
  return Object.fromEntries(categories.map((category) => [category.slug, category.name]));
}

export async function getCategoryResourceCounts() {
  const counts: Record<string, number> = {};
  for (const resource of resources) {
    counts[resource.categorySlug] = (counts[resource.categorySlug] ?? 0) + 1;
  }
  return counts;
}

export function getSubcategoryName(category: Category, subcategorySlug: string) {
  return category.subcategories.find((sub) => sub.slug === subcategorySlug)?.name ?? null;
}
