import {
  BookOpen,
  CirclePlay,
  FileText,
  FolderGit2,
  GraduationCap,
  Hammer,
  Library,
  Map as MapIcon,
  Newspaper,
  Compass,
  type LucideIcon,
} from "lucide-react";
import type { ResourceType } from "@/types";

const icons: Record<ResourceType, LucideIcon> = {
  documentation: FileText,
  "official-guide": Compass,
  course: GraduationCap,
  tutorial: Library,
  article: Newspaper,
  video: CirclePlay,
  "github-repo": FolderGit2,
  book: BookOpen,
  roadmap: MapIcon,
  tool: Hammer,
};

export function ResourceTypeIcon({ type, className }: { type: ResourceType; className?: string }) {
  const Icon = icons[type];
  return <Icon aria-hidden className={className} />;
}
