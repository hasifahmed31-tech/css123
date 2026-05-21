'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Laptop, Menu, Moon, Search, Sparkles, Sun, X } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, mode, setMode } = useTheme();
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setThemeOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        mobileRef.current &&
        !mobileRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
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

  useEffect(() => {
    if (!themeOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setThemeOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setThemeOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [themeOpen]);

  const themeChoices = [
    { mode: 'light' as const, label: 'Light', icon: Sun },
    { mode: 'dark' as const, label: 'Dark', icon: Moon },
    { mode: 'system' as const, label: 'System', icon: Laptop },
  ];

  const renderThemeIcon = () => {
    if (!mounted) return <span className="h-5 w-5" aria-hidden="true" />;

    return (
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Sun className="h-5 w-5" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -45, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Moon className="h-5 w-5" />
          </motion.span>
        )}
      </AnimatePresence>
    );
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-gray-200/70 bg-white/90 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-gray-950/90'
          : 'border-transparent bg-white/82 backdrop-blur-xl dark:bg-gray-950/78'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-[72px] min-h-[72px] items-center justify-between gap-4 py-3 lg:h-[84px] lg:min-h-[84px]">
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <Logo className="h-11 sm:h-12 lg:h-14" />

            <nav aria-label="Primary navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-gray-200/80 bg-white/76 p-1 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/[0.06] lg:flex">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    prefetch
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-[#6d28d9] dark:text-[#c4b5fd]'
                        : 'text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    <span className="absolute inset-0 rounded-full bg-gray-950/[0.04] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white/[0.07]" />
                    {isActive && (
                      <motion.span
                        layoutId="headerActiveNav"
                        className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#4f46e5]"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/blog"
              prefetch
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:border-[#7c3aed]/35 hover:text-[#7c3aed] hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-300 dark:hover:text-[#c4b5fd] sm:inline-flex"
              aria-label="Search articles"
            >
              <Search className="h-5 w-5" />
            </Link>

            <div ref={themeRef} className="relative">
              <button
                type="button"
                onClick={() => setThemeOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-600 shadow-sm transition hover:-translate-y-0.5 hover:border-[#7c3aed]/35 hover:text-[#7c3aed] hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-300 dark:hover:text-[#c4b5fd]"
                aria-label="Choose color theme"
                aria-expanded={themeOpen}
                aria-haspopup="menu"
              >
                {renderThemeIcon()}
              </button>

              <AnimatePresence>
                {themeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    role="menu"
                    className="absolute right-0 top-[calc(100%+0.75rem)] w-44 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 p-1.5 shadow-2xl shadow-gray-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-gray-950/95"
                  >
                    {themeChoices.map(({ mode: choiceMode, label, icon: Icon }) => (
                      <button
                        key={choiceMode}
                        type="button"
                        role="menuitemradio"
                        aria-checked={mode === choiceMode}
                        onClick={() => {
                          setMode(choiceMode);
                          setThemeOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                          mode === choiceMode
                            ? 'bg-[#7c3aed]/10 text-[#6d28d9] dark:bg-[#7c3aed]/20 dark:text-[#c4b5fd]'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {label}
                        </span>
                        {mode === choiceMode && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              prefetch
              className="button-premium hidden min-h-11 gap-2 bg-gray-950 px-5 py-3 text-sm text-white shadow-lg shadow-gray-950/10 hover:bg-[#6d28d9] dark:bg-white dark:text-gray-950 dark:hover:bg-[#c4b5fd] md:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              Work with us
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200/80 bg-white/80 text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#7c3aed]/35 hover:text-[#7c3aed] hover:shadow-md dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-200 lg:hidden"
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
            className="border-t border-gray-200/70 bg-white/95 shadow-2xl shadow-gray-950/5 backdrop-blur-2xl dark:border-white/10 dark:bg-gray-950/95 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="container-custom py-3">
              <div className="grid gap-1.5">
                {navLinks.map((link, index) => {
                  const isActive =
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                  return (
                    <motion.div
                      key={`${link.href}-${link.label}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035 }}
                    >
                      <Link
                        href={link.href}
                        prefetch
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-[#7c3aed]/10 text-[#6d28d9] dark:bg-[#7c3aed]/20 dark:text-[#c4b5fd]'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        {link.label}
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#7c3aed]' : 'bg-transparent'}`} />
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
