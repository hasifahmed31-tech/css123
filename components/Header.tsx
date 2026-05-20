'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/[0.06] bg-[#09090b]/80 shadow-[0_18px_55px_rgba(0,0,0,0.3)] backdrop-blur-2xl'
          : 'border-transparent bg-[#09090b]/60 backdrop-blur-xl'
      }`}
    >
      <div className="container-custom">
        <div className="relative flex h-[72px] min-h-[72px] items-center justify-between gap-4 py-3 lg:h-[88px] lg:min-h-[88px]">
          <div className="flex shrink-0 items-center">
            <Logo className="h-12 sm:h-14 lg:h-16" />
          </div>

          <nav aria-label="Primary navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#c4b5fd]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="absolute inset-0 rounded-full bg-white/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
                  {isActive && (
                    <motion.span
                      layoutId="headerActiveNav"
                      className="absolute inset-x-3 bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a78bfa] to-[#6366f1]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-gray-300 transition hover:-translate-y-0.5 hover:border-[#a78bfa]/30 hover:text-white hover:shadow-md lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.16 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-white/[0.06] bg-[#09090b]/95 shadow-2xl backdrop-blur-2xl lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="container-custom py-4">
              <div className="grid gap-1.5">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035 }}
                    >
                      <Link
                        href={link.href}
                        prefetch
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium transition ${
                          isActive
                            ? 'bg-[#7c3aed]/10 text-[#c4b5fd]'
                            : 'text-gray-300 hover:bg-white/[0.04]'
                        }`}
                      >
                        {link.label}
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#a78bfa]' : 'bg-transparent'}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
