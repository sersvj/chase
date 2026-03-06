import { defineField, defineType } from 'sanity'

export const seoSchema = defineType({
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: 'Custom title for search engines. Falls back to document title if empty.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Custom description for search engines. Falls back to summary/excerpt if empty.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'image',
      title: 'Social Image',
      type: 'image',
      description: 'Custom image for social media shares (Open Graph). Falls back to featured image if empty.',
      options: { hotspot: true },
    }),
  ],
})
