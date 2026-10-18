import { cache, Suspense } from 'react';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import LatestPosts from '@/components/LatestPosts';
import GrowthGuideFinder from '@/components/GrowthGuideFinder';
import FeaturedInsights from '@/components/FeaturedInsights';
import { getHomepagePosts } from '@/lib/enterprise-blog';
import { getEditablePage } from '@/lib/sanity';
import { blogPosts } from '@/lib/blog-data';
import { staticToListPost } from '@/lib/blog-features';
import type { Metadata } from 'next';

export const revalidate = 60;

const getHomePageData = cache(() => getEditablePage('home'));
const getHomepagePostData = cache(() => getHomepagePosts());
const fallbackPosts = blogPosts.map(staticToListPost).slice(0, 6);

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePageData();
  return {
    title: page?.metaTitle || page?.title || 'Hasif - Smart Tools, Reviews & Growth Strategies',
    description: page?.metaDescription || page?.description || 'Premium SaaS reviews, AI tool guides, SEO strategies, affiliate marketing tips, and online business playbooks for creators and founders.',
    keywords: page?.keywords || undefined,
    openGraph: page?.ogImage ? { images: [{ url: page.ogImage, width: 1200, height: 675, alt: page.title || 'Hasif' }] } : undefined,
  };
}

export default function HomePage() {
  return (
    <>
      {/* Stream the default hero (including its high-priority local image) while Sanity responds. */}
      <Suspense fallback={<Hero />}>
        <EditableHomeHero />
      </Suspense>
      <WhyChooseUs />
      <Suspense fallback={null}>
        <HomeEditorialExtras />
      </Suspense>
      <Suspense fallback={<LatestPosts posts={fallbackPosts} />}>
        <HomepageLatestPosts />
      </Suspense>
      <GrowthGuideFinder />
    </>
  );
}

async function EditableHomeHero() {
  const page = await getHomePageData();
  return <Hero eyebrow={page?.eyebrow} title={page?.title} description={page?.description} />;
}

async function HomeEditorialContent() {
  const [page, enterprisePosts] = await Promise.all([
    getHomePageData(),
    getHomepagePostData(),
  ]);
  const featured = enterprisePosts.filter((post) => post.featured).slice(0, 4);

  return (
    <>
      {page?.bodyHtml && (
        <section className="defer-section bg-white py-14 dark:bg-gray-950 sm:py-20">
          <div className="container-custom">
            <div className="blog-content mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
          </div>
        </section>
      )}
      <FeaturedInsights posts={featured} />
    </>
  );
}

async function HomepageLatestPosts() {
  const posts = await getHomepagePostData();
  // Keep the journal visible when Sanity is unreachable, and supplement a
  // partially populated CMS with the curated local articles. Sanity remains
  // first so its newest published work leads the homepage whenever available.
  const seen = new Set(posts.map((post) => post.slug));
  const visiblePosts = [
    ...posts,
    ...fallbackPosts.filter((post) => !seen.has(post.slug)),
  ].slice(0, 6);
  return <LatestPosts posts={visiblePosts} />;
}

async function HomeEditorialExtras() {
  return HomeEditorialContent();
}
