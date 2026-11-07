import { Check, Clock, Layers, ListOrdered } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ResourceCard } from "@/components/resources/resource-card";
import { DifficultyBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { PageHeader } from "@/components/ui/page-header";
import { getCategoryNameMap } from "@/lib/services/categories";
import { countPathResources, getLearningPathBySlug, getLearningPaths } from "@/lib/services/learning-paths";
import { getResourcesBySlugs } from "@/lib/services/resources";
import { pluralize } from "@/lib/utils";

export async function generateStaticParams() {
  const paths = await getLearningPaths();
  return paths.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/learning-paths/[slug]">): Promise<Metadata> {
  const path = await getLearningPathBySlug((await params).slug);
  return path ? { title: path.title, description: path.summary } : {};
}

export default async function LearningPathPage({ params }: PageProps<"/learning-paths/[slug]">) {
  const { slug } = await params;
  const path = await getLearningPathBySlug(slug);
  if (!path) notFound();

  const [steps, categoryNames] = await Promise.all([
    Promise.all(
      path.steps.map(async (step) => ({ ...step, resources: await getResourcesBySlugs(step.resourceSlugs) })),
    ),
    getCategoryNameMap(),
  ]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow={<Breadcrumbs items={[{ label: "Learning Paths", href: "/learning-paths" }, { label: path.title }]} />}
        title={path.title}
        description={path.description}
      />

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[18rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-surface p-5 shadow-card">
            <dl className="grid grid-cols-3 gap-4 lg:grid-cols-1">
              <Stat icon={<ListOrdered aria-hidden className="size-4" />} label="Steps" value={String(path.steps.length)} />
              <Stat icon={<Layers aria-hidden className="size-4" />} label="Resources" value={String(countPathResources(path))} />
              <Stat icon={<Clock aria-hidden className="size-4" />} label="Suggested pace" value={path.duration} />
            </dl>
            <div className="mt-5 border-t border-border pt-5">
              <DifficultyBadge level={path.difficulty} />
            </div>
          </div>

          <section aria-labelledby="outcomes-heading" className="mt-4 rounded-xl border border-border bg-surface p-5 shadow-card">
            <h2 id="outcomes-heading" className="text-sm font-semibold text-fg">
              What you’ll be able to do
            </h2>
            <ul className="mt-3 space-y-2.5">
              {path.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-2.5 text-sm text-fg-muted">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
                  {outcome}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <ol aria-label="Path steps" className="relative">
          {steps.map((step, index) => (
            <li key={step.title} className="relative pb-12 pl-12 last:pb-0">
              {index < steps.length - 1 && (
                <span aria-hidden className="absolute top-9 bottom-1 left-[15px] w-px bg-border" />
              )}
              <span
                aria-hidden
                className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs font-medium text-fg-muted shadow-card"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="pt-1 text-base font-semibold tracking-tight text-fg">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h2>
              <p className="mt-1 text-sm text-fg-muted">
                {step.description}{" "}
                <span className="text-fg-subtle">({pluralize(step.resources.length, "resource")})</span>
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                {step.resources.map((resource) => (
                  <li key={resource.slug} className="flex">
                    <ResourceCard
                      resource={resource}
                      categoryName={categoryNames[resource.categorySlug] ?? "Uncategorized"}
                      className="w-full"
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-fg-subtle">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold text-fg">{value}</dd>
    </div>
  );
}
