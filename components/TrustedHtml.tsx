'use client'

import DOMPurify from 'isomorphic-dompurify'

function createContentPolicy(trustedTypes: NonNullable<Window['trustedTypes']>) {
  return trustedTypes.createPolicy('hasif-content', {
    createHTML: (input) => DOMPurify.sanitize(input),
  })
}

let policy: ReturnType<typeof createContentPolicy> | undefined

function sanitizeToTrustedHtml(value: string): string | TrustedHTML {
  const sanitized = DOMPurify.sanitize(value)
  if (typeof window === 'undefined' || !window.trustedTypes) return sanitized

  const contentPolicy = policy ??= createContentPolicy(window.trustedTypes)
  return contentPolicy.createHTML(sanitized)
}

interface Props {
  html: string
  className?: string
  id?: string
}

export default function TrustedHtml({ html, className, id }: Props) {
  return <div id={id} className={className} dangerouslySetInnerHTML={{ __html: sanitizeToTrustedHtml(html) }} />
}
