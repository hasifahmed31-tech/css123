'use client'

import DOMPurify from 'isomorphic-dompurify'

interface TrustedTypesPolicy {
  createHTML: (input: string) => TrustedHTML
}

interface TrustedTypesFactory {
  createPolicy: (name: string, rules: { createHTML: (input: string) => string }) => TrustedTypesPolicy
}

declare global {
  interface Window {
    trustedTypes?: TrustedTypesFactory
  }
}

const SANITIZE_CONFIG = {
  FORBID_TAGS: ['style', 'form', 'input', 'textarea', 'select', 'option'],
  FORBID_ATTR: ['style', 'onerror', 'onload'],
}

function createContentPolicy(trustedTypes: TrustedTypesFactory) {
  return trustedTypes.createPolicy('hasif-content', {
    createHTML: (input: string) => DOMPurify.sanitize(input, SANITIZE_CONFIG),
  })
}

let policy: TrustedTypesPolicy | undefined

function sanitizeToTrustedHtml(value: string): string | TrustedHTML {
  const sanitized = DOMPurify.sanitize(value, SANITIZE_CONFIG)
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
