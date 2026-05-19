import Link from 'next/link';
import type { SVGProps } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import Logo from './Logo';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const resources = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hasifonline', icon: LinkedinIcon },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch
              className="group inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
              <span className="h-px w-0 bg-[#a78bfa] transition-all duration-300 group-hover:w-4" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gray-950 text-gray-400">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(124,58,237,0.22),transparent_34%),radial-gradient(circle_at_85%_15%,rgba(79,70,229,0.18),transparent_28%)]" />

      <div className="container-custom relative py-14 sm:py-16 lg:py-[72px]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Logo className="h-14" />
            <p className="mt-5 text-sm leading-7 text-gray-400">
              Clear reviews and practical guides for creators and founders.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition hover:-translate-y-1 hover:border-[#a78bfa]/50 hover:bg-[#7c3aed] hover:text-white hover:shadow-lg hover:shadow-[#7c3aed]/25"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />

          <FooterColumn title="Legal" links={resources} />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Contact</h2>
            <div className="mt-5 space-y-4 text-sm">
              <a
                href="mailto:info@hasif.online"
                className="group flex items-center gap-3 text-gray-400 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#c4b5fd] transition group-hover:bg-[#7c3aed] group-hover:text-white">
                  <Mail className="h-4 w-4" />
                </span>
                info@hasif.online
              </a>
              <a
                href="https://www.linkedin.com/in/hasifonline"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-gray-400 transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#c4b5fd] transition group-hover:bg-[#7c3aed] group-hover:text-white">
                  <LinkedinIcon className="h-4 w-4" />
                </span>
                LinkedIn
              </a>
              <p className="flex items-center gap-3 text-gray-500">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[#c4b5fd]">
                  <MapPin className="h-4 w-4" />
                </span>
                Serving creators worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-500">&copy; {year} Hasif. All rights reserved.</p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#a78bfa]/50 hover:bg-white/[0.08]"
          >
            Work with Hasif
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
