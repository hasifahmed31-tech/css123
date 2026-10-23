import { getHomepagePosts } from '@/lib/enterprise-blog';

export const revalidate = 60;

export async function GET() {
  const posts = await getHomepagePosts();
  return Response.json({ posts }, {
    headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
  });
}
