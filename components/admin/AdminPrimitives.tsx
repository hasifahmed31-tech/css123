export function PageHeader({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-950 dark:text-white">{title}</h1>
        {description && <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04] ${className}`}>
      {children}
    </section>
  )
}

export function SkeletonRows({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-xl bg-gray-100 dark:bg-white/10" />
      ))}
    </div>
  )
}

