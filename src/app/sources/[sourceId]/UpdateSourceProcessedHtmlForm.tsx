"use client";

import { updateSourceProcessedHtmlAction } from "@/lib/actions/sources";
import { processRecipeHtml } from "@/lib/helpers/html";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";

const MAX_LENGTH = 10000;

export default function UpdateSourceProcessedHtmlForm({
  sourceId,
  value,
}: {
  sourceId: string;
  value: string;
}) {
  const [processedHtml, setProcessedHtml] = useState(processRecipeHtml(value));
  const { execute, input, isPending, result } = useAction(
    updateSourceProcessedHtmlAction,
  );

  const isTooLong = processedHtml.length > MAX_LENGTH;

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <div className="space-y-1">
        <textarea
          rows={10}
          name="processedHtml"
          value={processedHtml}
          defaultValue={
            ((input as FormData)?.get("processedHtml") as string) ?? ""
          }
          onChange={(event) => {
            setProcessedHtml(processRecipeHtml(event.target.value));
          }}
          required
        />
      </div>

      {result?.validationErrors && (
        <p className="text-red-500">
          {result.validationErrors?.processedHtml?._errors?.join(", ")}
        </p>
      )}

      {isTooLong && (
        <div className="text-yellow-500">
          Warning: Sending too much data to the server can negatively impact the
          results. Right now, the server can only handle up to {MAX_LENGTH}{" "}
          characters. You can shorten the HTML by deleting some of the content
          and removing non-recipe content.
        </div>
      )}

      <div className="space-x-2">
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          Looks good!
        </button>
      </div>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
