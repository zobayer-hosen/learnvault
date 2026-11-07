import Link from "next/link";
import { SITE } from "@/lib/constants";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 rounded-lg" aria-label={`${SITE.name} home`}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-fg text-background">
        <svg viewBox="0 0 24 24" aria-hidden className="size-4.5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <path d="M8 4v16" />
          <circle cx="14.5" cy="12" r="2.5" />
        </svg>
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-fg">{SITE.name}</span>
    </Link>
  );
}
