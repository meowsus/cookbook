"use client";

import { Button } from "@/components/ui/button";
import { deleteRecipeAction } from "@/lib/actions/recipes";
import { useActionState } from "react";

export default function DeleteRecipeForm({ recipeId }: { recipeId: string }) {
  const [state, formAction, pending] = useActionState(deleteRecipeAction, null);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="recipeId" value={recipeId} />

      <Button type="submit" variant="destructive" disabled={pending}>
        Delete
      </Button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
