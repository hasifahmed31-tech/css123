'use client';

import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, BookOpen, ChartSpline, Search, Sparkles, Zap } from 'lucide-react';

const words = ['Best Tools', 'Right Strategy', 'Perfect Stack', 'Winning Edge'];

const trustItems = [
  { icon: Search, label: 'Honest Reviews' },
  { icon: BookOpen, label: 'Free Guides' },
  { icon: Bot, label: 'AI Tutorials' },
  { icon: ChartSpline, label: 'Growth Tips' },
];

function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden bg-[#09090b] pt-[88px]">
      {/* Animated gradient orbs */}
      <div className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.15),transparent_70%)] animate-orb-1" aria-hidden="true" />
      <div className="absolute right-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_70%)] animate-orb-2" aria-hidden="true" />
      <div className="absolute left-[50%] top-[60%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08),transparent_70%)] animate-orb-1" aria-hidden="true" />

      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-60" aria-hidden="true" />

      {/* Top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#09090b] to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent" aria-hidden="true" />

      <div className="container-custom relative w-full py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/15 bg-white/[0.04] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#c4b5fd] backdrop-blur-sm animate-border-glow"
          >
            <Zap className="h-3.5 w-3.5 text-[#a78bfa]" />
            Trusted Tech &amp; AI Resources
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-8 text-balance text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find the{' '}
            <span className="relative inline-grid min-w-[8.9ch] overflow-hidden align-bottom">
              <motion.span
                key={wordIndex}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="gradient-text-hero animate-gradient-text"
              >
                {words[wordIndex]}
              </motion.span>
            </span>
            <br className="hidden sm:block" /> to build and scale online
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg"
          >
            Premium insights on SaaS, AI tools, SEO, and marketing systems for founders and creators who want cleaner decisions and faster execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/blog"
              prefetch
              className="button-premium shimmer-border group min-h-[52px] w-full bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#6366f1] px-8 py-4 text-white shadow-xl shadow-[#7c3aed]/20 hover:shadow-2xl hover:shadow-[#7c3aed]/30 sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Explore Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              prefetch
              className="button-premium min-h-[52px] w-full border border-white/[0.1] bg-white/[0.04] px-8 py-4 text-gray-200 backdrop-blur hover:border-[#a78bfa]/25 hover:bg-white/[0.06] hover:text-white sm:w-auto"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm font-medium text-gray-400 backdrop-blur transition hover:-translate-y-0.5 hover:border-[#a78bfa]/20 hover:text-[#c4b5fd]"
              >
                <Icon className="h-4 w-4 shrink-0 text-[#a78bfa]" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
