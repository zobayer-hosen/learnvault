import { NavLinks } from "./nav-links";

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <nav aria-label="Main" className="flex-1">
        <p className="mb-2 px-2.5 text-xs font-medium tracking-wide text-fg-subtle uppercase">Library</p>
        <NavLinks group="primary" onNavigate={onNavigate} />
        <p className="mt-8 mb-2 px-2.5 text-xs font-medium tracking-wide text-fg-subtle uppercase">LearnVault</p>
        <NavLinks group="secondary" onNavigate={onNavigate} />
      </nav>
      <div className="rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-fg-muted">
        <p className="font-medium text-fg">Preview catalog</p>
        <p className="mt-1">
          Resources link to real sites. Dates and save counts are sample values.
        </p>
      </div>
    </div>
  );
}
