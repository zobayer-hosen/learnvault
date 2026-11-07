import { learningPaths } from "@/lib/data/learning-paths";
import type { LearningPath } from "@/types";

export async function getLearningPaths() {
  return learningPaths;
}

export async function getFeaturedLearningPaths(limit = 3) {
  return learningPaths.filter((path) => path.featured).slice(0, limit);
}

export async function getLearningPathBySlug(slug: string) {
  return learningPaths.find((path) => path.slug === slug) ?? null;
}

export async function getLearningPathsForResource(resourceSlug: string) {
  return learningPaths.filter((path) =>
    path.steps.some((step) => step.resourceSlugs.includes(resourceSlug)),
  );
}

export function countPathResources(path: LearningPath) {
  return new Set(path.steps.flatMap((step) => step.resourceSlugs)).size;
}
