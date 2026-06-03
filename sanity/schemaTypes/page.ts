import { defineField, defineType } from 'sanity'
import { seoFields } from './seo'

export const page = defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'slug',
      title: 'Page',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'content' }),
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, group: 'content' }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent', group: 'content' }),
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug' },
  },
})
