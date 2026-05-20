import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090b',
};

export const metadata: Metadata = {
  title: {
    default: 'Hasif Online — Premium Tech, AI & Growth Resources',
    template: '%s | Hasif Online',
  },
  description:
    'Your trusted source for premium AI tools, SaaS reviews, web development guides, and growth strategies. Curated by Hasif for founders and creators.',
  keywords: ['AI tools', 'SaaS reviews', 'affiliate marketing', 'web development', 'SEO tools', 'productivity', 'tech reviews', 'Hasif Online'],
  authors: [{ name: 'Hasif', url: 'https://hasif.online' }],
  creator: 'Hasif',
  publisher: 'Hasif Online',
  openGraph: {
    title: 'Hasif Online — Premium Tech, AI & Growth Resources',
    description: 'Your trusted source for premium AI tools, SaaS reviews, web development guides, and growth strategies.',
    siteName: 'Hasif Online',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hasif Online — Premium Tech, AI & Growth Resources',
    description: 'Your trusted source for premium AI tools, SaaS reviews, web development guides, and growth strategies.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  metadataBase: new URL('https://hasif.online'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="preload" as="image" href="/hasif-logo-cropped.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Hasif Online',
              url: 'https://hasif.online',
              logo: 'https://hasif.online/hasif-logo-cropped.png',
              description: 'Premium tech, AI & growth resources for founders and creators.',
              sameAs: ['https://www.linkedin.com/in/hasifonline'],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col bg-[#09090b] text-gray-100 antialiased`}>
        <LoadingScreen />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
