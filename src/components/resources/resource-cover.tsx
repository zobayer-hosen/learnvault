import Image from "next/image";
import { RESOURCE_TYPE_LABELS } from "@/lib/constants";
import { cn, hostname } from "@/lib/utils";
import type { Resource } from "@/types";
import { ResourceTypeIcon } from "./resource-type-icon";

/**
 * Renders the resource's cover image when one exists, otherwise a generated
 * cover so the catalog never shows broken or placeholder imagery.
 */
export function ResourceCover({
  resource,
  size = "card",
  className,
}: {
  resource: Pick<Resource, "title" | "type" | "url" | "coverImage">;
  size?: "card" | "hero";
  className?: string;
}) {
  if (resource.coverImage) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
        <Image src={resource.coverImage} alt="" fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />
      </div>
    );
  }

  const hero = size === "hero";

  return (
    <div aria-hidden className={cn("relative overflow-hidden bg-surface-muted", className)}>
      <div className="bg-dot-grid absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom_right,black,transparent_85%)]" />
      <div className="relative flex h-full items-end justify-between gap-3 p-4">
        <span className={cn("min-w-0 truncate font-mono text-fg-subtle", hero ? "text-xs" : "text-[11px]")}>
          {hostname(resource.url)}
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-fg-muted shadow-card transition-transform duration-300 group-hover:-translate-y-0.5",
            hero ? "size-14" : "size-10",
          )}
          title={RESOURCE_TYPE_LABELS[resource.type]}
        >
          <ResourceTypeIcon type={resource.type} className={hero ? "size-6" : "size-[18px]"} />
        </span>
      </div>
    </div>
  );
}
