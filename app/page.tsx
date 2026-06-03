import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import LatestPosts from '@/components/LatestPosts';
import Newsletter from '@/components/Newsletter';
import FeaturedInsights from '@/components/FeaturedInsights';
import { blogPosts, getFeaturedPosts } from '@/lib/blog-data';
import { getEditablePage } from '@/lib/sanity';
import type { Metadata } from 'next';

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getEditablePage('home');
  return {
    title: page?.metaTitle || page?.title || 'Hasif - Smart Tools, Reviews & Growth Strategies',
    description: page?.metaDescription || page?.description || 'Premium SaaS reviews, AI tool guides, SEO strategies, affiliate marketing tips, and online business playbooks for creators and founders.',
    keywords: page?.keywords || undefined,
    openGraph: page?.ogImage ? { images: [{ url: page.ogImage, width: 1200, height: 675, alt: page.title || 'Hasif' }] } : undefined,
  };
}

export default async function HomePage() {
  const page = await getEditablePage('home');
  const latest = blogPosts.slice(0, 6);
  const featured = getFeaturedPosts();

  return (
    <>
      <Hero eyebrow={page?.eyebrow} title={page?.title} description={page?.description} />
      <WhyChooseUs />
      {page?.bodyHtml && (
        <section className="defer-section bg-white py-14 dark:bg-gray-950 sm:py-20">
          <div className="container-custom">
            <div className="blog-content mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
          </div>
        </section>
      )}
      <FeaturedInsights posts={featured} />
      <LatestPosts posts={latest} />
      <Newsletter />
    </>
  );
}
