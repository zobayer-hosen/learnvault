import { FileQuestionMark } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <EmptyState
      className="mt-6"
      icon={FileQuestionMark}
      title="We couldn’t find that page"
      description="The resource, category, or path you’re looking for may have moved or doesn’t exist."
      action={
        <div className="flex gap-3">
          <ButtonLink href="/">Back to dashboard</ButtonLink>
          <ButtonLink href="/explore" variant="secondary">
            Explore resources
          </ButtonLink>
        </div>
      }
    />
  );
}
