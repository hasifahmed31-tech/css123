'use client';

import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden min-h-[70vh] flex items-center bg-[#09090b]">
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Something went wrong
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors shadow-lg shadow-[#7c3aed]/20 active:scale-95 cursor-pointer"
          >
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
