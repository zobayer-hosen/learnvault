import { ArrowUpRight, Calendar, Route, Tag, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BookmarkButton } from "@/components/resources/bookmark-button";
import { ResourceCover } from "@/components/resources/resource-cover";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceTypeIcon } from "@/components/resources/resource-type-icon";
import { Badge, DifficultyBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { buttonStyles } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/page-header";
import { RESOURCE_TYPE_LABELS } from "@/lib/constants";
import { getCategoryBySlug, getSubcategoryName } from "@/lib/services/categories";
import { getLearningPathsForResource } from "@/lib/services/learning-paths";
import { getRelatedResources, getResourceBySlug, getResources } from "@/lib/services/resources";
import { formatDate, hostname } from "@/lib/utils";

export async function generateStaticParams() {
  const resources = await getResources();
  return resources.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const resource = await getResourceBySlug((await params).slug);
  return resource ? { title: resource.title, description: resource.description } : {};
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  const [category, related, paths] = await Promise.all([
    getCategoryBySlug(resource.categorySlug),
    getRelatedResources(resource),
    getLearningPathsForResource(resource.slug),
  ]);
  const subcategoryName = category ? getSubcategoryName(category, resource.subcategorySlug) : null;

  return (
    <div className="animate-fade-in">
      <Breadcrumbs
        items={[
          { label: "Explore", href: "/explore" },
          ...(category ? [{ label: category.name, href: `/categories/${category.slug}` as const }] : []),
          { label: resource.title },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
        <article className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">
              <ResourceTypeIcon type={resource.type} className="size-3.5" />
              {RESOURCE_TYPE_LABELS[resource.type]}
            </Badge>
            <DifficultyBadge level={resource.difficulty} />
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
            {resource.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-pretty text-fg-muted">{resource.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles()}
            >
              Open resource
              <ArrowUpRight aria-hidden />
              <span className="sr-only">(opens {hostname(resource.url)} in a new tab)</span>
            </a>
            <BookmarkButton slug={resource.slug} title={resource.title} variant="full" />
          </div>

          <ResourceCover
            resource={resource}
            size="hero"
            className="mt-10 aspect-[16/7] rounded-xl border border-border"
          />
        </article>

        <aside className="space-y-6 lg:pt-1">
          <section aria-labelledby="details-heading" className="rounded-xl border border-border bg-surface p-5 shadow-card">
            <h2 id="details-heading" className="text-sm font-semibold text-fg">
              Details
            </h2>
            <dl className="mt-4 space-y-3.5 text-sm">
              {category && (
                <Detail label="Category">
                  <Link href={`/categories/${category.slug}`} className="text-fg hover:text-accent">
                    {category.name}
                  </Link>
                  {subcategoryName && <span className="text-fg-subtle"> / {subcategoryName}</span>}
                </Detail>
              )}
              <Detail label="Source" icon={<User aria-hidden className="size-3.5" />}>
                {resource.author}
              </Detail>
              <Detail label="Website">
                <span className="font-mono text-xs">{hostname(resource.url)}</span>
              </Detail>
              <Detail label="Date added" icon={<Calendar aria-hidden className="size-3.5" />}>
                <time dateTime={resource.dateAdded}>{formatDate(resource.dateAdded)}</time>
              </Detail>
            </dl>
          </section>

          <section aria-labelledby="tags-heading" className="rounded-xl border border-border bg-surface p-5 shadow-card">
            <h2 id="tags-heading" className="flex items-center gap-2 text-sm font-semibold text-fg">
              <Tag aria-hidden className="size-4 text-fg-subtle" />
              Tags
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {resource.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/explore?tags=${tag}`}
                    className="inline-block rounded-md border border-border px-2 py-1 font-mono text-xs text-fg-muted hover:border-border-strong hover:text-fg"
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {paths.length > 0 && (
            <section aria-labelledby="paths-heading" className="rounded-xl border border-border bg-surface p-5 shadow-card">
              <h2 id="paths-heading" className="flex items-center gap-2 text-sm font-semibold text-fg">
                <Route aria-hidden className="size-4 text-fg-subtle" />
                Part of these paths
              </h2>
              <ul className="-mx-2 mt-2">
                {paths.map((path) => (
                  <li key={path.slug}>
                    <Link
                      href={`/learning-paths/${path.slug}`}
                      className="block rounded-lg px-2 py-2 text-sm text-fg-muted hover:bg-surface-muted hover:text-fg"
                    >
                      {path.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16 border-t border-border pt-10">
          <SectionHeader id="related-heading" title={`More in ${category?.name ?? "this category"}`} />
          <ResourceGrid resources={related} />
        </section>
      )}
    </div>
  );
}

function Detail({ label, icon, children }: { label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3">
      <dt className="flex items-center gap-1.5 text-fg-subtle">
        {icon}
        {label}
      </dt>
      <dd className="min-w-0 text-fg">{children}</dd>
    </div>
  );
}
