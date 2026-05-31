"use client";

import CreateRecipeModalContent from "@/app/sources/[sourceId]/CreateRecipeModalContent";
import { useRef, useState } from "react";

interface CreateRecipeModalProps {
  sourceId: string;
  extractedRecipe: string;
}

export default function CreateRecipeModal({
  sourceId,
  extractedRecipe,
}: CreateRecipeModalProps) {
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
        Create recipe
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create recipe</h3>
          {hasOpened && (
            <CreateRecipeModalContent
              sourceId={sourceId}
              extractedRecipe={extractedRecipe}
              onClose={handleClose}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
