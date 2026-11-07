/** Joins truthy class names. Kept dependency-free on purpose. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}

const compactFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCount(value: number) {
  return compactFormatter.format(value);
}

export function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}
