"use client";

import { updateSourceProcessedHtmlAction } from "@/lib/actions/sources";
import { processRecipeHtml } from "@/lib/helpers/html";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";

interface ProcessHtmlModalProps {
  sourceId: string;
  fullHtml: string;
}

export default function ProcessHtmlModal({
  sourceId,
  fullHtml,
}: ProcessHtmlModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { execute, isPending, result } = useAction(
    updateSourceProcessedHtmlAction,
  );

  const handleButtonClick = () => {
    dialogRef.current?.showModal();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={handleButtonClick}>
        Process HTML
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box space-y-2">
          <h3 className="font-bold text-lg">Process HTML</h3>

          <p>
            Look through this reduced HTML code and delete everything before the
            recipe title and everything after where the comments start.
          </p>

          <form action={execute}>
            <input type="hidden" name="sourceId" value={sourceId} />

            <fieldset className="fieldset space-y-1">
              <textarea
                name="processedHtml"
                className="textarea w-full h-64"
                placeholder="Processed HTML"
                defaultValue={processRecipeHtml(fullHtml)}
                autoFocus
                required
              ></textarea>

              {result?.validationErrors && (
                <div className="label">
                  <ul className="list-disc list-inside text-red-500">
                    {result.validationErrors?.processedHtml?._errors?.map(
                      (error) => (
                        <li key={error}>{error}</li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </fieldset>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleClose}>
                Close
              </button>

              <button
                className="btn btn-primary"
                type="submit"
                disabled={isPending}
              >
                Looks good!
              </button>
            </div>

            {result?.serverError && (
              <p className="text-red-500">{result.serverError.error}</p>
            )}
          </form>
        </div>
      </dialog>
    </>
  );
}
