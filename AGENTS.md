# AGENTS.md — Jacqueline Chase Portfolio Site

> **Read this file first.** This is the canonical reference for any AI agent working on this project. Follow the decisions documented here and do not re-litigate them unless the user explicitly asks.

---

## Project Overview

A modern, performant personal portfolio and resume site for **Jacqueline Chase** — a versatile copywriter, digital marketer, and brand strategist with freelance agency experience.

**Goals:**
- Establish a polished, professional web home for Jacqueline's personal brand
- Showcase her portfolio, services, and writing background
- Allow Jacqueline to manage her own content without touching code
- Lay groundwork for a blog/articles section (even if not immediately active)

---

## Client

- **Name:** Jacqueline Chase
- **Title:** Copywriter · Optimist · Brand Builder
- **Positioning:** Versatile writer with freelance agency experience; skilled in attention-grabbing content across marketing platforms
- **Services (from existing site):**
  - Brand messaging and awareness content
  - SEO-based website copy
  - Blog and long-form content
  - Social media strategy and copy
  - Marketing platform content (multi-channel)
  - Project management support across verticals
- **Network:** Chase Creative Marketing Network — a personal network of marketing professionals she connects clients with

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Next.js (App Router) | Static generation + ISR for performance and SEO |
| **Styling** | Tailwind CSS | Utility-first, consistent design system |
| **Animations** | Framer Motion | Page transitions, scroll reveals, micro-interactions |
| **CMS** | Sanity (v3) | Headless; editors use Sanity Studio |
| **Hosting** | Vercel | Free Hobby tier is sufficient |
| **Language** | TypeScript | Enforced throughout |

### Key Decisions (do not reverse without user approval)
- **App Router** over Pages Router — use server components by default
- **Sanity** is the single source of truth for all editable content
- **No database** beyond Sanity — avoid adding Prisma/Supabase/etc. unless scope changes significantly
- **Tailwind CSS** is the only styling tool — no CSS Modules, no styled-components

---

## Design System

### Brand Colors
| Token | Value | Usage |
|---|---|---|
| `brand-red` | `#D93025` (approx.) | Primary accent, CTAs, headings |
| `brand-dark` | `#1C1C1C` | Body text, dark backgrounds |
| `brand-warm` | `#F5F0EB` | Off-white/warm background |
| `brand-white` | `#FFFFFF` | Clean sections |

> [!IMPORTANT]
> Exact hex values should be confirmed once a brand guide or logo file is provided. The above are approximated from the existing site screenshot.

