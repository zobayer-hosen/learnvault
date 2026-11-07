import type { Metadata } from "next";
import { BookmarksList } from "@/components/resources/bookmarks-list";
import { PageHeader } from "@/components/ui/page-header";
import { getCategoryNameMap } from "@/lib/services/categories";
import { getResources } from "@/lib/services/resources";

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "Resources you've saved for later.",
};

export default async function BookmarksPage() {
  const [resources, categoryNames] = await Promise.all([getResources(), getCategoryNameMap()]);

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Bookmarks"
        description="Everything you've saved for later. Bookmarks are stored on this device until accounts arrive."
      />
      <div className="mt-8">
        <BookmarksList resources={resources} categoryNames={categoryNames} />
      </div>
    </div>
  );
}
