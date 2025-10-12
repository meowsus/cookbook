"use client";

import { useRef, useState } from "react";
import CreateRecipeModalContent from "./CreateRecipeModalContent";

interface CreateRecipeModalProps {
  sourceId: string;
  recipeContent: string;
}

export default function CreateRecipeModal({
  sourceId,
  recipeContent,
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
              recipeContent={recipeContent}
              onClose={handleClose}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
