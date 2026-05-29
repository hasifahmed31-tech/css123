'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { Check, Copy, Mail } from 'lucide-react';

const platforms = [
  {
    label: 'LinkedIn',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: 'border-[#0A66C2]/20 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white dark:border-[#60a5fa]/20 dark:bg-[#0A66C2]/20 dark:text-[#93c5fd]',
    buildUrl: (url: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  },
  {
    label: 'Gmail',
    icon: <Mail className="h-3.5 w-3.5" />,
    color: 'border-rose-500/20 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white dark:border-rose-300/20 dark:bg-rose-500/15 dark:text-rose-200',
    buildUrl: (url: string) => `mailto:?subject=${encodeURIComponent('Hasif guide')}&body=${encodeURIComponent(url)}`,
  },
];

export default function ShareButtons() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentUrl = useMemo(() => {
    if (!mounted || typeof window === 'undefined') {
      return '';
    }
    return window.location.href;
  }, [mounted, pathname]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-400 dark:text-gray-500">Share:</span>
      {platforms.map((p) => (
        <a
          key={p.label}
          href={currentUrl ? p.buildUrl(currentUrl) : '#'}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label={`Share on ${p.label}`}
          className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-bold shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md ${p.color}`}
        >
          {p.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          if (!currentUrl) return;
          await navigator.clipboard.writeText(currentUrl);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1800);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-medium text-gray-500 transition-colors duration-150 hover:bg-[#7c3aed] hover:text-white dark:bg-gray-800 dark:text-gray-400"
        aria-label="Copy article link"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
