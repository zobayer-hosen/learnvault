"use client";

import { Search } from "lucide-react";
import Form from "next/form";
import { useEffect, useRef } from "react";

/** Global search. Submits to /explore and works without JavaScript. */
export function SiteSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Form action="/explore" role="search" className="relative w-full max-w-md">
      <label htmlFor="site-search" className="sr-only">
        Search resources
      </label>
      <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-subtle" />
      <input
        ref={inputRef}
        id="site-search"
        name="q"
        type="search"
        placeholder="Search resources…"
        autoComplete="off"
        maxLength={100}
        className="h-9 w-full rounded-lg border border-border bg-surface pr-10 pl-9 text-sm text-fg shadow-card transition-colors placeholder:text-fg-subtle hover:border-border-strong focus-visible:border-accent focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/25 [&::-webkit-search-cancel-button]:hidden"
      />
      <kbd
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 rounded border border-border bg-surface-muted px-1.5 font-mono text-[11px] text-fg-subtle sm:block"
      >
        /
      </kbd>
    </Form>
  );
}
