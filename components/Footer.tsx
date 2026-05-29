'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SVGProps } from 'react';
import { ArrowUpRight, Mail, ShieldCheck, Sparkles, Timer, WandSparkles } from 'lucide-react';
import Logo from './Logo';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const resources = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/affiliate-disclosure', label: 'Affiliate disclosure' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

const highlights = [
  { icon: Timer, label: 'Fast reviews' },
  { icon: ShieldCheck, label: 'Honest picks' },
  { icon: WandSparkles, label: 'Actionable guides' },
];

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [settings, setSettings] = useState<{
    footer_text?: string | null;
    contact_email?: string | null;
    social_links?: Record<string, string>;
    navbar_links?: Array<{ href: string; label: string }>;
  } | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data || null))
      .catch(() => {});
  }, []);

  const displayedQuickLinks = settings?.navbar_links?.length ? settings.navbar_links : quickLinks;
  const email = settings?.contact_email || 'info@hasif.online';
  const linkedin = settings?.social_links?.linkedin || 'https://www.linkedin.com/in/hasifonline';

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-gray-400">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />
      <div className="footer-liquid" aria-hidden="true" />

      <div className="container-custom relative py-10 sm:py-12">
        <div className="mb-8 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.045] p-4 shadow-[0_18px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:grid-cols-3 sm:p-5">
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl bg-gray-950/35 px-3 py-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7c3aed]/20 text-[#c4b5fd]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-bold text-white">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_auto] lg:items-start">
          <div className="max-w-md">
            <Logo className="h-12" />
            <p className="mt-4 text-sm leading-6 text-gray-400">
              {settings?.footer_text || 'Clear SaaS, AI, SEO, and marketing guides for creators who want faster decisions and cleaner growth systems.'}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#0A66C2]/30 bg-[#0A66C2]/15 text-[#93c5fd] shadow-[0_12px_32px_rgba(10,102,194,0.18)] transition duration-150 hover:-translate-y-0.5 hover:bg-[#0A66C2] hover:text-white hover:shadow-[0_16px_42px_rgba(10,102,194,0.34)]"
              >
                <LinkedinIcon className="h-[18px] w-[18px] transition group-hover:scale-110" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Gmail Hasif"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-300/30 bg-rose-500/15 text-rose-100 shadow-[0_12px_32px_rgba(225,29,72,0.16)] transition duration-150 hover:-translate-y-0.5 hover:bg-rose-600 hover:text-white hover:shadow-[0_16px_42px_rgba(225,29,72,0.32)]"
              >
                <Mail className="h-[18px] w-[18px] transition group-hover:scale-110" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Explore</h2>
              <ul className="mt-4 space-y-2.5">
                {displayedQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} prefetch className="text-sm transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">Legal</h2>
              <ul className="mt-4 space-y-2.5">
                {resources.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} prefetch className="text-sm transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/blog"
            prefetch
            className="button-premium group w-full gap-2 bg-white px-5 py-3 text-sm text-gray-950 hover:bg-[#c4b5fd] sm:w-fit"
          >
            <Sparkles className="h-4 w-4" />
            Latest guides
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Hasif. All rights reserved.</p>
          <p>Built for fast, thoughtful online growth.</p>
        </div>
      </div>
    </footer>
  );
}
