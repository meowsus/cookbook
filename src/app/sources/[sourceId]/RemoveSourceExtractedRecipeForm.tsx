"use client";

import { removeSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { BackspaceIcon } from "@heroicons/react/24/solid";
import { useAction } from "next-safe-action/hooks";

export default function RemoveSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const { execute, isPending, result } = useAction(
    removeSourceExtractedRecipeAction,
  );

  return (
    <form action={execute}>
      <input type="hidden" name="sourceId" value={sourceId} />
      <input type="hidden" name="extractedRecipe" value="" />

      <button
        type="submit"
        className="btn btn-ghost btn-sm btn-error"
        disabled={isPending}
      >
        <BackspaceIcon className="size-4" />
      </button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
