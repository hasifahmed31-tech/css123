import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site title', type: 'string', initialValue: 'Hasif' }),
    defineField({ name: 'description', title: 'Footer description', type: 'text', rows: 3 }),
    defineField({ name: 'email', title: 'Email', type: 'email' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
    defineField({
      name: 'navLinks',
      title: 'Navigation links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Href', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer legal links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Href', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'footerNote', title: 'Footer note', type: 'string' }),
  ],
})
