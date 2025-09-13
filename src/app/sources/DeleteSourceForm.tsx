"use client";

import { Button } from "@/components/ui/button";
import { deleteSourceAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function DeleteSourceForm({ sourceId }: { sourceId: string }) {
  const [state, formAction, pending] = useActionState(deleteSourceAction, null);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <Button type="submit" variant="destructive" disabled={pending}>
        Delete
      </Button>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
