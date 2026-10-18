import Link from 'next/link';
import type { SVGProps } from 'react';
import { ArrowUpRight, Mail, ShieldCheck, Sparkles, Timer, WandSparkles } from 'lucide-react';
import Logo from './Logo';
import type { SiteSettings } from '@/lib/sanity';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/services', label: 'Services' },
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

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();
  const email = settings?.email || 'info@hasif.online';
  const linkedin = settings?.linkedin || 'https://www.linkedin.com/in/hasifonline';
  const editableQuickLinks = settings?.navLinks?.length ? settings.navLinks : quickLinks;
  const editableResources = settings?.footerLinks?.length ? settings.footerLinks : resources;
  const footerNote = settings?.footerNote || 'Independent guides for smarter tools, stronger SEO, and sustainable online growth.';

  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(135deg,#100d18_0%,#171220_56%,#211735_100%)] text-gray-400">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8b7ff] to-transparent opacity-80" />
      <div className="footer-liquid" aria-hidden="true" />

      <div className="container-custom relative py-10 sm:py-12">
        <div className="mb-9 grid gap-3 rounded-3xl border border-[#c8b7ff]/15 bg-gradient-to-r from-[#7955e8]/[0.10] via-white/[0.035] to-[#7955e8]/[0.08] p-3 shadow-[0_18px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:grid-cols-3 sm:p-4">
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/[0.045] bg-[#100d18]/45 px-3 py-3.5 sm:px-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c8b7ff]/15 bg-[#7955e8]/20 text-[#d8caff] shadow-inner shadow-[#c8b7ff]/[0.08]">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold tracking-wide text-white/90">{label}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_auto] lg:items-start">
          <div className="max-w-md">
            <Logo className="h-12" priority={false} />
            <p className="mt-4 text-sm leading-6 text-gray-400">
              {settings?.description || 'Clear SaaS, AI, SEO, and marketing guides for creators who want faster decisions and cleaner growth systems.'}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Hasif on LinkedIn"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c8b7ff]/20 bg-[#7955e8]/15 text-[#d8caff] shadow-[0_10px_28px_rgba(91,53,184,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8b7ff]/45 hover:bg-[#7955e8]/30 hover:text-white hover:shadow-[0_15px_36px_rgba(91,53,184,0.25)]"
              >
                <LinkedinIcon className="h-[18px] w-[18px] transition group-hover:scale-110" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Email Hasif on Gmail"
                className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c8b7ff]/20 bg-[#7955e8]/15 text-[#d8caff] shadow-[0_10px_28px_rgba(91,53,184,0.14)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8b7ff]/45 hover:bg-[#7955e8]/30 hover:text-white hover:shadow-[0_15px_36px_rgba(91,53,184,0.25)]"
              >
                <Mail className="h-[18px] w-[18px] transition group-hover:scale-110" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8b7ff]/75">Explore</h2>
              <ul className="mt-4 space-y-2.5">
                {editableQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} prefetch className="group relative inline-flex py-0.5 text-sm transition-colors duration-200 hover:text-[#e3d9ff]">
                      {link.label}
                      <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[#a88af5] transition-transform duration-200 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c8b7ff]/75">Legal</h2>
              <ul className="mt-4 space-y-2.5">
                {editableResources.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} prefetch className="group relative inline-flex py-0.5 text-sm transition-colors duration-200 hover:text-[#e3d9ff]">
                      {link.label}
                      <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-[#a88af5] transition-transform duration-200 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/blog"
            prefetch
            className="button-premium group w-full gap-2 border border-[#c8b7ff]/20 bg-gradient-to-r from-[#6542bd] to-[#7955e8] px-5 py-3 text-sm text-white shadow-[0_12px_30px_rgba(91,53,184,0.25)] hover:-translate-y-0.5 hover:from-[#7955e8] hover:to-[#8d6ef0] hover:shadow-[0_16px_36px_rgba(91,53,184,0.35)] sm:w-fit"
          >
            <Sparkles className="h-4 w-4" />
            Latest guides
            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Hasif. All rights reserved.</p>
          <p>{footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
