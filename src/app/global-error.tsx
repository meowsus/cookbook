"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <div className="container mx-auto p-4 space-y-4">
          <h2>Something went wrong!</h2>
          <pre>{error.message}</pre>
          <button className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
