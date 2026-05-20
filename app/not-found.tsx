import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden min-h-[70vh] flex items-center bg-[#09090b]">
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-md mx-auto">
          <div className="text-7xl sm:text-8xl font-extrabold gradient-text mb-4">404</div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Page not found
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors shadow-lg shadow-[#7c3aed]/20 active:scale-95"
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
