"use client";

import { deleteSourceAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function DeleteSourceForm({ sourceId }: { sourceId: string }) {
  const [state, formAction, pending] = useActionState(deleteSourceAction, null);

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

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
