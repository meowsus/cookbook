"use client";

import fetcher from "@/lib/fetcher";
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
    return <textarea disabled value="Fetching source HTML..." className="textarea" />;
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

        <button className="btn btn-secondary" onClick={() => mutate()}>Try again</button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <div className="space-y-1">
        <textarea
          rows={10}
          name="fullHtml"
          value={data?.html}
          defaultValue={state?.fields?.fullHtml as string}
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
