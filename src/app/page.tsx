import { ArrowRight, Compass, Route } from "lucide-react";
import Link from "next/link";
import { CategoryCard } from "@/components/categories/category-card";
import { PathCard } from "@/components/paths/path-card";
import { PopularList } from "@/components/resources/popular-list";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { SavedQuickAccess } from "@/components/resources/saved-quick-access";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/page-header";
import { SITE } from "@/lib/constants";
import { getCategories, getCategoryResourceCounts } from "@/lib/services/categories";
import { getFeaturedLearningPaths } from "@/lib/services/learning-paths";
import { getResourceSummaries } from "@/lib/services/resource-summaries";
import { getCatalogStats, getPopularResources, getRecentResources } from "@/lib/services/resources";

export default async function DashboardPage() {
  const [stats, recent, popular, paths, categories, counts, summaries] = await Promise.all([
    getCatalogStats(),
    getRecentResources(4),
    getPopularResources(6),
    getFeaturedLearningPaths(3),
    getCategories(),
    getCategoryResourceCounts(),
    getResourceSummaries(),
  ]);

  return (
    <div className="animate-fade-in space-y-14">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-10 shadow-card sm:px-10 sm:py-12">
        <div
          aria-hidden
          className="bg-dot-grid absolute inset-y-0 right-0 w-2/3 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]"
        />
        <div className="relative max-w-xl">
          <p className="text-sm font-medium text-accent">{SITE.name}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-fg sm:text-[2.5rem] sm:leading-[1.1]">
            {SITE.tagline}
          </h1>
          <p className="mt-4 text-base text-pretty text-fg-muted">
            Hand-picked documentation, courses, books, and tools for software engineers — organized so you
            can stop searching and start learning.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/explore">
              <Compass aria-hidden />
              Explore resources
            </ButtonLink>
            <ButtonLink href="/learning-paths" variant="secondary">
              <Route aria-hidden />
              Browse learning paths
            </ButtonLink>
          </div>
        </div>
        <dl className="relative mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
          {[
            ["Resources", stats.resources],
            ["Categories", stats.categories],
            ["Learning paths", stats.learningPaths],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-fg-subtle">{label}</dt>
              <dd className="mt-1 text-2xl font-semibold tracking-tight text-fg tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="paths-heading">
        <SectionHeader
          id="paths-heading"
          title="Featured learning paths"
          description="Structured, step-by-step routes through a discipline."
          action={<SeeAll href="/learning-paths" label="All paths" />}
        />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {paths.map((path) => (
            <li key={path.slug}>
              <PathCard path={path} />
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-6">
        <section aria-labelledby="recent-heading" className="lg:col-span-2">
          <SectionHeader
            id="recent-heading"
            title="Recently added"
            description="The latest additions to the vault."
            action={<SeeAll href="/explore" label="Explore" />}
          />
          <ResourceGrid resources={recent} className="xl:grid-cols-2" />
        </section>

        <div className="space-y-6">
          <SavedQuickAccess items={summaries} />
          <section aria-labelledby="popular-heading" className="rounded-xl border border-border bg-surface p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="popular-heading" className="text-sm font-semibold text-fg">
                Most saved
              </h2>
              <Link href="/explore?sort=popular" className="text-xs font-medium text-fg-muted hover:text-fg">
                See ranking
              </Link>
            </div>
            <PopularList resources={popular} />
          </section>
        </div>
      </div>

      <section aria-labelledby="categories-heading">
        <SectionHeader
          id="categories-heading"
          title="Browse by category"
          action={<SeeAll href="/categories" label="All categories" />}
        />
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <li key={category.slug}>
              <CategoryCard category={category} resourceCount={counts[category.slug] ?? 0} variant="compact" />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SeeAll({ href, label }: { href: "/explore" | "/learning-paths" | "/categories"; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-fg-muted hover:text-fg"
    >
      {label}
      <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
