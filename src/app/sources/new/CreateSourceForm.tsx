"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSourceAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function CreateSourceForm() {
  const [state, formAction, pending] = useActionState(createSourceAction, null);

  return (
    <form action={formAction} className="space-y-2">
      <div className="flex gap-2">
        <Input
          name="url"
          type="url"
          placeholder="https://example.com"
          defaultValue={state?.fields?.url as string}
          required
        />

        <Button type="submit" disabled={pending}>
          Add
        </Button>
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
