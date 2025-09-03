"use client";

import Button from "@/components/elements/Button";
import fetcher from "@/lib/fetcher";

import Textarea from "@/components/elements/Textarea";
import useSWRImmutable from "swr/immutable";

export default function FetchSourceHtmlForm({
  sourceId,
  formAction,
}: {
  sourceId: string;
  formAction: (formData: FormData) => Promise<void> | void;
}) {
  const { data, error, isLoading, mutate } = useSWRImmutable<
    { fullHtml: string },
    { message: string }
  >(`/api/sources/${sourceId}/html`, fetcher);

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

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="sourceId" value={sourceId} />
      <Textarea rows={10} name="fullHtml" value={data?.fullHtml} readOnly />

      <div className="space-x-2">
        <Button type="submit">Looks good!</Button>
        <Button type="reset" onClick={() => mutate()}>
          Fetch again?
        </Button>
      </div>
    </form>
  );
}
