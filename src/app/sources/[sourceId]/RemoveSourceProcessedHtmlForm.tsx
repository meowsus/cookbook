"use client";

import { Button } from "@/components/ui/button";
import { removeSourceProcessedHtmlAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function RemoveSourceProcessedHtmlForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const [state, formAction, pending] = useActionState(
    removeSourceProcessedHtmlAction,
    null,
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="sourceId" value={sourceId} />

      <Button type="submit" variant="destructive" disabled={pending}>
        Remove
      </Button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
