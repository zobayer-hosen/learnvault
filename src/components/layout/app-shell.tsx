import type { ReactNode } from "react";
import { SITE } from "@/lib/constants";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { SidebarContent } from "./sidebar-content";
import { SiteSearch } from "./site-search";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[16rem_1fr]">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <aside className="sticky top-0 hidden h-dvh flex-col border-r border-border px-4 pt-5 pb-5 lg:flex">
        <div className="mb-8 px-1">
          <Logo />
        </div>
        <SidebarContent />
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-10">
            <MobileNav />
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="ml-auto flex flex-1 justify-end lg:ml-0 lg:justify-start">
              <SiteSearch />
            </div>
          </div>
        </header>

        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 pt-8 pb-16 sm:px-6 lg:px-10 lg:pt-10">
          {children}
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs text-fg-subtle sm:flex-row sm:justify-between sm:px-6 lg:px-10">
            <p>
              {SITE.name} — {SITE.tagline}
            </p>
            <p>Resources belong to their respective authors.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
