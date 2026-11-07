import type { Metadata } from "next";
import { CategoryCard } from "@/components/categories/category-card";
import { PageHeader } from "@/components/ui/page-header";
import { getCategories, getCategoryResourceCounts } from "@/lib/services/categories";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse LearnVault resources by technology domain.",
};

export default async function CategoriesPage() {
  const [categories, counts] = await Promise.all([getCategories(), getCategoryResourceCounts()]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Categories"
        description="Every resource lives in a domain and a more specific subcategory. Pick a domain to start exploring."
      />
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <CategoryCard category={category} resourceCount={counts[category.slug] ?? 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}
