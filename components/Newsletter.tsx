'use client';

import { useState, useCallback } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

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
    <section className="relative overflow-hidden bg-[#09090b] py-20 sm:py-24">
      <div className="container-custom">
        <ScrollReveal direction="up" duration={0.35}>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12">
            {/* Background orbs */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.12),transparent_70%)]" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.1),transparent_70%)]" aria-hidden="true" />

            <div className="relative text-center">
              <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#a78bfa]/20 bg-gradient-to-br from-[#7c3aed]/20 to-[#6366f1]/20 animate-float">
                <Mail className="h-6 w-6 text-[#a78bfa]" />
              </div>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Stay Ahead of the Curve
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-gray-400">
                Get the latest articles, tools &amp; tips delivered to your inbox weekly. No spam, ever.
              </p>

              <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3.5 text-sm text-white placeholder-gray-500 backdrop-blur transition-colors duration-150 focus:border-[#a78bfa]/30 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20"
                />
                <button
                  type="submit"
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-150 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/30 ${
                    status === 'success'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-[#7c3aed] to-[#6366f1] text-white shadow-lg shadow-[#7c3aed]/20'
                  }`}
                >
                  {status === 'success' ? (
                    <>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-600">
                Join 10,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
