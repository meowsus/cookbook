"use client";

import { deleteSourceAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function DeleteSourceForm({
  sourceId,
}: {
  sourceId: string | number;
}) {
  const [state, formAction, pending] = useActionState(
    deleteSourceAction,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <button
        type="submit"
        className="text-red-500 hover:text-red-600 cursor-pointer"
        disabled={pending}
      >
        Delete
      </button>

      {state?.formErrors && (
        <ul className="list-disc list-inside text-red-500">
          {state.formErrors.map((error) => (
            <li key={error} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
