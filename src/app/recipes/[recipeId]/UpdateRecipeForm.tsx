"use client";

import { updateRecipeAction } from "@/lib/actions/recipes";
import { useAction } from "next-safe-action/hooks";

export default function UpdateRecipeForm({
  recipeId,
  name,
  content,
}: {
  recipeId: string;
  name: string;
  content: string;
}) {
  const { execute, isPending, result } = useAction(updateRecipeAction);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="recipeId" value={recipeId} />

      <div className="flex flex-col gap-2">
        <input name="name" defaultValue={name} required className="input" />
        <textarea
          rows={10}
          name="content"
          defaultValue={content}
          className="textarea"
        />
        <div className="space-x-2">
          <button
            className="btn btn-secondary"
            type="submit"
            disabled={isPending}
          >
            Save
          </button>
        </div>

        {result?.serverError && (
          <p className="text-red-500">{result.serverError.error}</p>
        )}
      </div>
    </form>
  );
}
