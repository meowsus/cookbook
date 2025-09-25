"use client";

import { deleteSourceAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function DeleteSourceForm({ sourceId }: { sourceId: string }) {
  const { execute, isPending, result } = useAction(deleteSourceAction);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <button
        type="submit"
        className="text-red-500 hover:text-red-600 cursor-pointer"
        disabled={isPending}
      >
        Delete
      </button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
