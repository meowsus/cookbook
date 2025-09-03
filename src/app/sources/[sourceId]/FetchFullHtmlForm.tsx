"use client";

import Button from "@/components/elements/Button";
import fetcher from "@/lib/fetcher";

import Textarea from "@/components/elements/Textarea";
import useSWRImmutable from "swr/immutable";
import { treeifyError } from "zod";

export default function FetchSourceHtmlForm({
  sourceId,
  formAction,
}: {
  sourceId: string;
  formAction: (formData: FormData) => Promise<void> | void;
}) {
  const { data, error, isLoading, mutate } = useSWRImmutable<
    { fullHtml: string },
    | { message: string }
    | { validation: ReturnType<typeof treeifyError<{ sourceId: string }>> }
  >(`/api/sources/${sourceId}/html`, fetcher);

  if (isLoading) {
    return <Textarea disabled value="Fetching source HTML..." />;
  }

  const errorMessage =
    error && "validation" in error
      ? error.validation.errors.join(", ") // TODO: This may be blank?
      : error?.message;

  if (error) {
    return (
      <div className="space-y-2">
        <Textarea disabled value={`Error: ${errorMessage}`} />
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
