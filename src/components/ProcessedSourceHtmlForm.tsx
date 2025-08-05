"use client";

import Button from "@/components/elements/Button";
import Textarea from "@/components/elements/Textarea";
import { processRecipeHtml } from "@/lib/helpers/html";

export default function ProcessedSourceHtmlForm({
  sourceId,
  value,
  formAction,
}: {
  sourceId: string;
  value: string;
  formAction: (formData: FormData) => Promise<void> | void;
}) {
  const processedHtml = processRecipeHtml(value);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />
      <Textarea rows={10} name="processedHtml" value={processedHtml} />

      <div className="space-x-2">
        <Button type="submit">Looks good!</Button>
      </div>
    </form>
  );
}
