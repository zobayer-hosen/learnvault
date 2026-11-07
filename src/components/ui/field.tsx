import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const control =
  "h-10 w-full rounded-lg border border-border bg-surface text-sm text-fg shadow-card transition-colors placeholder:text-fg-subtle hover:border-border-strong focus-visible:border-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/25";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "px-3", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "cursor-pointer appearance-none pr-9 pl-3", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-fg-subtle"
      />
    </div>
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-xs font-medium text-fg-muted", className)} {...props} />;
}
