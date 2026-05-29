import type { BlogListPost } from '@/lib/blog-features'
import NotionBlogCard from '@/components/NotionBlogCard'
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
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-4xl">{title}</h1>
          <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">{description}</p>
        </header>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => <NotionBlogCard key={post.id} post={post} index={index} />)}
        </div>
      </div>
    </main>
  )
}
