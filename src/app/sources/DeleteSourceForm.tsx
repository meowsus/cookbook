"use client";

import { Button } from "@/components/ui/button";
import { deleteSourceAction } from "@/lib/actions/sources";
import { DeleteSourceSchema } from "@/lib/actions/sources.schema";
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

export default function DeleteSourceForm({ sourceId }: { sourceId: string }) {
  const { form, handleSubmitWithAction } = useHookFormAction(
    deleteSourceAction,
    zodResolver(DeleteSourceSchema),
    {
      actionProps: {
        onSuccess: (data) => {
          toast.success("Source deleted successfully");
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

        <Button
          type="submit"
          variant="destructive"
          disabled={form.formState.isSubmitting}
        >
          Delete
        </Button>
      </form>
    </Form>
  );
}
