"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav, secondaryNav } from "@/config/navigation";
import { useBookmarks } from "@/lib/bookmarks/store";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const groups = { primary: primaryNav, secondary: secondaryNav };

export function NavLinks({ group, onNavigate }: { group: keyof typeof groups; onNavigate?: () => void }) {
  const items = groups[group];
  const pathname = usePathname();
  const { slugs } = useBookmarks();

  return (
    <ul className="flex flex-col gap-0.5">
      {items.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-surface text-fg shadow-card ring-1 ring-border"
                  : "text-fg-muted hover:bg-surface-muted hover:text-fg",
              )}
            >
              <Icon aria-hidden className={cn("size-4", active ? "text-accent" : "text-fg-subtle")} />
              <span className="flex-1">{label}</span>
              {href === "/bookmarks" && slugs.length > 0 && (
                <span className="rounded-md bg-surface-sunken px-1.5 text-xs font-medium text-fg-muted tabular-nums">
                  <span className="sr-only">, </span>
                  {slugs.length}
                  <span className="sr-only"> saved</span>
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
