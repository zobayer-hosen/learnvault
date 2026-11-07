# LearnVault

**Your Knowledge, One Place.** A centralized platform to discover, organize, and save learning resources for software engineering and technology.

## Stack

Next.js 16 (App Router, Cache Components, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Zod · Lucide React

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (prerenders all resource, category, and path pages)
npm run lint
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Dashboard: featured paths, recent and popular resources, saved items, categories |
| `/explore` | Search + filter (category, subcategory, type, difficulty, tags) and sort; state lives in the URL |
| `/categories`, `/categories/[slug]` | Category index and detail, grouped by subcategory |
| `/resources/[slug]` | Resource detail with external link, tags, related resources, and paths it belongs to |
| `/learning-paths`, `/learning-paths/[slug]` | Learning paths and their ordered steps |
| `/bookmarks` | Saved resources |
| `/about` | About the project |

## Project structure

```
src/
  app/                 Routes only — thin pages that compose components
  components/
    ui/                Design-system primitives (button, badge, field, empty state, …)
    layout/            App shell: sidebar, mobile drawer, header search
    resources/         Resource cards, cover, filters, bookmarks UI
    categories/        Category card and icon map
    paths/             Learning path card
  config/              Navigation
  lib/
    data/              SAMPLE DATA (categories, resources, learning paths)
    services/          Async data-access layer — the seam for PostgreSQL/API
    validation/        Zod schemas (explore query params)
    bookmarks/         Client bookmark store (localStorage, Zod-validated)
  types/               Domain types
```

### Design decisions

- **Server Components by default.** Client components are limited to interactive islands: navigation state, the mobile drawer, search, filters, and bookmarks.
- **Data access through `lib/services`.** Every function is `async` and returns plain data, so the mock arrays can be swapped for a database without UI changes.
- **URL-driven filtering.** Explore params are parsed with Zod on the server, and invalid values are dropped rather than throwing, so filtered views can be shared and bookmarked.
- **Bookmarks** are stored per-device in `localStorage` behind the `useBookmarks()` hook, which is the seam for a server-backed version once auth exists.
- **Design tokens** live in `src/app/globals.css`: warm neutrals with one teal accent, light and dark themes via `prefers-color-scheme`, and respect for reduced motion.

## About the sample data

Every resource links to its real, publicly available source. **`dateAdded` and `saves` are sample values** used to demonstrate sorting and ranking until real analytics exist.

## Next phase

Authentication · PostgreSQL integration · public API · learning-path progress tracking.
