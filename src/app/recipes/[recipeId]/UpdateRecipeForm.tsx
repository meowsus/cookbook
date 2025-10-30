"use client";

import { updateRecipeAction } from "@/lib/actions/recipes";
import { useAction } from "next-safe-action/hooks";

export default function UpdateRecipeForm({
  recipeId,
  name,
  content,
}: {
  recipeId: string;
  name: string;
  content: string;
}) {
  const { execute, input, isPending, result } = useAction(updateRecipeAction);

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="recipeId" value={recipeId} />

      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          className="input w-full"
          placeholder="Recipe name"
          defaultValue={((input as FormData)?.get("name") as string) ?? name}
          autoFocus
          required
        />

        {result?.validationErrors && (
          <div className="label">
            <ul className="list-disc list-inside text-red-500">
              {result.validationErrors?.name?._errors?.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <label className="label">Content</label>
        <textarea
          name="content"
          className="textarea w-full h-64"
          placeholder="Recipe content"
          required
          defaultValue={
            ((input as FormData)?.get("content") as string) ?? content
          }
        />

        {result?.validationErrors && (
          <div className="label">
            <ul className="list-disc list-inside text-red-500">
              {result.validationErrors?.content?._errors?.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </fieldset>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}

      <div className="flex gap-2 justify-end">
        <button type="reset" className="btn btn-ghost">
          Reset
        </button>

        <button type="submit" className="btn btn-primary" disabled={isPending}>
          Save
        </button>
      </div>
    </form>
  );
}
