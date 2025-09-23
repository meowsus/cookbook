"use client";

import fetcher from "@/lib/fetcher";

import useSWRImmutable from "swr/immutable";
import { useActionState } from "react";
import { updateSourceExtractedRecipeAction } from "@/lib/actions/sources";
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
  const [state, formAction, pending] = useActionState(
    updateSourceExtractedRecipeAction,
    null,
  );

  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiError<GetParamsType>
  >(`/api/sources/${sourceId}/html/extract-recipe`, fetcher);

  if (isLoading) {
    return <textarea disabled value="Generating recipe data..." className="textarea" />;
  }

  if (error) {
    return (
      <div className="space-y-2">
        <textarea disabled value={`Error: ${error.message}`} className="textarea" />

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
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <div className="flex flex-col gap-2">
        <textarea
          rows={10}
          name="extractedRecipe"
          value={data?.text}
          defaultValue={state?.fields?.extractedRecipe as string}
          className="textarea"
          readOnly
          required
        />
      </div>

      <div className="space-x-2">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          Looks good!
        </button>
        <button className="btn btn-secondary" type="reset" onClick={() => mutate()}>
          Fetch again?
        </button>
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
