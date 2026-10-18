import { defineField, defineType } from 'sanity'

export const newsletterSubscriber = defineType({
  name: 'newsletterSubscriber',
  title: 'Newsletter subscriber',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'email', readOnly: true }),
    defineField({ name: 'source', title: 'Signup source', type: 'string', readOnly: true }),
    defineField({ name: 'subscribedAt', title: 'Subscribed at', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: { title: 'email', subtitle: 'subscribedAt' },
  },
})
