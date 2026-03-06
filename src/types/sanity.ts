import type { PortableTextBlock } from '@portabletext/types'

// ============================================================
// SANITY IMAGE
// ============================================================
export interface SanityImage {
  _type: 'image'
  asset: { 
    _ref: string; 
    _type: 'reference';
    metadata?: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      }
    }
  }
  alt?: string
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

// ============================================================
// SANITY SLUG
// ============================================================
export interface SanitySlug {
  current: string
  _type: 'slug'
}

// ============================================================
// SEO & SOCIAL
// ============================================================
export interface SEO {
  title?: string
  description?: string
  image?: SanityImage
}

// ============================================================
// WORK SAMPLE
// ============================================================
export type WorkCategory =
  | 'brand-messaging'
  | 'website-copy'
  | 'blog-content'
  | 'social-media'
  | 'email'
  | 'other'

export interface WorkSample {
  _id: string
  title: string
  slug: SanitySlug
  client?: string
  industry?: string
  category: WorkCategory
  summary: string
  body?: PortableTextBlock[]
  featuredImage?: SanityImage
  externalUrl?: string
  pdfFile?: { asset: { _ref: string; url: string } }
  featured?: boolean
  publishedAt: string
  seo?: SEO
}

// ============================================================
// SERVICE
// ============================================================
export interface Service {
  _id: string
  title: string
  description: string
  icon?: string
  category?: WorkCategory
  order: number
}

// ============================================================
// BLOG POST
// ============================================================
export interface Post {
  _id: string
  title: string
  slug: SanitySlug
  publishedAt: string
  excerpt: string
  body?: PortableTextBlock[]
  featuredImage?: SanityImage
  tags?: string[]
  isDraft?: boolean
  seo?: SEO
}

// ============================================================
// TESTIMONIAL
// ============================================================
export interface Testimonial {
  _id: string
  quote: string
  author: string
  title?: string
  featured?: boolean
  order?: number
}

// ============================================================
// SOCIAL LINKS
// ============================================================
export interface SocialLinks {
  instagram?: string
  linkedin?: string
  facebook?: string
  twitter?: string
}

// ============================================================
// SITE SETTINGS
// ============================================================
export interface SiteSettings {
  siteTitle: string
  tagline: string
  bio: PortableTextBlock[]
  headshot?: SanityImage
  email: string
  socialLinks?: SocialLinks
  contactNote?: string
  networkBlurb?: PortableTextBlock[]
  seoHome?: SEO
  seoAbout?: SEO
  seoServices?: SEO
  seoWork?: SEO
  seoBlog?: SEO
  seoContact?: SEO
}
