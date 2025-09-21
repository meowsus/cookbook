"use client";

import { Button } from "@/components/ui/button";
import { removeSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function RemoveSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const { execute, result, isPending } = useAction(
    removeSourceExtractedRecipeAction,
  );

  return (
    <form action={execute}>
      <input type="hidden" name="sourceId" value={sourceId} />

      <Button type="submit" variant="destructive" disabled={isPending}>
        Remove
      </Button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
