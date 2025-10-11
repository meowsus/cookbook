"use client";

import { useAction } from "next-safe-action/hooks";
import { createRecipeAction } from "@/lib/actions/recipes";

const createDefaultRecipeName = (content: string | null) => {
  if (!content) return "";

  // This is a temporary measure until we improve the LLM output to
  // include a seprate name value.
  return content.substring(2, content.indexOf("\n"));
};

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
