'use client'

import { useMemo, useState } from 'react'
import { Eye, FileCode2, Type } from 'lucide-react'
import { markdownToHtml, sanitizeHtml } from '@/lib/content'

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [mode, setMode] = useState<'html' | 'markdown' | 'preview'>('html')
  const preview = useMemo(() => sanitizeHtml(mode === 'markdown' ? markdownToHtml(value) : value), [mode, value])

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-gray-950">
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-gray-50 p-2 dark:border-white/10 dark:bg-white/[0.04]">
        {[
          { id: 'html', label: 'Rich HTML', icon: Type },
          { id: 'markdown', label: 'Markdown', icon: FileCode2 },
          { id: 'preview', label: 'Preview', icon: Eye },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id as 'html' | 'markdown' | 'preview')}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${
              mode === id
                ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950'
                : 'text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-white/10'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
      {mode === 'preview' ? (
        <div className="blog-content min-h-[360px] p-5" dangerouslySetInnerHTML={{ __html: preview }} />
      ) : (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={18}
          className="min-h-[360px] w-full resize-y bg-transparent p-5 font-mono text-sm leading-6 text-gray-800 outline-none dark:text-gray-100"
          placeholder={mode === 'markdown' ? '## Heading\n\nWrite **Markdown** here.' : '<h2>Heading</h2>\n<p>Write HTML content here.</p>'}
        />
      )}
    </div>
  )
}

