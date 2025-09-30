"use client";

import { useActionState, useState } from "react";
import { createRecipeAction } from "@/lib/actions/recipes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const createDefaultRecipeName = (content: string | null) => {
  if (!content) return "";

  return content.substring(2, content.indexOf("\n"));
};

export default function CreateRecipeForm({ source }: { source: Object }) {
  const [state, formAction, pending] = useActionState(createRecipeAction, null);
  const [recipeName, setRecipeName] = useState(() =>
    createDefaultRecipeName(source.extractedRecipe),
  );
  const [recipeContent, setRecipeContent] = useState(
    () => source.extractedRecipe,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={source.id} />

      <div className="flex flex-col gap-2">
        <Input
          name="name"
          value={recipeName}
          onChange={(event) => {
            setRecipeName(event.target.value);
          }}
          required
        />
        <Textarea
          rows={10}
          name="content"
          value={recipeContent}
          onChange={(event) => {
            setRecipeContent(event?.target.value);
          }}
        />
        <div className="space-x-2">
          <Button type="submit" disabled={pending}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
