export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

export function uniqueFileName(name: string) {
  const extension = name.includes('.') ? `.${name.split('.').pop()}` : ''
  const base = name.replace(/\.[^/.]+$/, '')
  return `${slugify(base) || 'upload'}-${Date.now()}${extension.toLowerCase()}`
}

