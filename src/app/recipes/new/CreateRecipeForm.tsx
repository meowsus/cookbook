"use client";

import { createRecipeAction } from "@/lib/actions/recipes";
import { createDefaultRecipeName } from "@/lib/helpers/recipe";
import { useAction } from "next-safe-action/hooks";

export default function CreateRecipeForm({
  sourceId,
  recipeContent,
}: {
  sourceId: string;
  recipeContent: string;
}) {
  const { execute, isPending, result } = useAction(createRecipeAction);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <div className="flex flex-col gap-2">
        <input
          name="name"
          defaultValue={createDefaultRecipeName(recipeContent)}
          required
          className="input"
        />
        <textarea
          rows={10}
          name="content"
          defaultValue={recipeContent}
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
      </div>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
