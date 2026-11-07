import type { Metadata } from "next";
import { PathCard } from "@/components/paths/path-card";
import { PageHeader } from "@/components/ui/page-header";
import { getLearningPaths } from "@/lib/services/learning-paths";

export const metadata: Metadata = {
  title: "Learning Paths",
  description: "Structured, ordered routes through software engineering disciplines.",
};

export default async function LearningPathsPage() {
  const paths = await getLearningPaths();

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Learning paths"
        description="Curated sequences of resources that take you from fundamentals to proficiency — one deliberate step at a time."
      />
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paths.map((path) => (
          <li key={path.slug}>
            <PathCard path={path} />
          </li>
        ))}
      </ul>
    </div>
  );
}
