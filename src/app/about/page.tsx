import { Bookmark, Compass, Database, KeyRound, Route, ServerCog, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { SITE } from "@/lib/constants";
import { getCatalogStats } from "@/lib/services/resources";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE.name} is, how it works, and what's coming next.`,
};

const pillars: Array<{ icon: LucideIcon; title: string; body: string }> = [
  {
    icon: Compass,
    title: "Discover",
    body: "Search and filter a curated catalog by category, type, difficulty, and tags instead of hopping between search engines.",
  },
  {
    icon: Route,
    title: "Follow a path",
    body: "Learning paths turn a pile of links into an ordered sequence, so you always know what to study next.",
  },
  {
    icon: Bookmark,
    title: "Keep what matters",
    body: "Save resources to your personal vault and come back to them whenever you're ready.",
  },
];

const roadmap: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: KeyRound, title: "Accounts", body: "Sign in to sync bookmarks and progress across devices." },
  { icon: Database, title: "PostgreSQL", body: "Move the catalog from sample data into a real database." },
  { icon: ServerCog, title: "Public API", body: "Read and contribute resources programmatically." },
  { icon: Sparkles, title: "Progress tracking", body: "Mark steps as complete as you work through a path." },
];

export default async function AboutPage() {
  const stats = await getCatalogStats();

  return (
    <div className="animate-fade-in">
      <PageHeader
        eyebrow={SITE.tagline}
        title={`About ${SITE.name}`}
        description="LearnVault is one organized home for learning resources, so you can spend less time searching and more time learning."
      />

      <section aria-labelledby="pillars-heading" className="mt-10">
        <h2 id="pillars-heading" className="sr-only">
          What LearnVault does
        </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <li key={title} className="rounded-xl border border-border bg-surface p-5 shadow-card">
              <Icon aria-hidden className="size-5 text-accent" />
              <h3 className="mt-4 text-sm font-semibold text-fg">{title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{body}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <section aria-labelledby="catalog-heading">
          <h2 id="catalog-heading" className="text-lg font-semibold tracking-tight text-fg">
            About the catalog
          </h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-fg-muted">
            <p>
              This first release focuses on software engineering and technology. It currently holds{" "}
              {stats.resources} resources across {stats.categories} categories and {stats.learningPaths} learning
              paths.
            </p>
            <p>
              Every resource links to its real, original source, and all content belongs to its authors. The{" "}
              <span className="font-medium text-fg">dates added and save counts are sample values</span> used to
              demonstrate sorting and ranking until real analytics are in place.
            </p>
            <p>Bookmarks are stored in your browser on this device for now.</p>
          </div>
        </section>

        <section aria-labelledby="roadmap-heading">
          <h2 id="roadmap-heading" className="text-lg font-semibold tracking-tight text-fg">
            What’s next
          </h2>
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-surface shadow-card">
            {roadmap.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3 p-4">
                <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-fg-subtle" />
                <div>
                  <h3 className="text-sm font-medium text-fg">{title}</h3>
                  <p className="mt-0.5 text-sm text-fg-muted">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-14 flex flex-wrap gap-3 border-t border-border pt-8">
        <ButtonLink href="/explore">Start exploring</ButtonLink>
        <ButtonLink href="/learning-paths" variant="secondary">
          View learning paths
        </ButtonLink>
      </div>
    </div>
  );
}
