import { defineField } from 'sanity'

export const seoFields = [
  defineField({ name: 'metaTitle', title: 'Meta title', type: 'string' }),
  defineField({ name: 'metaDescription', title: 'Meta description', type: 'text', rows: 3 }),
  defineField({ name: 'keywords', title: 'Meta keywords', type: 'array', of: [{ type: 'string' }] }),
  defineField({
    name: 'ogImage',
    title: 'Open Graph image',
    type: 'image',
    options: { hotspot: true },
    fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
  }),
]
