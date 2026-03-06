# CONTENT_MODEL.md — Sanity Schema Plan

> This document defines the planned content types (document schemas) for the Sanity CMS. Use this as the reference when building or updating Sanity schemas in `sanity/schemas/`.

---

## Document Types

### 1. `workSample` — Portfolio Pieces

The primary content type. Each entry represents a single piece of work.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | ✅ | Name of the piece / project |
| `slug` | `slug` | ✅ | Auto-generated from title |
| `client` | `string` | ❌ | Client or brand name (can be anonymized) |
| `industry` | `string` | ❌ | e.g. "SaaS", "Lifestyle", "Healthcare" |
| `category` | `string` (select) | ✅ | See categories below |
| `summary` | `text` | ✅ | Short description (shown on cards) |
| `body` | `portableText` | ❌ | Full piece inline, if applicable |
| `externalUrl` | `url` | ❌ | Link to live piece |
| `pdfFile` | `file` | ❌ | PDF upload for offline pieces |
| `featuredImage` | `image` | ❌ | Thumbnail/hero for the piece |
| `featured` | `boolean` | ❌ | Flag to feature on homepage |
| `publishedAt` | `date` | ✅ | When the work was completed |

**Work Categories:**
- `brand-messaging` — Brand Messaging & Voice
- `website-copy` — Website Copy
- `blog-content` — Blog & Articles
- `social-media` — Social Media
- `email` — Email Campaigns
- `other` — Other

---

### 2. `service` — Services Offered

Describes what Jacqueline offers. Ordered list.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | ✅ | Service name |
| `description` | `text` | ✅ | Short description |
| `icon` | `string` | ❌ | Icon name or emoji (TBD) |
| `order` | `number` | ✅ | Controls display order |

---

### 3. `post` — Blog / Articles

For the blog section. Scaffold now, activate when ready.

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | `string` | ✅ | Post title |
| `slug` | `slug` | ✅ | Auto-generated |
| `publishedAt` | `datetime` | ✅ | Publication date |
| `excerpt` | `text` | ✅ | Short summary (for listing pages) |
| `body` | `portableText` | ✅ | Full post content |
| `featuredImage` | `image` | ❌ | Hero image |
| `tags` | `array<string>` | ❌ | Freeform tags |
| `isDraft` | `boolean` | ❌ | Hide from public without deleting |

---

### 4. `testimonial` — Client Testimonials

| Field | Type | Required | Notes |
|---|---|---|---|
| `quote` | `text` | ✅ | The testimonial text |
| `author` | `string` | ✅ | Person's name |
| `title` | `string` | ❌ | Their job title / company |
| `featured` | `boolean` | ❌ | Show on homepage |
| `order` | `number` | ❌ | Display order |

---

### 5. `siteSettings` — Global Site Settings

A singleton document (only one ever exists). Controls site-wide content.

| Field | Type | Required | Notes |
|---|---|---|---|
| `siteTitle` | `string` | ✅ | Browser tab / SEO title |
| `tagline` | `string` | ✅ | e.g. "Copywriter. Optimist. Brand Builder." |
| `bio` | `portableText` | ✅ | About/intro text |
| `headshot` | `image` | ❌ | Profile photo |
| `email` | `string` | ✅ | Contact email |
| `socialLinks` | `object` | ❌ | Instagram, LinkedIn, Facebook URLs |
| `contactNote` | `text` | ❌ | Note shown above contact form |
| `networkBlurb` | `text` | ❌ | Blurb about Chase Creative Marketing Network |
| `seoDescription` | `text` | ❌ | Global meta description fallback |

---

## Notes

- All `image` fields should include `alt` text sub-field for accessibility
- `portableText` blocks should support: bold, italic, links, headings (H2/H3), and block quotes
- Slug fields should be marked read-only after first save to prevent broken URLs
- The `post` and `workSample` types should support OpenGraph image overrides for social sharing
