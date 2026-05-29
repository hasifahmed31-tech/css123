import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import LatestPosts from '@/components/LatestPosts';
import Newsletter from '@/components/Newsletter';
import FeaturedInsights from '@/components/FeaturedInsights';
import CmsPosts from '@/components/CmsPosts';
import CmsPageSections from '@/components/CmsPageSections';
import { blogPosts, getFeaturedPosts } from '@/lib/blog-data';
import { getPageBySlug } from '@/lib/cms';

export const revalidate = 1800;

export default async function HomePage() {
  const latest = blogPosts.slice(0, 6);
  const featured = getFeaturedPosts();
  const cmsPage = await getPageBySlug('home');

  return (
    <>
      <CmsPageSections page={cmsPage} />
      <Hero />
      <WhyChooseUs />
      <FeaturedInsights posts={featured} />
      <LatestPosts posts={latest} />
      <CmsPosts />
      <Newsletter />
    </>
  );
}
