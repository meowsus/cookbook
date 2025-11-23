"use client";

import UpdateRecipeDialogContent from "@/app/recipes/[recipeId]/UpdateRecipeDialogContent";

interface UpdateRecipeDialogProps {
  recipeId: string;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  hasOpened: boolean;
}

export default function UpdateRecipeDialog({
  recipeId,
  dialogRef,
  hasOpened,
}: UpdateRecipeDialogProps) {
  const handleClose = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Recipe</h3>
        {hasOpened && (
          <UpdateRecipeDialogContent
            recipeId={recipeId}
            onClose={handleClose}
          />
        )}
      </div>
    </dialog>
  );
}
