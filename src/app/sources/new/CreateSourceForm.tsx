"use client";

import { createSourceAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function CreateSourceForm() {
  const { execute, input, isPending, result } = useAction(createSourceAction);

  return (
    <form action={execute} className="space-y-2">
      <div className="flex gap-2">
        <input
          name="url"
          type="url"
          placeholder="https://example.com"
          defaultValue={((input as FormData)?.get("url") as string) ?? ""}
          className="input"
          required
        />

        <button className="btn btn-primary" type="submit" disabled={isPending}>
          Add
        </button>
      </div>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
