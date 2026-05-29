export default function BlogPostLoading() {
  return (
    <article className="page-surface pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="container-custom max-w-3xl">
        <div className="mb-8 h-4 w-48 animate-pulse rounded bg-gray-100 dark:bg-white/10" />
        <div className="mb-4 h-7 w-24 animate-pulse rounded-full bg-gray-100 dark:bg-white/10" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-gray-100 dark:bg-white/10" />
        <div className="mt-3 h-12 w-3/4 animate-pulse rounded-xl bg-gray-100 dark:bg-white/10" />
        <div className="mt-5 h-5 w-80 max-w-full animate-pulse rounded bg-gray-100 dark:bg-white/10" />
        <div className="my-10 aspect-[16/9] animate-pulse rounded-2xl bg-gray-100 dark:bg-white/10" />
        <div className="space-y-4">
          <div className="h-5 animate-pulse rounded bg-gray-100 dark:bg-white/10" />
          <div className="h-5 animate-pulse rounded bg-gray-100 dark:bg-white/10" />
          <div className="h-5 w-5/6 animate-pulse rounded bg-gray-100 dark:bg-white/10" />
        </div>
      </div>
    </article>
  )
}
