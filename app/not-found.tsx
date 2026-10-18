import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="editorial-hero flex min-h-[72vh] items-center py-20 pt-28 sm:pt-36">
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-5 text-7xl font-semibold tracking-[-0.08em] gradient-text sm:text-8xl">404</div>
          <h1 className="mb-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Page not found
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-white/65 sm:text-base">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="button-premium gap-2 rounded-full bg-[#7955e8] px-6 py-3 text-sm text-white shadow-lg shadow-violet-950/30 transition hover:bg-[#6844d0]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
