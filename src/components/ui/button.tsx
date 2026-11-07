import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent-hover",
  secondary:
    "border border-border bg-surface text-fg shadow-card hover:border-border-strong hover:bg-surface-muted",
  ghost: "text-fg-muted hover:bg-surface-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

export function buttonStyles({ variant = "primary", size = "md" }: StyleProps = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
