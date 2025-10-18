"use client";

import useSourceHtmlExtractRecipeAPI from "@/lib/hooks/useSourceHtmlExtractRecipeAPI";
import { useAction } from "next-safe-action/hooks";
import { updateSourceExtractedRecipeAction } from "@/lib/actions/sources";

interface FetchFullHtmlModalContentProps {
  sourceId: string;
  onClose: () => void;
}

export default function ExtractRecipeModalContent({
  sourceId,
  onClose,
}: FetchFullHtmlModalContentProps) {
  const { execute, isPending } = useAction(updateSourceExtractedRecipeAction);

  const { data, error, isLoading } = useSourceHtmlExtractRecipeAPI(sourceId);

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
        <textarea className="textarea w-full h-64" value={data.text} readOnly />
      </div>
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>

        <form action={execute}>
          <input type="hidden" name="sourceId" value={sourceId} />
          <input type="hidden" name="extractedRecipe" value={data.text} />

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
