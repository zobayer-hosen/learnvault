"use client";

import { useCallback, useSyncExternalStore } from "react";
import { z } from "zod";
import { BOOKMARKS_STORAGE_KEY } from "@/lib/constants";

/*
 * Bookmarks live in localStorage until authentication and a database exist.
 * The hook API (useBookmarks) is the seam: swap this module for a server-backed
 * implementation later without changing any component.
 */

const bookmarksSchema = z.array(z.string().max(120)).max(500);

const EMPTY: readonly string[] = Object.freeze([]);
const listeners = new Set<() => void>();
let cache: readonly string[] | null = null;

function read(): readonly string[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    const parsed = bookmarksSchema.safeParse(raw ? JSON.parse(raw) : []);
    cache = parsed.success ? parsed.data : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function write(next: readonly string[]) {
  cache = next;
  try {
    window.localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode, quota). Keep in-memory state.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== BOOKMARKS_STORAGE_KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => EMPTY;

export function useBookmarks() {
  const slugs = useSyncExternalStore(subscribe, read, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const toggle = useCallback((slug: string) => {
    const current = read();
    write(current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current]);
  }, []);

  const clear = useCallback(() => write(EMPTY), []);

  return {
    slugs,
    /** False during SSR and the first client render; use it to avoid flashing empty states. */
    hydrated,
    isBookmarked: (slug: string) => slugs.includes(slug),
    toggle,
    clear,
  };
}

function noopSubscribe() {
  return () => {};
}
