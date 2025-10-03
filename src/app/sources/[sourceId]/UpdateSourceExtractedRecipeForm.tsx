"use client";

import fetcher from "@/lib/fetcher";

import useSWRImmutable from "swr/immutable";
import { updateSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";
import {
  GetParamsType,
  GetResponseData,
} from "@/app/api/sources/[sourceId]/html/extract-recipe/route";
import { ApiError } from "@/types";

export default function UpdateSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const { execute, input, isPending, result } = useAction(
    updateSourceExtractedRecipeAction,
  );

  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiError<GetParamsType>
  >(`/api/sources/${sourceId}/html/extract-recipe`, fetcher);

  if (isLoading) {
    return (
      <textarea
        disabled
        value="Generating recipe data..."
        className="textarea"
      />
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <textarea
          disabled
          value={`Error: ${error.message}`}
          className="textarea"
        />

        {error.validation && (
          <ul className="text-red-500">
            {Object.entries(error.validation.fieldErrors).map(
              ([key, value]) => (
                <li key={key}>
                  {key}: {value.join(", ")}
                </li>
              ),
            )}
          </ul>
        )}

        <button className="btn btn-secondary" onClick={() => mutate()}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <div className="flex flex-col gap-2">
        <textarea
          rows={10}
          name="extractedRecipe"
          value={data?.text}
          defaultValue={
            ((input as FormData)?.get("extractedRecipe") as string) ?? ""
          }
          className="textarea"
          readOnly
          required
        />
      </div>

      {result?.validationErrors && (
        <p className="text-red-500">
          {result.validationErrors?.extractedRecipe?._errors?.join(", ")}
        </p>
      )}

      <div className="space-x-2">
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          Looks good!
        </button>
        <button
          className="btn btn-secondary"
          type="reset"
          onClick={() => mutate()}
        >
          Fetch again?
        </button>
      </div>

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
