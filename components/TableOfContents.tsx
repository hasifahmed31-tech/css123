import type { TocItem } from '@/lib/blog-features'

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null

  return (
    <aside className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
      <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">Table of contents</h2>
      <nav className="mt-4 grid gap-2" aria-label="Table of contents">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`text-sm leading-5 text-gray-600 transition hover:text-[#6d28d9] dark:text-gray-400 dark:hover:text-[#c4b5fd] ${item.level === 3 ? 'pl-4' : ''}`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </aside>
  )
}
