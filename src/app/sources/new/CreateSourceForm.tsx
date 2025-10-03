"use client";

import { createSourceAction } from "@/lib/actions/sources";
import { useActionState } from "react";

export default function CreateSourceForm() {
  const [state, formAction, pending] = useActionState(createSourceAction, null);

  return (
    <form action={formAction} className="space-y-2">
      <div className="flex gap-2">
        <input
          name="url"
          type="url"
          placeholder="https://example.com"
          defaultValue={state?.fields?.url as string}
          className="input"
          required
        />

        <button className="btn btn-primary" type="submit" disabled={pending}>
          Add
        </button>
      </div>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
