import { ArrowRight, FolderOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryIcon } from "@/components/categories/category-icon";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/ui/page-header";
import { getCategories, getCategoryBySlug } from "@/lib/services/categories";
import { getResourcesByCategory } from "@/lib/services/resources";
import { pluralize } from "@/lib/utils";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const category = await getCategoryBySlug((await params).slug);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const resources = await getResourcesByCategory(category.slug);
  const groups = category.subcategories
    .map((sub) => ({ ...sub, resources: resources.filter((r) => r.subcategorySlug === sub.slug) }))
    .filter((group) => group.resources.length > 0);

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow={
          <Breadcrumbs items={[{ label: "Categories", href: "/categories" }, { label: category.name }]} />
        }
        title={category.name}
        description={category.description}
        actions={
          <span className="flex size-12 items-center justify-center rounded-xl border border-border bg-surface text-accent shadow-card">
            <CategoryIcon icon={category.icon} className="size-5" />
          </span>
        }
      />

      {groups.length > 0 && (
        <nav aria-label="Subcategories" className="mt-6 flex flex-wrap gap-2">
          {groups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-fg-muted shadow-card hover:border-border-strong hover:text-fg"
            >
              {group.name}
              <span className="ml-1.5 text-fg-subtle tabular-nums">{group.resources.length}</span>
            </a>
          ))}
        </nav>
      )}

      {groups.length === 0 ? (
        <EmptyState
          className="mt-10"
          icon={FolderOpen}
          title="No resources here yet"
          description="This category is ready for new resources. Check back soon or explore another domain."
        />
      ) : (
        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <section key={group.slug} aria-labelledby={group.slug} className="scroll-mt-24">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <h2 id={group.slug} className="text-lg font-semibold tracking-tight text-fg">
                    {group.name}
                  </h2>
                  <p className="mt-0.5 text-sm text-fg-subtle">{pluralize(group.resources.length, "resource")}</p>
                </div>
                <Link
                  href={`/explore?category=${category.slug}&sub=${group.slug}`}
                  className="group inline-flex items-center gap-1 text-sm font-medium text-fg-muted hover:text-fg"
                >
                  Filter in Explore
                  <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <ResourceGrid resources={group.resources} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
