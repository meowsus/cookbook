"use client";

import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";
import { Textarea } from "@/components/ui/textarea";
import useSWRImmutable from "swr/immutable";
import { updateSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { UpdateExtractedRecipeSchema } from "@/lib/actions/sources.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  GetParamsType,
  GetResponseData,
} from "@/app/api/sources/[sourceId]/html/extract-recipe/route";
import { ApiError } from "@/types";

export default function UpdateSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiError<GetParamsType>
  >(`/api/sources/${sourceId}/html/extract-recipe`, fetcher);

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateSourceExtractedRecipeAction,
    zodResolver(UpdateExtractedRecipeSchema),
    {
      actionProps: {
        onSuccess: (data) => {
          toast.success("Extracted recipe updated successfully");
        },
        onError: ({ error: { serverError } }) => {
          toast.error(`${serverError?.error ?? "Unknown error"}`);
        },
      },
      formProps: {
        defaultValues: {
          sourceId,
          extractedRecipe: data?.text || "",
        },
      },
    },
  );

  if (isLoading) {
    return <Textarea disabled value="Generating recipe data..." />;
  }

  if (error) {
    return (
      <div className="space-y-2">
        <Textarea disabled defaultValue={`Error: ${error.message}`} />

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

  // Update form values when data changes
  if (data?.text && form.getValues("extractedRecipe") !== data.text) {
    form.setValue("extractedRecipe", data.text);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-2">
        <FormField
          control={form.control}
          name="sourceId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input type="hidden" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="extractedRecipe"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={10} {...field} readOnly required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-x-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Looks good!
          </Button>
          <Button type="button" onClick={() => mutate()}>
            Fetch again?
          </Button>
        </div>
      </form>
    </Form>
  );
}
