import type { Difficulty, ResourceType, SortOption } from "@/types";

export const SITE = {
  name: "LearnVault",
  tagline: "Your Knowledge, One Place.",
  description:
    "A centralized platform to discover, organize, and save the best learning resources in software engineering and technology.",
} as const;

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  documentation: "Documentation",
  "official-guide": "Official Guide",
  course: "Course",
  tutorial: "Tutorial",
  article: "Article",
  video: "YouTube Video",
  "github-repo": "GitHub Repository",
  book: "Book",
  roadmap: "Roadmap",
  tool: "Tool",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest",
  popular: "Most popular",
};

export const BOOKMARKS_STORAGE_KEY = "learnvault:bookmarks";
