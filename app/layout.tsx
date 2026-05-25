import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hasif.online'),
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
  authors: [{ name: 'Hasif', url: 'https://hasif.online' }],
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
    icon: '/site-icon.png',
    shortcut: '/site-icon.png',
    apple: '/site-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/site-icon.png" type="image/png" sizes="any" />
        <link rel="preload" as="image" href="/hasif-logo-cropped.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || ((!theme || theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