### Typography
- **Display / Headings:** Bold, uppercase or near-uppercase — commanding and editorial
- **Body:** Clean, readable sans-serif
- **Suggested fonts:** [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) for display headings + [Inter](https://fonts.google.com/specimen/Inter) for body (confirm with client)

### Logo
- Crescent moon motif (white on dark background)
- Should render in both light and dark contexts
- SVG format preferred — request vector file from client

### Aesthetic Direction
- Modern and clean, but with warmth and personality
- Bold typographic statements (the "Copywriter. Optimist. Brand Builder." treatment)
- Avoid sterile/corporate — this is a personal brand, not a SaaS product
- Photography-forward where possible (client has lifestyle/workspace imagery)

---

## UX & Motion Principles

This site should feel like a **cutting-edge web app**, not a static brochure. The following patterns are required — not optional polish.

### Page Transitions
- Use **Framer Motion** `AnimatePresence` to animate between routes
- Default transition: subtle fade + upward slide (e.g., `y: 20 → 0`, `opacity: 0 → 1`, ~0.35s ease-out)
- Never show a blank white flash between pages

### Scroll Animations
- Content sections animate in as they enter the viewport — use Framer Motion `whileInView` + `viewport={{ once: true }}`
- Stagger children in grids/lists (portfolio cards, service items, testimonials) at ~0.08s intervals
- Avoid animating everything — use restraint; hero, section intros, and card grids are the priority

### Micro-Interactions
- Buttons: subtle scale + color shift on hover (`scale: 1.03`, transition ~0.2s)
- Cards: soft lift effect on hover (`y: -4px`, shadow increase)
- Navigation links: clean underline grow animation
- Logo: no animation — keep it grounded

### Loading States
- Use **skeleton screens** (not spinners) for any async content
- Next.js `loading.tsx` files should be implemented per route segment

### Scroll Behavior
- `scroll-behavior: smooth` globally
- Parallax depth effects on hero section (subtle — avoid motion sickness)

### Performance Rule for Motion
- All animations must respect `prefers-reduced-motion` — wrap Framer Motion variants in a utility that disables motion when the OS preference is set
- No animation should block or delay meaningful content from rendering

---

## Site Structure

| Page | Route | Status |
|---|---|---|
| Home | `/` | Required |
| About | `/about` | Required |
| Services | `/services` | Required |
| Portfolio / Work | `/work` | Required |
| Blog / Articles | `/blog` | Scaffold now, activate later |
| Single Blog Post | `/blog/[slug]` | Required (matches blog) |
| Contact | `/contact` | Required |

---

## Content Model

See `CONTENT_MODEL.md` for the full Sanity schema plan.

---

## Development Conventions

- All components go in `src/components/`
- All Sanity schemas go in `sanity/schemas/`
- Use `src/lib/sanity.ts` for the Sanity client and GROQ queries
- Environment variables: `.env.local` (never commit); see `.env.example` for required keys
- Required env vars:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN` (write token, server-side only)

---

## Quality Standards

These are **non-negotiable** requirements, not optional polish. Every agent working on this project must treat Performance, Accessibility, SEO, and Best Practices as first-class concerns alongside functionality.

### Performance
- Prefer **React Server Components** (RSC) — fetch data on the server, avoid unnecessary client bundles
- Use **Next.js `<Image />`** for all images — never raw `<img>` tags; always specify `width`, `height`, and `priority` where appropriate
- Use **`next/font`** to load Google Fonts — eliminates render-blocking font requests
- Avoid large client-side JavaScript — if a component doesn't need interactivity, it should not be a client component
- Aim for Lighthouse Performance score **≥ 90** on all pages
- Use ISR (`revalidate`) or static generation for all Sanity-driven pages — avoid SSR unless necessary

### Accessibility
- All interactive elements must be keyboard-navigable with visible focus indicators
- All images must have meaningful `alt` text (not empty unless decorative)
- Use semantic HTML throughout — `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`, etc.
- Color contrast must meet **WCAG AA** minimum (4.5:1 for body text, 3:1 for large text/UI)
- Use ARIA attributes only when semantic HTML is insufficient — no unnecessary ARIA noise
- Forms must have proper `<label>` elements associated with all inputs
- Include a **skip-to-main** link at the top of every page
- Aim for Lighthouse Accessibility score **≥ 95**

### SEO
- Each page must have a unique, descriptive `<title>` and `<meta name="description">`
- Use Next.js **Metadata API** (`export const metadata`) — no direct `<head>` manipulation
- Implement **Open Graph** and **Twitter Card** meta tags on all pages (using Sanity fields where appropriate)
- Use a single **`<h1>`** per page; heading hierarchy must be logical (H1 → H2 → H3)
- Generate a **`sitemap.xml`** and **`robots.txt`** via Next.js route handlers
- Structured data (**JSON-LD**) should be added at minimum to the homepage (Person schema) and blog posts (Article schema)
- All URLs should be human-readable slugs — no query-string-based routing for content pages

### Best Practices
- **TypeScript** is enforced — no `any` types; define proper interfaces for all Sanity document types
- No secrets or API tokens in client-side code — use server components or API routes for sensitive calls
- Dependencies should be kept minimal — evaluate need before installing any new package
- Use **ESLint** and **Prettier** configured from project root — all code must pass linting before commit
- All Sanity GROQ queries should be co-located in `src/lib/queries.ts` — not scattered across components
- Lighthouse **Best Practices** score target: **≥ 90**

---

## Out of Scope (for now)

- E-commerce / paid services / booking system
- Authentication / user accounts
- Multi-language support
- Custom email infrastructure (use a form service like Resend or Formspree)
