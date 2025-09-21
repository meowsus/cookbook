"use client";

import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";
import { Textarea } from "@/components/ui/textarea";
import useSWRImmutable from "swr/immutable";
import { useAction } from "next-safe-action/hooks";
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
  const { execute, result, isPending } = useAction(updateSourceFullHtmlAction);

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

      {result?.serverError && (
        <p className="text-red-500">{result.serverError.error}</p>
      )}
    </form>
  );
}
