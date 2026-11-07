import { z } from "zod";
import { DIFFICULTIES, RESOURCE_TYPES, SORT_OPTIONS, type ResourceQuery } from "@/types";

type RawSearchParams = Record<string, string | string[] | undefined>;

const first = (value: unknown) => (Array.isArray(value) ? value[0] : value);

const slugParam = z.preprocess(
  first,
  z
    .string()
    .trim()
    .regex(/^[a-z0-9-]{1,64}$/)
    .optional()
    .catch(undefined),
);

/**
 * Validates explore-page URL params. Invalid values are dropped instead of
 * throwing, so a malformed or hand-edited URL still renders a useful page.
 */
export const resourceQuerySchema = z.object({
  q: z.preprocess(
    first,
    z
      .string()
      .trim()
      .max(100)
      .transform((value) => value || undefined)
      .optional()
      .catch(undefined),
  ),
  category: slugParam,
  sub: slugParam,
  type: z.preprocess(first, z.enum(RESOURCE_TYPES).optional().catch(undefined)),
  difficulty: z.preprocess(first, z.enum(DIFFICULTIES).optional().catch(undefined)),
  tags: z.preprocess(
    (value) =>
      (Array.isArray(value) ? value : [value])
        .filter((tag): tag is string => typeof tag === "string")
        .flatMap((tag) => tag.split(","))
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
    z
      .array(z.string().regex(/^[a-z0-9-]{1,40}$/))
      .max(10)
      .catch([]),
  ),
  sort: z.preprocess(first, z.enum(SORT_OPTIONS).catch("newest")),
});

export function parseResourceQuery(params: RawSearchParams): ResourceQuery {
  return resourceQuerySchema.parse(params);
}

/** Serializes a query back into URL search params, omitting defaults. */
export function toSearchParams(query: Partial<ResourceQuery>) {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.sub) params.set("sub", query.sub);
  if (query.type) params.set("type", query.type);
  if (query.difficulty) params.set("difficulty", query.difficulty);
  if (query.tags?.length) params.set("tags", query.tags.join(","));
  if (query.sort && query.sort !== "newest") params.set("sort", query.sort);
  return params;
}
