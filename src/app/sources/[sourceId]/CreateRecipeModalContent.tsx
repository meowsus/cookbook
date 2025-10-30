"use client";

import { createRecipeAction } from "@/lib/actions/recipes";
import useSourceCreateRecipeAPI from "@/lib/hooks/useSourceCreateRecipeAPI";
import { useAction } from "next-safe-action/hooks";

interface CreateRecipeModalContentProps {
  sourceId: string;
  onClose: () => void;
}

export default function CreateRecipeModalContent({
  sourceId,
  onClose,
}: CreateRecipeModalContentProps) {
  const { execute, isPending } = useAction(createRecipeAction);

  const { data, error, isLoading } = useSourceCreateRecipeAPI(sourceId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 py-4">
        <div className="flex justify-center">
          <span className="loading loading-ring loading-lg" />
        </div>

        <p className="text-center">
          This is probably going to take a minute...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div className="flex flex-col gap-2 py-4">
          <code className="block text-red-500 py-2">{error.message}</code>
          <p className="text-center">Please close this modal and try again.</p>
        </div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <div className="flex flex-col gap-2 py-4">
          <code className="block text-red-500 py-2">No data</code>
          <p className="text-center">Please close this modal and try again.</p>
        </div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="py-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Extracted recipe</legend>

          <label className="label">Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Recipe name"
            readOnly
            value={data.name}
          />

          <label className="label">Content</label>
          <textarea
            className="textarea w-full h-64"
            placeholder="Recipe content"
            readOnly
            value={data.content}
          />
        </fieldset>
      </div>
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>

        <form action={execute}>
          <input type="hidden" name="sourceId" value={sourceId} />

          <input type="hidden" name="name" value={data.name} />
          <input type="hidden" name="content" value={data.content} />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            Looks good!
          </button>
        </form>
      </div>
    </>
  );
}
