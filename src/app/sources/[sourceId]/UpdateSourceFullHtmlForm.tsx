"use client";

import Button from "@/components/elements/Button";
import fetcher from "@/lib/fetcher";

import Textarea from "@/components/elements/Textarea";
import useSWRImmutable from "swr/immutable";
import { useActionState } from "react";
import { updateSourceFullHtmlAction } from "@/lib/actions/sources";
import { ApiErrorResponse } from "@/types";
import { GetResponseData } from "@/app/api/sources/[sourceId]/html/route";

export default function UpdateSourceFullHtmlForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const [state, formAction, pending] = useActionState(
    updateSourceFullHtmlAction,
    undefined,
  );

  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiErrorResponse
  >(`/api/sources/${sourceId}/html`, fetcher);

  if (isLoading) {
    return <Textarea disabled value="Fetching source HTML..." />;
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

      <Textarea rows={10} name="fullHtml" value={data?.html} readOnly />

      <div className="space-x-2">
        <Button type="submit" disabled={pending}>
          Looks good!
        </Button>
        <Button type="reset" onClick={() => mutate()}>
          Fetch again?
        </Button>
      </div>

      {state?.properties?.fullHtml?.errors && (
        <ul className="list-disc list-inside text-red-500">
          {state.properties.fullHtml.errors.map((error) => (
            <li key={error} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
