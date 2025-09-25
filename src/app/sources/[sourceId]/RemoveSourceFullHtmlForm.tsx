"use client";

import { removeSourceFullHtmlAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function RemoveSourceFullHtmlForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const { execute, isPending, result } = useAction(removeSourceFullHtmlAction);

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

      {result?.validationErrors && (
        <div className="text-red-500">
          {Object.entries(result.validationErrors).map(([key, value]) => (
            <p key={key}>
              {key}: {value?._errors?.join(", ")}
            </p>
          ))}
        </div>
      )}

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
