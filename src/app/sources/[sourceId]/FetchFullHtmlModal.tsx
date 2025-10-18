"use client";

import { useRef, useState } from "react";
import FetchFullHtmlModalContent from "./FetchFullHtmlModalContent";

export default function FetchFullHtmlModal({ sourceId }: { sourceId: string }) {
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
        Fetch full HTML
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Fetch full HTML</h3>
          {hasOpened && (
            <FetchFullHtmlModalContent
              sourceId={sourceId}
              onClose={handleClose}
            />
          )}
        </div>
      </dialog>
    </>
  );
}
