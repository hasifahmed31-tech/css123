import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '@/lib/blog-data';
import Newsletter from '@/components/Newsletter';
import BlogCard from '@/components/BlogCard';
import ScrollReveal from '@/components/ScrollReveal';
import ShareButtons from '@/components/ShareButtons';
import ReadingProgress from '@/components/ReadingProgress';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <article className="bg-[#09090b] pt-28 pb-12 sm:pt-36 sm:pb-16">
        <div className="container-custom max-w-3xl">
          <ScrollReveal direction="none" distance={0}>
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#a78bfa] transition-colors duration-150" prefetch={true}>
                Home
              </Link>
              <span className="text-gray-700" aria-hidden="true">/</span>
              <Link href="/blog" className="hover:text-[#a78bfa] transition-colors duration-150" prefetch={true}>
                Blog
              </Link>
              <span className="text-gray-700" aria-hidden="true">/</span>
              <span className="text-gray-400 truncate max-w-[200px]">{post.title}</span>
            </nav>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16}>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#7c3aed]/10 text-[#c4b5fd] border border-[#a78bfa]/20">
                  {post.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2">
                  <span className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-white/10 shadow-md">
                    <Image src="/hasif-logo-new.png" alt={post.author} fill sizes="28px" className="object-cover" />
                  </span>
                  {post.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" aria-hidden="true" />
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16162a] mb-10 shadow-xl border border-white/[0.06]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} direction="none" distance={0}>
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-10 pt-8 border-t border-white/[0.06]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#a78bfa]/20 shadow-lg">
                    <Image src="/hasif-logo-new.png" alt={post.author} fill sizes="48px" className="object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{post.author}</div>
                    <div className="text-xs text-gray-500">Founder, Hasif Online</div>
                  </div>
                </div>
                <ShareButtons />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {related.length > 0 && (
        <section className="pb-16 sm:pb-24 bg-[#09090b]">
          <div className="container-custom">
            <ScrollReveal>
              <div className="text-center mb-8 sm:mb-10">
                <span className="eyebrow">Related Content</span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-white">
                  Related <span className="gradient-text">Articles</span>
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {related.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.06} direction="up" distance={16}>
                  <BlogCard post={p} index={i} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  );
}
