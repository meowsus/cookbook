"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface AutoPruneTriggerProps {
  sourceId: string;
  fullHtml: string | null;
  processedHtml: string | null;
}

export default function AutoPruneTrigger({
  sourceId,
  fullHtml,
  processedHtml,
}: AutoPruneTriggerProps) {
  const router = useRouter();
  const [isPruning, setIsPruning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to prevent duplicate requests across re-renders and StrictMode remounts
  const requestInProgress = useRef(false);

  const startPruning = async () => {
    if (requestInProgress.current) return;

    requestInProgress.current = true;
    setIsPruning(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/sources/${sourceId}/html/prune-recipe`,
      );
      if (response.ok) {
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.message || "Pruning failed");
      }
    } catch (e) {
      console.error("Auto-pruning failed:", e);
      setError("An unexpected error occurred");
    } finally {
      setIsPruning(false);
      // We keep requestInProgress.current = true if it succeeded because
      // processedHtml will change and the component will unmount.
      // If it failed, we reset it so the Retry button can work.
      if (error) {
        requestInProgress.current = false;
      }
    }
  };

  useEffect(() => {
    // Trigger pruning if we have fullHtml but no processedHtml
    if (fullHtml && !processedHtml && !requestInProgress.current && !error) {
      startPruning();
    }
  }, [fullHtml, processedHtml, error, sourceId, router]);

  if (isPruning) {
    return (
      <div className="flex items-center gap-2 text-sm text-primary animate-pulse">
        <span className="loading loading-spinner loading-xs" />
        Agent is concentrating content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-error font-medium">Pruning failed: {error}</span>
        <button
          type="button"
          className="btn btn-xs btn-outline"
          onClick={() => {
            requestInProgress.current = false; // Reset ref to allow retry
            startPruning();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return null;
}
