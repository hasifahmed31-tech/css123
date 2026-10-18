'use client';

import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
          <div className="text-center">
            <div className="eyebrow mb-5">HASIF · ERROR</div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-950 dark:text-white sm:text-3xl">
              Something went wrong
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              An unexpected error occurred. Please try again.
            </p>
            <button
              onClick={reset}
              className="button-premium cursor-pointer gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm text-white dark:bg-white dark:text-gray-950"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
