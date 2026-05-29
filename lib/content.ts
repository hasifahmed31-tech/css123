export function stripHtml(value: string) {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

export function excerptFromContent(value: string, length = 160) {
  const text = stripHtml(value)
  return text.length > length ? `${text.slice(0, length - 3)}...` : text
}

export function readTime(value: string) {
  const words = stripHtml(value).split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export function sanitizeHtml(html: string) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\s*\/?\s*(script|style|iframe|object|embed|link|meta|base|form|input|button|textarea|select|option|svg|math)[^>]*>/gi, '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\s(?:on\w+|formaction|srcdoc)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(href|src)\s*=\s*(["']?)\s*(javascript:|data:text\/html|vbscript:)[\s\S]*?\2/gi, '')
    .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
}

export function markdownToHtml(markdown: string) {
  const escaped = markdown
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const lines = escaped.split(/\r?\n/)
  const html: string[] = []
  let inList = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      continue
    }
    if (trimmed.startsWith('### ')) {
      if (inList) html.push('</ul>')
      inList = false
      html.push(`<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`)
    } else if (trimmed.startsWith('## ')) {
      if (inList) html.push('</ul>')
      inList = false
      html.push(`<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`)
    } else if (trimmed.startsWith('# ')) {
      if (inList) html.push('</ul>')
      inList = false
      html.push(`<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`)
    } else if (trimmed.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`)
    } else {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<p>${inlineMarkdown(trimmed)}</p>`)
    }
  }

  if (inList) html.push('</ul>')
  return html.join('\n')
}

function inlineMarkdown(value: string) {
  return value
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
}
