import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read 2026 SaaS reviews, AI tools comparisons, SEO checklists, affiliate marketing guides, email automation playbooks, and blogging strategies.',
  keywords: [
    '2026 SaaS reviews',
    'AI tools comparison',
    'SEO checklist',
    'affiliate marketing guide',
    'email automation',
    'blogging tips',
    'digital marketing tools',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Hasif Blog - SaaS, AI, SEO and Marketing Guides',
    description:
      'Actionable 2026 reviews and guides for creators, marketers, founders, and online business builders.',
    url: '/blog',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
