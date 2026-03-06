# Chase Creative Co. Portfolio

A portfolio and content management system built for Jacqueline Chase. This project showcases editorial copywriting, brand strategy, and marketing expertise through a modern web experience.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org)
- **CMS**: [Sanity v3](https://www.sanity.io)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Email**: [Resend](https://resend.com)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### 1. Clone & Install

```bash
git clone <repository-url>
cd chase
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory. Use `.env.example` as a template:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=

# Contact Form
RESEND_API_KEY=
CONTACT_EMAIL=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Site URL (Use localhost:3000 for local dev)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Architecture & Conventions

- **Next.js App Router**: Utilizes React Server Components (RSC) by default for optimal performance and SEO.
- **Sanity Integration**: All content (work samples, services, blog posts, testimonials) is managed through Sanity Studio located at `/studio`.
- **Motion System**: Framer Motion is used for page transitions, scroll reveals, and micro-interactions. A motion utility is implemented to respect `prefers-reduced-motion`.
- **SEO & Metadata**: Implements Next.js Metadata API, dynamic sitemaps, and JSON-LD structured data.

## Deployment

This project is optimized for deployment on **Vercel**. 

1. Connect your repository to Vercel.
2. Add the environment variables listed in `.env.example` to the Vercel project settings.
3. Ensure `NEXT_PUBLIC_SITE_URL` in production reflects your live domain.

For preview deployments, the site automatically uses the `VERCEL_URL` provided by the platform.
