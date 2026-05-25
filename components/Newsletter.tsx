'use client';

import { useState, useCallback } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }, [email]);

  return (
    <section className="defer-section py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 px-6 py-10 text-center dark:from-indigo-900 dark:via-purple-900 dark:to-indigo-950">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 mb-5 backdrop-blur-sm border border-white/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Join Our Newsletter</h2>
            <p className="mt-3 text-indigo-100 text-base">
              Get the latest articles, tools & tips delivered to your inbox. No spam, ever.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-transparent focus:border-white/30 transition-colors duration-150"
              />
              <button
                type="submit"
                className={`px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                  status === 'success'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-indigo-700 hover:bg-indigo-50 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-500'
                }`}
              >
                {status === 'success' ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Subscribed!
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
            <p className="mt-4 text-sm text-indigo-100/80">
              Join 10,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
