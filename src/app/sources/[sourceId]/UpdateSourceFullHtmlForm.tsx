"use client";

import fetcher from "@/lib/fetcher";
import useSWRImmutable from "swr/immutable";
import { updateSourceFullHtmlAction } from "@/lib/actions/sources";
import { useAction } from "next-safe-action/hooks";
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
  const { execute, isPending, result } = useAction(updateSourceFullHtmlAction);

  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiError<GetParamsType>
  >(`/api/sources/${sourceId}/html`, fetcher);

  if (isLoading) {
    return (
      <textarea disabled value="Fetching source HTML..." className="textarea" />
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

      <div className="space-y-1">
        <textarea
          rows={10}
          name="fullHtml"
          value={data?.html}
          defaultValue={data?.html}
          className="textarea"
          readOnly
          required
        />
      </div>

      {result?.validationErrors && (
        <p className="text-red-500">
          {result.validationErrors?.fullHtml?._errors?.join(", ")}
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
