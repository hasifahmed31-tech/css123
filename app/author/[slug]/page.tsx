import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import BlogCollectionPage from '@/components/BlogCollectionPage'
import { getAuthors, getEnterprisePosts } from '@/lib/enterprise-blog'
import { slugify } from '@/lib/slug'

export const revalidate = 1800

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getEnterprisePosts()
  return getAuthors(posts).map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = getAuthors(await getEnterprisePosts()).find((item) => item.slug === slug)
  if (!author) return {}
  return {
    title: `${author.name} Articles`,
    description: `Read articles by ${author.name} on Hasif.`,
    alternates: { canonical: `/author/${author.slug}` },
  }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const posts = await getEnterprisePosts()
  const author = getAuthors(posts).find((item) => item.slug === slug)
  if (!author) notFound()

  const authorPosts = posts.filter((post) => slugify(post.authorName) === slug)
  const profile = authorPosts[0]

  return (
    <>
      <section className="page-surface pt-28 sm:pt-36">
        <div className="container-custom">
          <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center">
            <div className="relative h-20 w-20 overflow-hidden rounded-full bg-white shadow-lg ring-1 ring-indigo-100 dark:bg-gray-900 dark:ring-white/10">
              <Image src={profile.authorImage || '/site-icon.png'} alt={`${author.name} avatar`} fill sizes="80px" className="object-contain p-1" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white">{author.name}</h1>
            <p className="mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300">{profile.authorRole || 'Author'}</p>
            {profile.authorBio && <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-400">{profile.authorBio}</p>}
          </div>
        </div>
      </section>
      <BlogCollectionPage
        title="Latest Articles"
        description={`${author.count} articles by ${author.name}.`}
        posts={authorPosts}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Authors' }, { label: author.name }]}
      />
    </>
  )
}
