import type { Metadata, Viewport } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import SiteChrome from '@/components/SiteChrome';
import { siteUrl } from '@/lib/site';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { color: '#191326' },
  ],
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Hasif - Smart Tools, Reviews & Growth Strategies',
    template: '%s | Hasif',
  },
  description:
    'Premium SaaS reviews, AI tool guides, SEO strategies, affiliate marketing tips, and online business playbooks for creators and founders.',
  keywords: [
    'SaaS reviews',
    'AI tools',
    'SEO tools',
    'affiliate marketing',
    'email marketing automation',
    'blogging strategy',
    'online business tools',
    'digital marketing guides',
  ],
  authors: [{ name: 'Hasif', url: siteUrl.toString() }],
  creator: 'Hasif',
  publisher: 'Hasif',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hasif - Smart Tools, Reviews & Growth Strategies',
    description:
      'Premium SaaS reviews, AI tool guides, SEO strategies, affiliate marketing tips, and online business playbooks.',
    url: '/',
    siteName: 'Hasif',
    type: 'website',
    images: [
      {
        url: '/site-icon.png',
        width: 800,
        height: 600,
        alt: 'Hasif - Smart Tools, Reviews & Growth Strategies',
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/site-icon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon-96.png',
    apple: '/site-icon.png',
  },
};

const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Hasif',
      url: siteUrl.toString(),
      logo: new URL('/hasif-logo-cropped.png', siteUrl).toString(),
    },
    {
      '@type': 'WebSite',
      name: 'Hasif',
      url: siteUrl.toString(),
      publisher: { '@type': 'Organization', name: 'Hasif' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-96.png" type="image/png" sizes="96x96" />
        <link rel="icon" href="/site-icon.png" type="image/png" sizes="512x512" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, '\\u003c') }} />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script defer data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme || theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#111019] text-gray-100 antialiased">
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
