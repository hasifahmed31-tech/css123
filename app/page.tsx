import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import LatestPosts from '@/components/LatestPosts';
import { blogPosts } from '@/lib/blog-data';

const TrendingTools = dynamic(() => import('@/components/TrendingTools'), { ssr: true });
const CategoriesGrid = dynamic(() => import('@/components/CategoriesGrid'), { ssr: true });
const StatsSection = dynamic(() => import('@/components/StatsSection'), { ssr: true });
const Newsletter = dynamic(() => import('@/components/Newsletter'), { ssr: true });

export default function HomePage() {
  const latest = blogPosts.slice(0, 6);

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <LatestPosts posts={latest} />
      <TrendingTools />
      <CategoriesGrid />
      <StatsSection />
      <Newsletter />
    </>
  );
}
