"use client";

import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";

import { Textarea } from "@/components/ui/textarea";
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
    return <Textarea disabled value="Generating recipe data..." />;
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Textarea disabled value={`Error: ${error.message}`} />

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

        <Button onClick={() => mutate()}>Try again</Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <div className="flex flex-col gap-2">
        <Textarea
          rows={10}
          name="extractedRecipe"
          value={data?.text}
          defaultValue={state?.fields?.extractedRecipe as string}
          readOnly
          required
        />
      </div>

      <div className="space-x-2">
        <Button type="submit" disabled={pending}>
          Looks good!
        </Button>
        <Button type="reset" onClick={() => mutate()}>
          Fetch again?
        </Button>
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
