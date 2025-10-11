"use client";

import useSourceHtmlAPI from "@/lib/hooks/useSourceHtmlAPI";
import { useAction } from "next-safe-action/hooks";
import { updateSourceFullHtmlAction } from "@/lib/actions/sources";

interface FetchFullHtmlModalContentProps {
  sourceId: string;
  onClose: () => void;
}

export default function FetchFullHtmlModalContent({
  sourceId,
  onClose,
}: FetchFullHtmlModalContentProps) {
  const { execute, isPending } = useAction(updateSourceFullHtmlAction);

  const { data, error, isLoading } = useSourceHtmlAPI(sourceId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <span className="loading loading-ring loading-lg" />
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
        <textarea className="textarea w-full h-64" value={data.html} readOnly />
      </div>
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>

        <form action={execute}>
          <input type="hidden" name="sourceId" value={sourceId} />
          <input type="hidden" name="fullHtml" value={data.html} />

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
