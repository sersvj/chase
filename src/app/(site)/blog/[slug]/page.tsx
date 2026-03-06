import { getPostBySlug } from '@/lib/queries'
import SectionHeading from '@/components/ui/SectionHeading'
import JsonLd from '@/components/ui/JsonLd'
import CustomPortableText from '@/components/ui/CustomPortableText'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { urlFor } from '@/lib/sanity'
import { getBaseUrl } from '@/lib/site'
import type { Metadata } from 'next'
import type { Post } from '@/types/sanity'
import SideDockNav from '@/components/ui/SideDockNav'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post: Post = await getPostBySlug(slug)

  if (!post) return {}

  const seoTitle = post.seo?.title || post.title
  const seoDescription = post.seo?.description || post.excerpt
  const seoImage = post.seo?.image || post.featuredImage

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: seoImage ? [urlFor(seoImage).width(1200).height(630).url()] : [],
    },
  }
}

export const revalidate = 60

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post: Post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const baseUrl = getBaseUrl()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? urlFor(post.featuredImage).width(1200).height(630).url() : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Jacqueline Chase',
      url: `${baseUrl}/about`,
    },
    publisher: {
      '@type': 'Person',
      name: 'Jacqueline Chase',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug.current}`,
    },
  }

  return (
    <article className="relative py-20 lg:py-32 animate-in fade-in duration-700">
      <JsonLd data={articleSchema} />
      <SideDockNav href="/blog" label="Back to Articles" />
      
      <div className="container-site">
        {/* Mobile Back Link */}
        <Link 
          href="/blog" 
          className="mb-8 inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-brand-muted)] transition-colors hover:text-[var(--color-brand-red)] lg:hidden"
        >
          &larr; Journal
        </Link>

        <header className="mb-16 mt-8 max-w-4xl">
          <p className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-[var(--color-brand-red)]">
            {publishDate}
          </p>
          <h1 className="font-display mb-8 text-4xl font-black uppercase leading-[1.1] tracking-tight text-[var(--color-brand-dark)] sm:text-5xl lg:text-7xl">
            {post.title}
          </h1>
          
          <p className="text-xl leading-relaxed text-[var(--color-brand-charcoal)] opacity-80 sm:text-2xl">
            {post.excerpt}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {post.tags.map(tag => (
                <span key={tag} className="border border-[var(--color-brand-charcoal)] bg-[var(--color-brand-warm)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--color-brand-charcoal)]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
      </div>

      {post.featuredImage && (
        <div className="relative mb-20 aspect-[21/9] w-full overflow-hidden border-y-2 border-[var(--color-brand-charcoal)] bg-[var(--color-brand-warm)] shadow-[0px_12px_0px_rgba(210,47,37,0.05)] lg:mb-32">
          <Image
            src={urlFor(post.featuredImage).width(1920).url()}
            alt={post.featuredImage.alt || post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <div className="container-site">
        <div className="mx-auto max-w-3xl">
          {post.body ? (
            <CustomPortableText value={post.body} />
          ) : (
            <p className="text-[var(--color-brand-muted)]">Post content is currently empty.</p>
          )}
          
          {/* Article Footer */}
          <div className="mt-20 border-t border-[var(--color-brand-warm-dark)] pt-12 text-center">
            <p className="mb-6 font-display text-2xl font-bold text-[var(--color-brand-dark)]">
              Enjoyed this piece?
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-sm bg-[var(--color-brand-red)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[var(--color-brand-red-dark)]"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
