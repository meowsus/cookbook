"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSourceAction } from "@/lib/actions/sources";
import { CreateSourceSchema } from "@/lib/actions/sources.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export default function CreateSourceForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    createSourceAction,
    zodResolver(CreateSourceSchema),
    {
      actionProps: {
        onSuccess: (data) => {
          toast.success("Source created successfully");
        },
        onError: ({ error: { serverError } }) => {
          toast.error(
            `Action failed: ${serverError?.error ?? "Unknown error"}`,
          );
        },
      },
      formProps: {
        defaultValues: {
          url: "",
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-2">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/recipe" {...field} />
              </FormControl>
              <FormDescription>
                The URL of the recipe to add to the cookbook.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Add
        </Button>

        {/* {action.result?.serverError && (
          <div className="text-red-500 text-sm">
            Error:{" "}
            {typeof action.result.serverError === "string"
              ? action.result.serverError
              : action.result.serverError.error}
          </div>
        )} */}
      </form>
    </Form>
  );
}
