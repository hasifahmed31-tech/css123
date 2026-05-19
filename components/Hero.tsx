'use client';

import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, BookOpen, ChartSpline, Search, Sparkles } from 'lucide-react';

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
    <section className="relative isolate flex min-h-[86vh] items-center overflow-hidden bg-white pt-[88px] dark:bg-gray-950">
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(124,58,237,0.12),transparent_34%),linear-gradient(240deg,rgba(79,70,229,0.12),transparent_38%),linear-gradient(to_bottom,transparent,rgba(124,58,237,0.06))]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.42] dark:opacity-[0.22] bg-[linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:44px_44px]"
        aria-hidden="true"
      />

      <div className="container-custom relative w-full py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6d28d9] shadow-sm backdrop-blur dark:bg-white/[0.06] dark:text-[#c4b5fd]"
          >
            <Sparkles className="h-4 w-4" />
            Trusted by creators worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-7 text-balance text-4xl font-black tracking-tight text-gray-950 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find the{' '}
            <span className="relative inline-grid min-w-[8.9ch] overflow-hidden align-bottom">
              <motion.span
                key={wordIndex}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="gradient-text"
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
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg"
          >
            Premium insights on SaaS, AI tools, SEO, and marketing systems for founders and creators who want cleaner decisions and faster execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/blog"
              prefetch
              className="button-premium group min-h-[52px] w-full bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#4f46e5] px-7 py-4 text-white shadow-xl shadow-[#7c3aed]/25 hover:shadow-2xl hover:shadow-[#7c3aed]/35 sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Reading
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              prefetch
              className="button-premium min-h-[52px] w-full border border-gray-200 bg-white/90 px-7 py-4 text-gray-800 shadow-sm backdrop-blur hover:border-[#7c3aed]/30 hover:text-[#6d28d9] hover:shadow-lg dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-100 dark:hover:text-[#c4b5fd] sm:w-auto"
            >
              Learn More
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex min-h-[56px] items-center justify-center gap-2 rounded-2xl border border-gray-200/80 bg-white/80 px-3 py-3 text-sm font-semibold text-gray-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#7c3aed]/30 hover:text-[#6d28d9] dark:border-white/10 dark:bg-white/[0.05] dark:text-gray-300 dark:hover:text-[#c4b5fd]"
              >
                <Icon className="h-4 w-4 shrink-0" />
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
