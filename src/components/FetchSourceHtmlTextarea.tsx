"use client";

import Button from "@/components/elements/Button";
import fetcher from "@/lib/fetcher";

import Textarea from "@/components/elements/Textarea";
import useSWRImmutable from "swr/immutable";

export default function FetchSourceHtmlTextarea({
  sourceId,
}: {
  sourceId: string;
}) {
  const { data, error, isLoading, mutate } = useSWRImmutable(
    `/api/sources/${sourceId}/html`,
    fetcher,
  );

  if (isLoading) {
    return <Textarea disabled value="Fetching source HTML..." />;
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Textarea disabled value={`Error: ${error.message}`} />
        <Button onClick={() => mutate()}>Try again</Button>
      </div>
    );
  }

  return <Textarea disabled value={data?.html} />;
}
