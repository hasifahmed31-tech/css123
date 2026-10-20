'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, Laptop, Menu, Moon, Search, Sparkles, Sun, X } from 'lucide-react';
import Logo from './Logo';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface HeaderProps {
  navLinks?: Array<{ href: string; label: string }>;
}

export default function Header({ navLinks: editableNavLinks = navLinks }: HeaderProps) {
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
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const next = window.scrollY > 8;
        setScrolled((current) => (current === next ? current : next));
        ticking = false;
      });
    };
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

    return theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />;
  };

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'border-gray-200/70 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md dark:border-white/10 dark:bg-gray-950/90'
          : 'border-transparent bg-white/90 backdrop-blur-md dark:bg-gray-950/90'
      }`}
    >
      <div className="container-custom">
        <div className="flex h-[76px] min-h-[76px] items-center justify-between gap-2.5 py-2 sm:gap-3 lg:h-[80px] lg:min-h-[80px]">
          <div className="flex min-w-0 flex-1 items-center gap-5">
            <Logo className="h-10 sm:h-11 lg:h-12" />

            <nav aria-label="Primary navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0 rounded-full border border-[#7955e8]/15 bg-white/90 p-1 shadow-[0_8px_30px_rgba(55,35,105,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-gray-900/90 lg:flex xl:gap-1">
              {editableNavLinks.map((link) => {
                const isActive =
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    prefetch
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-semibold transition-colors duration-200 xl:px-4 xl:text-sm ${
                      isActive
                        ? 'bg-[#7955e8]/[0.09] text-[#5b35b8] dark:bg-[#7955e8]/20 dark:text-[#e3d9ff]'
                        : 'text-gray-600 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    <span className="absolute inset-0 rounded-full bg-[#7955e8]/[0.07] opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white/[0.07]" />
                    {isActive && (
                      <span className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#5b35b8] via-[#7955e8] to-[#c8b7ff]" />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              prefetch
              className="hidden min-h-10 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#5b35b8] to-[#7955e8] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(91,53,184,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(91,53,184,0.3)] xl:inline-flex"
            >
              <Sparkles className="h-4 w-4" />
              Let&apos;s talk
            </Link>

            <div className="inline-flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/65 p-1 shadow-sm shadow-gray-950/[0.04] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none">
            <Link
              href="/search"
              prefetch
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-[#7955e8]/10 hover:text-[#5b35b8] dark:text-gray-300 dark:hover:bg-white/[0.08] dark:hover:text-[#e3d9ff] sm:h-10 sm:w-10"
              aria-label="Search articles"
            >
              <Search className="h-5 w-5" />
            </Link>

            <div ref={themeRef} className="relative">
              <button
                type="button"
                onClick={() => setThemeOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-[#7955e8]/10 hover:text-[#5b35b8] dark:text-gray-300 dark:hover:bg-white/[0.08] dark:hover:text-[#e3d9ff] sm:h-10 sm:w-10"
                aria-label="Choose color theme"
                aria-expanded={themeOpen}
                aria-haspopup="menu"
              >
                {renderThemeIcon()}
              </button>

              {themeOpen && (
                  <div
                    role="menu"
                    className="animate-pop-in absolute right-0 top-[calc(100%+0.65rem)] w-44 overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-1.5 shadow-xl shadow-gray-950/10 backdrop-blur-md dark:border-white/10 dark:bg-gray-950"
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
                            ? 'bg-[#7955e8]/10 text-[#5b35b8] dark:bg-[#7955e8]/20 dark:text-[#e3d9ff]'
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
                  </div>
                )}
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-[#7955e8]/10 hover:text-[#5b35b8] dark:text-gray-200 dark:hover:bg-white/[0.08] dark:hover:text-[#e3d9ff] sm:h-10 sm:w-10 lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
          <div
            id="mobile-menu"
            ref={mobileRef}
            className="animate-drop-in border-t border-gray-200/70 bg-white shadow-xl shadow-gray-950/5 backdrop-blur-md dark:border-white/10 dark:bg-gray-950 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="container-custom py-3">
              <div className="grid gap-1.5">
                {editableNavLinks.map((link) => {
                  const isActive =
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                  return (
                      <Link
                        key={`${link.href}-${link.label}`}
                        href={link.href}
                        prefetch
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          isActive
                            ? 'bg-[#7955e8]/10 text-[#5b35b8] dark:bg-[#7955e8]/20 dark:text-[#e3d9ff]'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/[0.06]'
                        }`}
                      >
                        {link.label}
                        <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#7955e8]' : 'bg-transparent'}`} />
                      </Link>
                  );
                })}
                <Link
                  href="/contact"
                  prefetch
                  className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-gray-950/10 hover:bg-[#5b35b8] dark:bg-white dark:text-gray-950 dark:hover:bg-[#e3d9ff]"
                >
                  <Sparkles className="h-4 w-4" />
                  Work with us
                </Link>
              </div>
            </nav>
          </div>
        )}
    </header>
  );
}
