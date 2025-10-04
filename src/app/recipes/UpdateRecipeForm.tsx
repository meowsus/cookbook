"use client";

import { ChangeEvent, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { updateRecipeAction } from "@/lib/actions/recipes";

export default function UpdateRecipeForm({ recipe }: { recipe: object }) {
  const { execute, isPending, result } = useAction(updateRecipeAction, null);
  const [recipeName, setRecipeName] = useState(() => recipe.name);
  const [recipeContent, setRecipeContent] = useState(() => recipe.content);
  console.log(recipe);
  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="recipeId" value={recipe.id} />

      <div className="flex flex-col gap-2">
        <input
          name="name"
          value={recipeName}
          onChange={(event: ChangeEvent) => {
            setRecipeName(event.target.value);
          }}
          required
        />
        <textarea
          rows={10}
          name="content"
          value={recipeContent}
          onChange={(event: ChangeEvent) => {
            setRecipeContent(event?.target.value);
          }}
        />
        <div className="space-x-2">
          <button type="submit" disabled={isPending}>
            Save
          </button>
        </div>

        {result?.error && <p className="text-red-500">{result.error}</p>}
      </div>
    </form>
  );
}
