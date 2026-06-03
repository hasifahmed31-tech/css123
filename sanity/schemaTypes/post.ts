import { defineField, defineType } from 'sanity'
import { seoFields } from './seo'

export const post = defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'taxonomy', title: 'Taxonomy' },
    { name: 'seo', title: 'SEO' },
    { name: 'workflow', title: 'Workflow' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, group: 'content' }),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt text', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
    }),
    defineField({ name: 'body', title: 'Article body', type: 'blockContent', group: 'content' }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], group: 'taxonomy' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'reference', to: [{ type: 'tag' }] }], group: 'taxonomy' }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }], group: 'taxonomy' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'workflow' }),
    defineField({ name: 'trending', title: 'Trending', type: 'boolean', initialValue: false, group: 'workflow' }),
    defineField({ name: 'aiSummary', title: 'AI summary', type: 'text', rows: 3, group: 'content' }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'workflow',
      initialValue: () => new Date().toISOString(),
      description: 'Defaults to now. Set a future date to schedule the post. Draft documents are hidden from the live site.',
    }),
    ...seoFields.map((field) => ({ ...field, group: 'seo' })),
  ],
  orderings: [
    { title: 'Published, newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title', media: 'featuredImage' },
  },
})
