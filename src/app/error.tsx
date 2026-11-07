"use client";

import { RotateCcw, TriangleExclamationPoint } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function ErrorBoundary({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      className="mt-6"
      icon={TriangleExclamationPoint}
      title="Something went wrong"
      description="An unexpected error occurred while loading this page. Please try again."
      action={
        <Button variant="secondary" onClick={retry}>
          <RotateCcw aria-hidden />
          Try again
        </Button>
      }
    />
  );
}
