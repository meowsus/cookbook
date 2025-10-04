"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { createRecipeAction } from "@/lib/actions/recipes";

const createDefaultRecipeName = (content: string | null) => {
  if (!content) return "";

  return content.substring(2, content.indexOf("\n"));
};

export default function CreateRecipeForm({ source }: { source: Object }) {
  const { execute, isPending, result } = useAction(createRecipeAction, null);
  const [recipeName, setRecipeName] = useState(() =>
    createDefaultRecipeName(source.extractedRecipe),
  );
  const [recipeContent, setRecipeContent] = useState(
    () => source.extractedRecipe,
  );

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={source.id} />

      <div className="flex flex-col gap-2">
        <input
          name="name"
          value={recipeName}
          onChange={(event) => {
            setRecipeName(event.target.value);
          }}
          required
        />
        <textarea
          rows={10}
          name="content"
          value={recipeContent}
          onChange={(event) => {
            setRecipeContent(event?.target.value);
          }}
        />
        <div className="space-x-2">
          <button type="submit" disabled={isPending}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
