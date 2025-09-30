"use client";

import { ChangeEvent, useActionState, useState } from "react";
import { updateRecipeAction } from "@/lib/actions/recipes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function UpdateRecipeForm({ recipe }: { recipe: object }) {
  const [state, formAction, pending] = useActionState(updateRecipeAction, null);
  const [recipeName, setRecipeName] = useState(() => recipe.name);
  const [recipeContent, setRecipeContent] = useState(() => recipe.content);
  console.log(recipe);
  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="recipeId" value={recipe.id} />

      <div className="flex flex-col gap-2">
        <Input
          name="name"
          value={recipeName}
          onChange={(event: ChangeEvent) => {
            setRecipeName(event.target.value);
          }}
          required
        />
        <Textarea
          rows={10}
          name="content"
          value={recipeContent}
          onChange={(event: ChangeEvent) => {
            setRecipeContent(event?.target.value);
          }}
        />
        <div className="space-x-2">
          <Button type="submit" disabled={pending}>
            Save
          </Button>
        </div>

        {state?.error && <p className="text-red-500">{state.error}</p>}
      </div>
    </form>
  );
}
