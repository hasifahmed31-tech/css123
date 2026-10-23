import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import FeaturedInsights from '@/components/FeaturedInsights';
import LatestPosts from '@/components/LatestPosts';
import GrowthGuideFinder from '@/components/GrowthGuideFinder';
import { getHomepagePosts } from '@/lib/enterprise-blog';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Hasif - Smart Tools, Reviews & Growth Strategies',
  description: 'Premium SaaS reviews, AI tool guides, SEO strategies, affiliate marketing tips, and online business playbooks for creators and founders.',
};

export default async function HomePage() {
  const posts = await getHomepagePosts();

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FeaturedInsights posts={posts.filter((post) => post.featured).slice(0, 4)} />
      <LatestPosts posts={posts.slice(0, 6)} />
      <GrowthGuideFinder />
    </>
  );
}
