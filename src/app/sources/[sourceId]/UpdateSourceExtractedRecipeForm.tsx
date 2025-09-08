"use client";

import Button from "@/components/elements/Button";
import fetcher from "@/lib/fetcher";

import Textarea from "@/components/elements/Textarea";
import useSWRImmutable from "swr/immutable";
import { useActionState } from "react";
import { updateSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { GetResponseData } from "@/app/api/sources/[sourceId]/html/extract-recipe/route";
import { ApiErrorResponse } from "@/types";

export default function UpdateSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const [state, formAction, pending] = useActionState(
    updateSourceExtractedRecipeAction,
    undefined,
  );

  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiErrorResponse
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
            {Object.entries(error.validation).map(([key, value]) => (
              <li key={key}>
                {key}: {value.join(", ")}
              </li>
            ))}
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
          readOnly
          required
        />

        {state?.fieldErrors?.extractedRecipe && (
          <ul className="list-disc list-inside text-red-500">
            {state.fieldErrors.extractedRecipe.map((error) => (
              <li key={error} className="text-red-500">
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-x-2">
        <Button type="submit" disabled={pending}>
          Looks good!
        </Button>
        <Button type="reset" onClick={() => mutate()}>
          Fetch again?
        </Button>
      </div>

      {state?.formErrors && (
        <ul className="list-disc list-inside text-red-500">
          {state.formErrors.map((error) => (
            <li key={error} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
