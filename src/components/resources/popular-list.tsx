import Link from "next/link";
import { formatCount } from "@/lib/utils";
import type { Resource } from "@/types";

export function PopularList({ resources }: { resources: Resource[] }) {
  return (
    <ol className="-mx-2 space-y-0.5">
      {resources.map((resource, index) => (
        <li key={resource.slug}>
          <Link
            href={`/resources/${resource.slug}`}
            className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-muted"
          >
            <span className="w-5 shrink-0 font-mono text-xs text-fg-subtle tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg">{resource.title}</span>
            <span className="shrink-0 text-xs text-fg-subtle tabular-nums">
              {formatCount(resource.saves)}
              <span className="sr-only"> saves</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
