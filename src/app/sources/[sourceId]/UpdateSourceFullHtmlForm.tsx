"use client";

import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";
import { Textarea } from "@/components/ui/textarea";
import useSWRImmutable from "swr/immutable";
import { useActionState } from "react";
import { updateSourceFullHtmlAction } from "@/lib/actions/sources";
import { ApiError } from "@/types";
import {
  GetParamsType,
  GetResponseData,
} from "@/app/api/sources/[sourceId]/html/route";

export default function UpdateSourceFullHtmlForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const [state, formAction, pending] = useActionState(
    updateSourceFullHtmlAction,
    null,
  );

  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiError<GetParamsType>
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

      <div className="space-y-1">
        <Textarea
          rows={10}
          name="fullHtml"
          value={data?.html}
          defaultValue={state?.fields?.fullHtml as string}
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
