import { client } from './sanity'

// ============================================================
// SITE SETTINGS (singleton)
// ============================================================
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteTitle,
  tagline,
  bio,
  headshot,
  email,
  socialLinks,
  contactNote,
  networkBlurb,
  seoHome,
  seoAbout,
  seoServices,
  seoWork,
  seoBlog,
  seoContact
}`

// ============================================================
// WORK SAMPLES
// ============================================================
export const workSamplesQuery = `*[_type == "workSample"] | order(publishedAt desc){
  _id,
  title,
  slug,
  client,
  industry,
  category,
  summary,
  "featuredImage": featuredImage {
    ...,
    "asset": asset->{
      ...,
      metadata
    }
  },
  externalUrl,
  featured,
  publishedAt,
  seo
}`

export const featuredWorkQuery = `*[_type == "workSample" && featured == true] | order(publishedAt desc)[0...6]{
  _id,
  title,
  slug,
  client,
  category,
  summary,
  "featuredImage": featuredImage {
    ...,
    "asset": asset->{
      ...,
      metadata
    }
  },
  publishedAt
}`

export const workSampleBySlugQuery = `*[_type == "workSample" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  client,
  industry,
  category,
  summary,
  body,
  "featuredImage": featuredImage {
    ...,
    "asset": asset->{
      ...,
      metadata
    }
  },
  externalUrl,
  pdfFile,
  publishedAt,
  seo
}`

// ============================================================
// SERVICES
// ============================================================
export const servicesQuery = `*[_type == "service"] | order(order asc){
  _id,
  title,
  description,
  icon,
  category
}`

// ============================================================
// BLOG / ARTICLES
// ============================================================
export const postsQuery = `*[_type == "post" && isDraft != true] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featuredImage,
  tags,
  seo
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && isDraft != true][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  featuredImage,
  tags,
  seo
}`

// ============================================================
// TESTIMONIALS
// ============================================================
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author,
  title,
  featured
}`

export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  quote,
  author,
  title
}`

// ============================================================
// QUERY HELPERS — co-located fetchers
// ============================================================
export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery)
}

export async function getWorkSamples() {
  return client.fetch(workSamplesQuery)
}

export async function getFeaturedWork() {
  return client.fetch(featuredWorkQuery)
}

export async function getWorkSampleBySlug(slug: string) {
  return client.fetch(workSampleBySlugQuery, { slug })
}

export async function getServices() {
  return client.fetch(servicesQuery)
}

export async function getPosts() {
  return client.fetch(postsQuery)
}

export async function getPostBySlug(slug: string) {
  return client.fetch(postBySlugQuery, { slug })
}

export async function getTestimonials() {
  return client.fetch(testimonialsQuery)
}

export async function getFeaturedTestimonials() {
  return client.fetch(featuredTestimonialsQuery)
}
