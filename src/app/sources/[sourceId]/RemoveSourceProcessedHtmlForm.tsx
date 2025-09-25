"use client";

import { removeSourceProcessedHtmlAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function RemoveSourceProcessedHtmlForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const { execute, isPending, result } = useAction(
    removeSourceProcessedHtmlAction,
  );

  return (
    <form action={execute}>
      <input type="hidden" name="sourceId" value={sourceId} />

      <button
        type="submit"
        className="text-red-500 hover:text-red-600 cursor-pointer"
        disabled={isPending}
      >
        Remove
      </button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
