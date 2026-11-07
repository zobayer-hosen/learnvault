import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: ReactNode;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow && <div className="mb-3 text-sm font-medium text-fg-subtle">{eyebrow}</div>}
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">{title}</h1>
        {description && (
          <p className="mt-3 max-w-2xl text-base text-pretty text-fg-muted">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  id?: string;
}

export function SectionHeader({ title, description, action, id }: SectionHeaderProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 id={id} className="text-lg font-semibold tracking-tight text-fg">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-fg-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
