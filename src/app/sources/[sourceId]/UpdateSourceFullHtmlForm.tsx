"use client";

import Button from "@/components/elements/Button";
import fetcher from "@/lib/fetcher";
import Textarea from "@/components/elements/Textarea";
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
    <form action={execute} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />

      <div className="space-y-1">
        <Textarea
          rows={10}
          name="fullHtml"
          value={data?.html}
          readOnly
          required
        />
      </div>

      <div className="space-x-2">
        <Button type="submit" disabled={isPending}>
          Looks good!
        </Button>
        <Button type="reset" onClick={() => mutate()}>
          Fetch again?
        </Button>
      </div>

      {result?.validationErrors && (
        <div className="text-red-500">
          {Object.entries(result.validationErrors).map(([key, value]) => (
            <p key={key}>
              {key}: {value?._errors?.join(", ")}
            </p>
          ))}
        </div>
      )}

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
