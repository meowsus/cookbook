"use client";

import Button from "@/components/elements/Button";
import Textarea from "@/components/elements/Textarea";
import { processRecipeHtml } from "@/lib/helpers/html";
import { useState } from "react";

const MAX_LENGTH = 10000;

export default function ProcessedSourceHtmlForm({
  sourceId,
  value,
  formAction,
}: {
  sourceId: string;
  value: string;
  formAction: (formData: FormData) => Promise<void> | void;
}) {
  const [processedHtml, setProcessedHtml] = useState(processRecipeHtml(value));

  const isTooLong = processedHtml.length > MAX_LENGTH;

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <Textarea
        rows={10}
        name="processedHtml"
        value={processedHtml}
        onChange={(event) => {
          setProcessedHtml(processRecipeHtml(event.target.value));
        }}
      />

      {isTooLong && (
        <div className="text-yellow-500">
          Warning: Sending too much data to the server can negatively impact the
          results. Right now, the server can only handle up to {MAX_LENGTH}{" "}
          characters. You can shorten the HTML by deleting some of the content
          and removing non-recipe content.
        </div>
      )}

      <div className="space-x-2">
        <Button type="submit">Looks good!</Button>
      </div>
    </form>
  );
}
