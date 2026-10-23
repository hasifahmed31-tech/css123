import Hero from '@/components/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import HomepageEditorial from '@/components/HomepageEditorial';
import GrowthGuideFinder from '@/components/GrowthGuideFinder';
import { blogPosts } from '@/lib/blog-data';
import { staticToListPost } from '@/lib/blog-features';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Hasif - Smart Tools, Reviews & Growth Strategies',
  description: 'Premium SaaS reviews, AI tool guides, SEO strategies, affiliate marketing tips, and online business playbooks for creators and founders.',
};

const firstArticles = blogPosts
  .map(staticToListPost)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 6);

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <HomepageEditorial initialPosts={firstArticles} />
      <GrowthGuideFinder />
    </>
  );
}
