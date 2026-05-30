import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import LatestPosts from '@/components/LatestPosts';
import Newsletter from '@/components/Newsletter';
import FeaturedInsights from '@/components/FeaturedInsights';
import { blogPosts, getFeaturedPosts } from '@/lib/blog-data';

export const revalidate = 1800;

export default async function HomePage() {
  const latest = blogPosts.slice(0, 6);
  const featured = getFeaturedPosts();

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <FeaturedInsights posts={featured} />
      <LatestPosts posts={latest} />
      <Newsletter />
    </>
  );
}
