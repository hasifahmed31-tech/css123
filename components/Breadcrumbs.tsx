import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mx-auto mb-6 flex max-w-3xl items-center gap-2 overflow-hidden text-xs text-gray-400 dark:text-gray-500 sm:text-sm" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
          {index > 0 && <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href} className="shrink-0 transition-colors duration-150 hover:text-indigo-600 dark:hover:text-indigo-400" prefetch>
              {item.label}
            </Link>
          ) : (
            <span className="truncate text-gray-600 dark:text-gray-400">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
