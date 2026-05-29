export default function BlogLoading() {
  return (
    <>
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-700 py-16 dark:from-indigo-900 dark:to-indigo-950 sm:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto h-7 w-28 animate-pulse rounded-full bg-white/15" />
            <div className="mx-auto mt-5 h-10 w-72 max-w-full animate-pulse rounded-xl bg-white/15" />
            <div className="mx-auto mt-4 h-5 w-80 max-w-full animate-pulse rounded-lg bg-white/10" />
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container-custom grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="premium-card h-[360px] animate-pulse bg-gray-100 dark:bg-white/[0.04]" />
          ))}
        </div>
      </section>
    </>
  )
}
