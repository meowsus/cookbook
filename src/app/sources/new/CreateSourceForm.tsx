"use client";

import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { createSourceAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function CreateSourceForm() {
  const { execute, input, isPending, result } = useAction(createSourceAction);

  return (
    <form action={execute} className="space-y-2">
      <div className="flex flex-col gap-2">
        <Input
          name="url"
          type="url"
          placeholder="https://example.com"
          defaultValue={((input as FormData)?.get("url") as string) ?? ""}
          required
        />

        {result?.validationErrors && (
          <p className="text-red-500">
            {result.validationErrors.url?._errors?.join(", ")}
          </p>
        )}

        <Button type="submit" disabled={isPending}>
          Add
        </Button>
      </div>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
