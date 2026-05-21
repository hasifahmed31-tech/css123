'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';

const platforms = [
  {
    label: 'LinkedIn',
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: 'hover:bg-[#0A66C2] hover:text-white',
    buildUrl: (url: string) => `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
  },
  {
    label: 'Gmail',
    icon: (
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0-9.75 6.5-9.75-6.5" />
      </svg>
    ),
    color: 'hover:bg-[#7c3aed] hover:text-white',
    buildUrl: (url: string) => `mailto:?subject=${encodeURIComponent('Hasif guide')}&body=${encodeURIComponent(url)}`,
  },
];

export default function ShareButtons() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

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
          className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xs font-medium text-gray-500 transition-colors duration-150 dark:bg-gray-800 dark:text-gray-400 ${p.color}`}
        >
          {p.icon}
        </a>
      ))}
    </div>
  );
}
