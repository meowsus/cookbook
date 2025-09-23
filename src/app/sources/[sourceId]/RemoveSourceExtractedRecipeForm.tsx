"use client";

import { removeSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function RemoveSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const [state, formAction, pending] = useActionState(
    removeSourceExtractedRecipeAction,
    null,
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="sourceId" value={sourceId} />

      <button
        type="submit"
        className="text-red-500 hover:text-red-600 cursor-pointer"
        disabled={pending}
      >
        Remove
      </button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
