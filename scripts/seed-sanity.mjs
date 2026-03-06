import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN is missing in .env.local')
  process.exit(1)
}

const services = [
  {
    _id: 'service-web-copy',
    _type: 'service',
    title: 'Web Copy',
    description: 'High-converting website content that turns visitors into loyal customers. From homepages to landing pages, I ensure your digital storefront speaks your brand\'s truth.',
    icon: 'Globe',
    category: 'website-copy',
    order: 1,
  },
  {
    _id: 'service-email',
    _type: 'service',
    title: 'Email Campaigns',
    description: 'Persuasive email sequences designed to nurture leads and drive revenue. Whether it\'s a newsletter or a product launch, I craft messages that get opened and clicked.',
    icon: 'Mail',
    category: 'email',
    order: 2,
  },
  {
    _id: 'service-ads',
    _type: 'service',
    title: 'Display Ads',
    description: 'Punchy, attention-grabbing ad copy for social and search platforms. Stop the scroll with headlines that demand attention and copy that converts.',
    icon: 'Monitor',
    category: 'social-media',
    order: 3,
  },
  {
    _id: 'service-advertorials',
    _type: 'service',
    title: 'Advertorials',
    description: 'Engagement-driven long-form content that feels like an article but sells like an ad. Perfect for complex products that need more space to shine.',
    icon: 'PenTool',
    category: 'blog-content',
    order: 4,
  },
  {
    _id: 'service-pr',
    _type: 'service',
    title: 'Press Releases',
    description: 'Professional, news-worthy stories to get your brand the PR it deserves. I know how to frame your announcements to catch an editor\'s eye.',
    icon: 'Send',
    category: 'other',
    order: 5,
  },
  {
    _id: 'service-messaging',
    _type: 'service',
    title: 'Brand Messaging',
    description: 'Defining your unique voice and personality to stand out in a crowded market. I build the foundational voice guides that keep your brand consistent.',
    icon: 'Layers',
    category: 'brand-messaging',
    order: 6,
  },
]

const workSamples = [
  {
    _id: 'work-modern-nomad',
    _type: 'workSample',
    title: 'The Modern Nomad Brand Voice',
    slug: { _type: 'slug', current: 'modern-nomad-brand-voice' },
    client: 'Modern Nomad',
    industry: 'Luxury Travel',
    category: 'brand-messaging',
    summary: 'Developed a comprehensive voice and tone guide for a luxury travel subscription service, ensuring consistency across all digital touchpoints.',
    body: [
      { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'The Challenge' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Modern Nomad needed a voice that felt both **exclusive and accessible**. They were struggling with an inconsistent tone that fluctuated between overly corporate and too casual.' }] },
      { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'The Solution' }] },
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'I established three core pillars that now guide all their external communications.' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: 'Sophisticated but never snobbish' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: 'Knowledgeable but always curious' }] }
    ],
    publishedAt: '2024-02-15',
    featured: true,
  },
  {
    _id: 'work-sunset-realty',
    _type: 'workSample',
    title: 'Sunset Realty Email Series',
    slug: { _type: 'slug', current: 'sunset-realty-email-series' },
    client: 'Sunset Realty',
    industry: 'Real Estate',
    category: 'email',
    summary: 'A 5-part nurture sequence for a high-end real estate agency resulting in a 24% open rate increase.',
    body: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'We didn\'t just sell houses; we sold the **dream of the coastal lifestyle**. Each email focused on a "day in the life" of a specific neighborhood.' }] }
    ],
    publishedAt: '2023-11-10',
    featured: true,
  },
  {
    _id: 'work-paystream',
    _type: 'workSample',
    title: 'FinTech Launch Advertorial',
    slug: { _type: 'slug', current: 'fintech-launch-advertorial' },
    client: 'PayStream',
    industry: 'Finance',
    category: 'blog-content',
    summary: 'A technical yet accessible long-form piece published in major finance journals.',
    body: [
      { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'I formatted the content as a deep-dive analysis of the evolving API economy, subtly positioning PayStream as the essential infrastructure for the next decade.' }] }
    ],
    publishedAt: '2024-01-05',
    featured: true,
  },
  {
    _id: 'work-purehome',
    _type: 'workSample',
    title: 'Eco-Living Web Copy',
    slug: { _type: 'slug', current: 'eco-living-web-copy' },
    client: 'PureHome',
    industry: 'Sustainable Living',
    category: 'website-copy',
    summary: 'Complete website rewrite for a sustainable home goods retailer focused on clarity and conversion.',
    publishedAt: '2024-02-28',
    featured: false,
  },
]

