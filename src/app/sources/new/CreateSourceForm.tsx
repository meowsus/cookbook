"use client";

import { createSourceAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";

export default function CreateSourceForm() {
  const { execute, input, isPending, result } = useAction(createSourceAction);

  return (
    <form action={execute} className="space-y-2">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-sm border p-4">
        <legend className="fieldset-legend">New source</legend>

        <label className="input w-full">
          URL
          <input
            type="url"
            name="url"
            placeholder="https://example.com"
            defaultValue={((input as FormData)?.get("url") as string) ?? ""}
            className="grow"
            required
          />
          <span className="badge badge-soft badge-error badge-xs">
            Required
          </span>
        </label>

        <button
          className="btn btn-primary mt-4"
          type="submit"
          disabled={isPending}
        >
          Save
        </button>
      </fieldset>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
