"use client";

import Button from "@/components/elements/Button";
import fetcher from "@/lib/fetcher";

import Textarea from "@/components/elements/Textarea";
import useSWRImmutable from "swr/immutable";
import { treeifyError } from "zod";

export default function FetchExtractedRecipeForm({
  sourceId,
  formAction,
}: {
  sourceId: string;
  formAction: (formData: FormData) => Promise<void> | void;
}) {
  const { data, error, isLoading, mutate } = useSWRImmutable<
    { text: string },
    | { message: string }
    | { validation: ReturnType<typeof treeifyError<{ sourceId: string }>> }
  >(`/api/sources/${sourceId}/html/extract-recipe`, fetcher);

  if (isLoading) {
    return <Textarea disabled value="Generating recipe data..." />;
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

      <Textarea rows={10} name="extractedRecipe" value={data?.text} readOnly />

      <div className="space-x-2">
        <Button type="submit">Looks good!</Button>
        <Button type="reset" onClick={() => mutate()}>
          Fetch again?
        </Button>
      </div>
    </form>
  );
}
