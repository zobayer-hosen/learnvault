import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border border-dashed border-border-strong bg-surface px-6 py-14 text-center",
        className,
      )}
    >
      <div className="relative mb-5">
        <div aria-hidden className="bg-dot-grid absolute -inset-6 rounded-full opacity-60 [mask-image:radial-gradient(closest-side,black,transparent)]" />
        <div className="relative flex size-12 items-center justify-center rounded-xl border border-border bg-surface shadow-card">
          <Icon aria-hidden className="size-5 text-fg-muted" />
        </div>
      </div>
      <h2 className="text-base font-semibold text-fg">{title}</h2>
      <p className="mt-1.5 max-w-sm text-sm text-pretty text-fg-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
