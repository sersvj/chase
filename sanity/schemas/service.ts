import { defineField, defineType } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Select a professional icon for this service.',
      options: {
        list: [
          { title: 'Globe / Web', value: 'Globe' },
          { title: 'Mail / Email', value: 'Mail' },
          { title: 'Monitor / Display', value: 'Monitor' },
          { title: 'Megaphone / PR', value: 'Megaphone' },
          { title: 'Pen / Writing', value: 'PenTool' },
          { title: 'Target / Strategy', value: 'Target' },
          { title: 'Zap / Energy', value: 'Zap' },
          { title: 'Message / Copy', value: 'MessageSquare' },
          { title: 'Star / Brand', value: 'Star' },
          { title: 'Layers / Brand Messaging', value: 'Layers' },
          { title: 'Sparkles / Creative', value: 'Sparkles' },
          { title: 'Send / Campaign', value: 'Send' },
        ],
      },
    }),
    defineField({
      name: 'categories',
      title: 'Work Categories',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Select one or more work categories to link this service to for filtering.',
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Order: ${subtitle}` }
    },
  },
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
