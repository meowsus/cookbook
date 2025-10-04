"use client";

import { deleteRecipeAction } from "@/lib/actions/recipes";
import { useAction } from "next-safe-action/hooks";

export default function DeleteRecipeForm({ recipeId }: { recipeId: string }) {
  const { execute, isPending, result } = useAction(deleteRecipeAction, null);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="recipeId" value={recipeId} />

      <button
        type="submit"
        className="text-red-500 hover:text-red-600 cursor-pointer"
        disabled={isPending}
      >
        Delete
      </button>

      {result?.error && <p className="text-red-500">{result.error}</p>}
    </form>
  );
}
