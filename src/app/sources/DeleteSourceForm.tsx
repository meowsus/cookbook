"use client";

import { Button } from "@/components/ui/button";
import { deleteSourceAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function DeleteSourceForm({ sourceId }: { sourceId: string }) {
  const { execute, result, isPending } = useAction(deleteSourceAction);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <Button type="submit" variant="destructive" disabled={isPending}>
        Delete
      </Button>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
