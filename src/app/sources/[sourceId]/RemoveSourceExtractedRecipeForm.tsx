"use client";

import { removeSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function RemoveSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string | number;
}) {
  const [state, formAction, pending] = useActionState(
    removeSourceExtractedRecipeAction,
    undefined,
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

      {state?.properties?.sourceId?.errors && (
        <ul className="list-disc list-inside text-red-500">
          {state.properties.sourceId.errors.map((error) => (
            <li key={error} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
