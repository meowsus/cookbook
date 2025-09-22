"use client";

import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";
import { Textarea } from "@/components/ui/textarea";
import useSWRImmutable from "swr/immutable";
import { updateSourceFullHtmlAction } from "@/lib/actions/sources";
import { UpdateSourceFullHtmlSchema } from "@/lib/actions/sources.schema";
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
  const { data, error, isLoading, mutate } = useSWRImmutable<
    GetResponseData,
    ApiError<GetParamsType>
  >(`/api/sources/${sourceId}/html`, fetcher);

  const { form, handleSubmitWithAction } = useHookFormAction(
    updateSourceFullHtmlAction,
    zodResolver(UpdateSourceFullHtmlSchema),
    {
      actionProps: {
        onSuccess: (data) => {
          toast.success("Source HTML updated successfully");
        },
        onError: ({ error: { serverError } }) => {
          toast.error(`${serverError?.error ?? "Unknown error"}`);
        },
      },
      formProps: {
        defaultValues: {
          sourceId,
          fullHtml: data?.html || "",
        },
      },
    },
  );

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

  // Update form values when data changes
  if (data?.html && form.getValues("fullHtml") !== data.html) {
    form.setValue("fullHtml", data.html);
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
          name="fullHtml"
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
