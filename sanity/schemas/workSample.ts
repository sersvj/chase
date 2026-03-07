import { defineField, defineType } from 'sanity'

export const workSampleSchema = defineType({
  name: 'workSample',
  title: 'Work Sample',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client / Brand',
      type: 'string',
      description: 'Can be anonymized (e.g. "Lifestyle Brand")',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Verbal Brand', value: 'verbal-brand' },
          { title: 'Brand Messaging', value: 'brand-messaging' },
          { title: 'Website Content', value: 'website-content' },
          { title: 'Article Content', value: 'article-content' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Short description shown on portfolio cards.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'body',
      title: 'Full Piece (optional)',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [
          { name: 'alt', type: 'string', title: 'Alt Text' }
        ]},
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text', validation: (Rule) => Rule.required() })],
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to live published piece.',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF Upload',
      type: 'file',
      description: 'Upload a PDF for offline or print pieces.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Completed / Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Social',
      type: 'seo',
      group: 'seo',
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'featuredImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? 'No client listed', media }
    },
  },
})
