import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import LatestPosts from '@/components/LatestPosts';
import Newsletter from '@/components/Newsletter';
import { blogPosts } from '@/lib/blog-data';

export default function HomePage() {
  const latest = blogPosts.slice(0, 6);

  return (
    <>
      <Hero />
      <WhyChooseUs />
      <LatestPosts posts={latest} />
      <Newsletter />
    </>
  );
}
