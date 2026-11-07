import type { ComponentProps } from "react";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types";

type Tone = "neutral" | "accent" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-muted text-fg-muted",
  accent: "bg-accent-soft text-accent",
  outline: "border border-border text-fg-muted",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

const levelDot: Record<Difficulty, string> = {
  beginner: "bg-level-beginner",
  intermediate: "bg-level-intermediate",
  advanced: "bg-level-advanced",
};

export function DifficultyBadge({ level, className }: { level: Difficulty; className?: string }) {
  return (
    <Badge tone="outline" className={className}>
      <span aria-hidden className={cn("size-1.5 rounded-full", levelDot[level])} />
      {DIFFICULTY_LABELS[level]}
    </Badge>
  );
}
