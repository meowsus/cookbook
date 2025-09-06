"use client";

import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { createSourceAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function CreateSourceForm() {
  const [state, formAction, pending] = useActionState(
    createSourceAction,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-2">
      <div className="flex gap-2">
        <Input name="url" type="text" placeholder="https://example.com" />

        <Button type="submit" disabled={pending}>
          Add
        </Button>
      </div>

      {state?.fieldErrors?.url && (
        <ul className="list-disc list-inside text-red-500">
          {state.fieldErrors.url.map((error) => (
            <li key={error} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
      )}

      {state?.formErrors && (
        <ul className="list-disc list-inside text-red-500">
          {state.formErrors.map((error) => (
            <li key={error} className="text-red-500">
              {error}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
