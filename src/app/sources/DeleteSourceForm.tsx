"use client";

import { deleteSourceAction } from "@/lib/actions/sources";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useAction } from "next-safe-action/hooks";

export default function DeleteSourceForm({ sourceId }: { sourceId: string }) {
  const { execute, isPending, result } = useAction(deleteSourceAction);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <button
        type="submit"
        className="btn btn-square btn-ghost btn-error"
        disabled={isPending}
        title="Delete source"
      >
        <TrashIcon className="size-4" />
      </button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
