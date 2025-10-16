"use client";

import { deleteRecipeAction } from "@/lib/actions/recipes";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useAction } from "next-safe-action/hooks";

export default function DeleteRecipeForm({ recipeId }: { recipeId: string }) {
  const { execute, isPending, result } = useAction(deleteRecipeAction);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="recipeId" value={recipeId} />

      <button
        type="submit"
        className="btn btn-square btn-ghost btn-error"
        disabled={isPending}
        title="Delete recipe"
      >
        <TrashIcon className="size-4" />
      </button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