const posts = [
  {
    _id: 'post-3-second-hook',
    _type: 'post',
    title: 'The Art of the 3-Second Hook',
    slug: { _type: 'slug', current: 'art-of-the-3-second-hook' },
    excerpt: 'In a world of infinite scrolling, your first three words are your only chance. Here\'s how to make them count.',
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Stop the Scroll' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'You have exactly three seconds to convince a reader that your content is worth their most precious resource: **their attention**. If your headline doesn\'t trigger an immediate emotional or logical response, they\'ve already scrolled past.' }],
      },
      {
        _type: 'block',
        style: 'blockquote',
        children: [{ _type: 'span', text: 'The goal of the first sentence is to get them to read the second sentence. Nothing more.' }],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{ _type: 'span', text: 'Three Hooks That Work' }],
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [{ _type: 'span', text: '**The Contrarian View**: Challenge a deeply held belief in your industry immediately.' }],
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [{ _type: 'span', text: '**The Vulnerable Start**: Open with a mistake or a failure to build instant trust.' }],
      },
      {
        _type: 'block',
        listItem: 'number',
        children: [{ _type: 'span', text: '**The Data-Driven Mystery**: Start with a surprising statistic that begs for an explanation.' }],
      }
    ],
    tags: ['Copywriting', 'Marketing', 'Tips'],
    isDraft: false,
  },
  {
    _id: 'post-brand-personality',
    _type: 'post',
    title: 'Why Your Brand Needs a Personality',
    slug: { _type: 'slug', current: 'why-brand-needs-personality' },
    excerpt: 'People don\'t buy from corporations; they buy from characters. Is your brand\'s personality shining through?',
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'The Human Connection' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'In an era of AI-generated everything, **human personality** is the ultimate differentiator. A brand voice guide isn\'t a set of rules; it\'s a character profile. Ask yourself: if your brand walked into a bar, what would it order, and who would it talk to?' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Consistency is key. You can\'t be the "cool, edgy start-up" on Instagram and the "stuffy, corporate bank" in your transactional emails. The friction of an inconsistent voice creates distrust.' }],
      }
    ],
    tags: ['Branding', 'Voice'],
    isDraft: false,
  },
]

const testimonials = [
  {
    _id: 'testimonial-sarah-jenkins',
    _type: 'testimonial',
    author: 'Sarah Jenkins',
    title: 'Marketing Director, Glow Retail',
    quote: 'Our conversion rates jumped by 40% after implementing the new web copy Jacqueline wrote for us. She just "gets" our customer.',
    featured: true,
    order: 1,
  },
  {
    _id: 'testimonial-david-chen',
    _type: 'testimonial',
    author: 'David Chen',
    title: 'CTO, TechStart',
    quote: 'Jacqueline is a rare talent who can translate complex technical jargon into human stories. She was instrumental to our product launch.',
    featured: true,
    order: 2,
  },
  {
    _id: 'testimonial-marcus-thorne',
    _type: 'testimonial',
    author: 'Marcus Thorne',
    title: 'Founder, Thorne & Co.',
    quote: 'The brand messaging Jacqueline developed for us didn\'t just give us a voice; it gave us confidence. We finally sound like the premium brand we are.',
    featured: true,
    order: 3,
  },
  {
    _id: 'testimonial-elena-rodriguez',
    _type: 'testimonial',
    author: 'Elena Rodriguez',
    title: 'Communications Lead, BioVance',
    quote: 'Working with Jacqueline is a breeze. She captures the most complex scientific concepts and makes them accessible without losing the professional edge.',
    featured: true,
    order: 4,
  },
]

async function seed() {
  console.log('🚀 Starting Sanity seed (DESTRUCTIVE WIPE & RE-SEED)...')

  try {
    const typesToWipe = ['service', 'workSample', 'post', 'testimonial']
    
    for (const type of typesToWipe) {
      console.log(`🧹 Wiping all documents of type: ${type}...`)
      // Delete all documents of this type
      await client.delete({ query: `*[_type == "${type}"]` })
    }

    console.log('🌱 All old data cleared. Re-seeding with stable IDs...')

    const allData = [...services, ...workSamples, ...posts, ...testimonials]

    for (const doc of allData) {
      await client.create(doc)
      console.log(`✅ Seeded ${doc._type}: ${doc.title || doc.author}`)
    }

    console.log('✨ Clean re-seeding complete!')
  } catch (err) {
    console.error('❌ Seeding failed:', err.message)
  }
}

seed()
