"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="text-white flex flex-col items-center">
        <h2>Algo deu errado!</h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Tente novamente
        </button>
      </div>
    </section>
  );
}
