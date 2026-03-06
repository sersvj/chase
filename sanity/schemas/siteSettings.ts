import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one document of this type should ever exist
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'e.g. "Copywriter. Optimist. Brand Builder."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'About / Bio',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt Text', initialValue: 'Jacqueline Chase' })],
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'twitter', title: 'X / Twitter URL', type: 'url' }),
      ],
    }),
    defineField({
      name: 'contactNote',
      title: 'Contact Page Note',
      type: 'text',
      rows: 3,
      description: 'Shown above the contact form.',
    }),
    defineField({
      name: 'networkBlurb',
      title: 'Chase Creative Marketing Network Blurb',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    // SEO Section
    defineField({
      name: 'seoHome',
      title: 'Home Page SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'seoAbout',
      title: 'About Page SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'seoServices',
      title: 'Services Page SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'seoWork',
      title: 'Work / Portfolio Page SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'seoBlog',
      title: 'Blog Listing Page SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'seoContact',
      title: 'Contact Page SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  groups: [
    { name: 'seo', title: 'SEO' },
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
