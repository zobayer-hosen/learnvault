import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";

export interface Crumb {
  label: string;
  href?: Route;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-fg-subtle">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && <ChevronRight aria-hidden className="size-3.5" />}
            {item.href ? (
              <Link href={item.href} className="rounded-sm hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
