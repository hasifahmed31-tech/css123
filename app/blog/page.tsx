import LiveBlogIndex from '@/components/LiveBlogIndex';
import { blogPosts } from '@/lib/blog-data';
import { staticToListPost } from '@/lib/blog-features';

const initialPosts = blogPosts
  .map(staticToListPost)
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

export default function BlogPage() {
  return <LiveBlogIndex initialPosts={initialPosts} />;
}
