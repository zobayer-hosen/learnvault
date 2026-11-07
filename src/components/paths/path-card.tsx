import { ArrowRight, Clock, Layers } from "lucide-react";
import Link from "next/link";
import { DifficultyBadge } from "@/components/ui/badge";
import { countPathResources } from "@/lib/services/learning-paths";
import { pluralize } from "@/lib/utils";
import type { LearningPath } from "@/types";

export function PathCard({ path }: { path: LearningPath }) {
  return (
    <Link
      href={`/learning-paths/${path.slug}`}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-[border-color,box-shadow] duration-200 hover:border-border-strong hover:shadow-raised"
    >
      <div className="flex items-center justify-between gap-3">
        <DifficultyBadge level={path.difficulty} />
        <span className="font-mono text-xs text-fg-subtle tabular-nums">
          {String(path.steps.length).padStart(2, "0")} steps
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-fg">{path.title}</h3>
      <p className="mt-1.5 text-sm text-fg-muted">{path.summary}</p>

      {/* Step rail: a compact preview of the path's shape. */}
      <ol aria-hidden className="mt-5 flex items-center gap-1">
        {path.steps.map((step, index) => (
          <li
            key={step.title}
            className="h-1 flex-1 rounded-full bg-border transition-colors duration-300 group-hover:bg-accent/60"
            style={{ transitionDelay: `${index * 40}ms` }}
          />
        ))}
      </ol>

      <div className="mt-auto flex items-center justify-between pt-5 text-xs text-fg-subtle">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5" />
            {path.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Layers aria-hidden className="size-3.5" />
            {pluralize(countPathResources(path), "resource")}
          </span>
        </span>
        <ArrowRight
          aria-hidden
          className="size-4 -translate-x-1 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100"
        />
      </div>
    </Link>
  );
}
