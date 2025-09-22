"use client";

import { Button } from "@/components/ui/button";
import { removeSourceExtractedRecipeAction } from "@/lib/actions/sources";
import { RemoveExtractedRecipeSchema } from "@/lib/actions/sources.schema";
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

export default function RemoveSourceExtractedRecipeForm({
  sourceId,
}: {
  sourceId: string;
}) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    removeSourceExtractedRecipeAction,
    zodResolver(RemoveExtractedRecipeSchema),
    {
      actionProps: {
        onSuccess: (data) => {
          toast.success("Extracted recipe removed successfully");
        },
        onError: ({ error: { serverError } }) => {
          toast.error(`${serverError?.error ?? "Unknown error"}`);
        },
      },
      formProps: {
        defaultValues: {
          sourceId,
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
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

        <Button type="submit" variant="destructive" disabled={form.formState.isSubmitting}>
          Remove
        </Button>
      </form>
    </Form>
  );
}
