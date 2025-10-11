"use client";

import { useRef, useState } from "react";
import ExtractRecipeModalContent from "./ExtractRecipeModalContent";

export default function ExtractRecipeModal({ sourceId }: { sourceId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [hasOpened, setHasOpened] = useState(false);

  const handleButtonClick = () => {
    dialogRef.current?.showModal();
    setHasOpened(true);
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={handleButtonClick}>
        Extract recipe
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Extract recipe</h3>
          {hasOpened && (
            <ExtractRecipeModalContent
              sourceId={sourceId}
              onClose={handleClose}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
