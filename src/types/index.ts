export const RESOURCE_TYPES = [
  "documentation",
  "official-guide",
  "course",
  "tutorial",
  "article",
  "video",
  "github-repo",
  "book",
  "roadmap",
  "tool",
] as const;

export type ResourceType = (typeof RESOURCE_TYPES)[number];

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

export type Difficulty = (typeof DIFFICULTIES)[number];

export const SORT_OPTIONS = ["newest", "popular"] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export interface Subcategory {
  slug: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Key into the category icon map (see components/categories/category-icon). */
  icon: CategoryIconKey;
  subcategories: Subcategory[];
}

export type CategoryIconKey =
  | "languages"
  | "frontend"
  | "backend"
  | "database"
  | "cloud"
  | "ai"
  | "security"
  | "system-design"
  | "fundamentals"
  | "engineering"
  | "tools";

export interface Resource {
  slug: string;
  title: string;
  description: string;
  url: string;
  /** Optional cover image. When absent, a generated cover is rendered. */
  coverImage?: string;
  categorySlug: string;
  subcategorySlug: string;
  type: ResourceType;
  difficulty: Difficulty;
  tags: string[];
  author: string;
  /** ISO date (YYYY-MM-DD). */
  dateAdded: string;
  /** Sample popularity score used for sorting until real analytics exist. */
  saves: number;
  featured?: boolean;
}

export interface LearningPathStep {
  title: string;
  description: string;
  resourceSlugs: string[];
}

export interface LearningPath {
  slug: string;
  title: string;
  summary: string;
  description: string;
  difficulty: Difficulty;
  /** Suggested pace, e.g. "10–12 weeks". */
  duration: string;
  outcomes: string[];
  steps: LearningPathStep[];
  featured?: boolean;
}

export interface ResourceQuery {
  q?: string;
  category?: string;
  sub?: string;
  type?: ResourceType;
  difficulty?: Difficulty;
  tags: string[];
  sort: SortOption;
}

/** Lightweight resource summary used for client-side bookmark lookups. */
export type ResourceSummary = Pick<Resource, "slug" | "title" | "type"> & { categoryName: string };
