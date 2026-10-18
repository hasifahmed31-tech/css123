'use client';

import { useEffect } from 'react';
import { RotateCw, Sparkles } from 'lucide-react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="editorial-hero relative flex min-h-[72vh] items-center overflow-hidden py-20 pt-28 sm:pt-36">
      <div className="container-custom relative z-10 text-center">
        <div className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-10 shadow-2xl shadow-black/10 backdrop-blur-sm sm:px-10 sm:py-12">
          <div className="eyebrow mb-5 gap-2"><Sparkles className="h-3.5 w-3.5" /> HASIF · ERROR</div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Something went wrong
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-white/65 sm:text-base">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="button-premium motion-sheen cursor-pointer gap-2 rounded-full bg-[#7955e8] px-6 py-3 text-sm text-white shadow-lg shadow-violet-950/30 hover:bg-[#6844d0]"
          >
            <RotateCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}
