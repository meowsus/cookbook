"use client";

import UpdateRecipeDialog from "@/app/recipes/[recipeId]/UpdateRecipeDialog";
import { useRef, useState } from "react";

export default function UpdateRecipeForm({ recipeId }: { recipeId: string }) {
  const [hasOpened, setHasOpened] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dialogRef.current?.showModal();
    setHasOpened(true);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-2">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <fieldset className="fieldset border-none rounded-box border">
              <label className="label">Prompt</label>
              <textarea
                name="prompt"
                className="textarea w-full h-64"
                placeholder="How would you like to modify this recipe?"
                required
                defaultValue=""
              />
            </fieldset>

            <div className="flex gap-2 justify-end">
              <button type="reset" className="btn btn-ghost">
                Reset
              </button>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      <UpdateRecipeDialog
        recipeId={recipeId}
        dialogRef={dialogRef}
        hasOpened={hasOpened}
      />
    </>
  );
}
