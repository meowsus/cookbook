"use client";

import {
  createRecipeAction,
  suggestRecipeNameAction,
} from "@/lib/actions/recipes";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

interface CreateRecipeModalContentProps {
  sourceId: string;
  extractedRecipe: string;
  onClose: () => void;
}

export default function CreateRecipeModalContent({
  sourceId,
  extractedRecipe,
  onClose,
}: CreateRecipeModalContentProps) {
  const { execute: createRecipe, isPending: isCreating } =
    useAction(createRecipeAction);
  const { execute: suggestName, isPending: isSuggesting } = useAction(
    suggestRecipeNameAction,
    {
      onSuccess: (result) => {
        setName(result.data);
      },
    },
  );

  const [name, setName] = useState("");
  const [content, setContent] = useState(extractedRecipe);

  useEffect(() => {
    suggestName({ extractedRecipe });
  }, [suggestName, extractedRecipe]);

  return (
    <>
      <div className="py-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Final Review</legend>

          <label className="label">Name</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="input w-full"
              placeholder="Recipe name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
            {isSuggesting && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </div>

          <label className="label">Content</label>
          <textarea
            className="textarea w-full h-64"
            placeholder="Recipe content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </fieldset>
      </div>
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>

        <form action={createRecipe}>
          <input type="hidden" name="sourceId" value={sourceId} />

          <input type="hidden" name="name" value={name} />
          <input type="hidden" name="content" value={content} />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isCreating || !name.trim()}
          >
            Create Recipe
          </button>
        </form>
      </div>
    </>
  );
}
