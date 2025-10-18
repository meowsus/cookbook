"use client";

import { removeSourceProcessedHtmlAction } from "@/lib/actions/sources";
import { BackspaceIcon } from "@heroicons/react/24/solid";
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
      <input type="hidden" name="processedHtml" value="" />

      <button
        type="submit"
        className="btn btn-ghost btn-sm btn-error"
        disabled={isPending}
        title="Remove processed HTML"
      >
        <BackspaceIcon className="size-4" />
      </button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
