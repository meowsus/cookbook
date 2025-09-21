"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSourceAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function CreateSourceForm() {
  const { execute, result, isPending } = useAction(createSourceAction);

  return (
    <form action={execute} className="space-y-2">
      <div className="flex flex-col gap-2">
        <Input
          name="url"
          type="url"
          placeholder="https://example.com"
          required
        />

        {result?.validationErrors?.url && (
          <p className="text-red-500">
            Validation error: {result.validationErrors.url._errors?.join(", ")}
          </p>
        )}

        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </div>

      {result?.serverError && (
        <p className="text-red-500">Server error: {result.serverError.error}</p>
      )}
    </form>
  );
}
