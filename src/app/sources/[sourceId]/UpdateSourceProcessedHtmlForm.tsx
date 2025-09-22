"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateSourceProcessedHtmlAction } from "@/lib/actions/sources";
import { UpdateSourceProcessedHtmlSchema } from "@/lib/actions/sources.schema";
import { processRecipeHtml } from "@/lib/utils";
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
import { useEffect } from "react";

const MAX_LENGTH = 10000;

export default function UpdateSourceProcessedHtmlForm({
  sourceId,
  value,
}: {
  sourceId: string;
  value: string;
}) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    updateSourceProcessedHtmlAction,
    zodResolver(UpdateSourceProcessedHtmlSchema),
    {
      actionProps: {
        onSuccess: (data) => {
          toast.success("Processed HTML updated successfully");
        },
        onError: ({ error: { serverError } }) => {
          toast.error(`${serverError?.error ?? "Unknown error"}`);
        },
      },
      formProps: {
        defaultValues: {
          sourceId,
          processedHtml: processRecipeHtml(value),
        },
      },
    },
  );

  const processedHtml = form.watch("processedHtml");
  const isTooLong = processedHtml.length > MAX_LENGTH;

  // Update form when value prop changes
  useEffect(() => {
    const newProcessedHtml = processRecipeHtml(value);
    if (form.getValues("processedHtml") !== newProcessedHtml) {
      form.setValue("processedHtml", newProcessedHtml);
    }
  }, [value, form]);

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
          name="processedHtml"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  rows={10}
                  {...field}
                  onChange={(event) => {
                    const processed = processRecipeHtml(event.target.value);
                    field.onChange(processed);
                  }}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isTooLong && (
          <div className="text-yellow-500">
            Warning: Sending too much data to the server can negatively impact the
            results. Right now, the server can only handle up to {MAX_LENGTH}{" "}
            characters. You can shorten the HTML by deleting some of the content
            and removing non-recipe content.
          </div>
        )}

        <div className="space-x-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Looks good!
          </Button>
        </div>
      </form>
    </Form>
  );
}
