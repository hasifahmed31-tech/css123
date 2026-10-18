import type { BlogListPost } from '@/lib/blog-features'
import BlogListCard from '@/components/BlogListCard'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function BlogCollectionPage({
  title,
  description,
  posts,
  breadcrumbs,
}: {
  title: string
  description: string
  posts: BlogListPost[]
  breadcrumbs: Array<{ label: string; href?: string }>
}) {
  return (
    <main className="page-surface pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="container-custom">
        <Breadcrumbs items={breadcrumbs} />
        <header className="editorial-hero mx-auto mb-10 max-w-4xl rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-14">
          <span className="eyebrow">Explore the journal</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">{description}</p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => <BlogListCard key={post.id} post={post} index={index} />)}
        </div>
      </div>
    </main>
  )
}
