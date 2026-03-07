import { getWorkSampleBySlug } from '@/lib/queries'
import SectionHeading from '@/components/ui/SectionHeading'
import JsonLd from '@/components/ui/JsonLd'
import CustomPortableText from '@/components/ui/CustomPortableText'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { urlFor } from '@/lib/sanity'
import { getBaseUrl } from '@/lib/site'
import type { Metadata } from 'next'
import type { WorkSample } from '@/types/sanity'
import SideDockNav from '@/components/ui/SideDockNav'

interface PageProps {
  params: Promise<{ slug: string }>
}

interface PageProps {
  params: Promise<{ slug: string }>
}

import { CATEGORY_LABELS } from '@/components/work/WorkListing'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const work: WorkSample = await getWorkSampleBySlug(slug)

  if (!work) return {}

  const seoTitle = work.seo?.title || work.title
  const seoDescription = work.seo?.description || work.summary
  const seoImage = work.seo?.image || work.featuredImage

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

export default async function WorkSamplePage({ params }: PageProps) {
  const { slug } = await params
  const work: WorkSample = await getWorkSampleBySlug(slug)

  if (!work) {
    notFound()
  }

  const baseUrl = getBaseUrl()

  const workSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: work.title,
    description: work.summary,
    image: work.featuredImage ? urlFor(work.featuredImage).width(1200).height(630).url() : undefined,
    creator: {
      '@type': 'Person',
      name: 'Jacqueline Chase',
    },
    genre: work.categories?.join(', '),
    datePublished: work.publishedAt,
  }

  return (
    <article className="relative py-20 lg:py-32 animate-in fade-in duration-700">
      <JsonLd data={workSchema} />
      <SideDockNav href="/work" label="Back to Portfolio" />

      <div className="container-site">
        {/* Mobile Back Link (Slim/Minimal) */}
        <Link 
          href="/work" 
          className="mb-8 inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-brand-muted)] transition-colors hover:text-[var(--color-brand-red)] lg:hidden"
        >
          &larr; Portfolio
        </Link>

        <header className="mb-16 lg:max-w-[calc(50%+24rem)]">
          <SectionHeading 
            title={work.title} 
            subtitle={work.categories?.map(c => CATEGORY_LABELS[c] || c.replace('-', ' ')).join(' / ')}
          />
          
          {/* Project Metadata */}
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-y-2 border-[var(--color-brand-charcoal)] py-10">
            {work.client && (
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand-red)]">Client</p>
                <p className="text-sm font-bold text-[var(--color-brand-dark)]">{work.client}</p>
              </div>
            )}
            {work.industry && (
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand-red)]">Industry</p>
                <p className="text-sm font-bold text-[var(--color-brand-dark)]">{work.industry}</p>
              </div>
            )}
            <div>
              <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand-red)]">Year</p>
              <p className="text-sm font-bold text-[var(--color-brand-dark)]">
                {new Date(work.publishedAt).getFullYear()}
              </p>
            </div>
            {work.externalUrl && (
              <div>
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand-red)]">Link</p>
                <a 
                  href={work.externalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-bold text-[var(--color-brand-dark)] transition-colors hover:text-[var(--color-brand-red)]"
                >
                  View Live Site &rarr;
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Hero Image */}
        {work.featuredImage && (
          <div className="relative mb-20 aspect-video w-full overflow-hidden border-2 border-[var(--color-brand-charcoal)] bg-[var(--color-brand-warm)] shadow-[12px_12px_0px_rgba(210,47,37,0.1)] lg:mb-32">
            <Image
              src={urlFor(work.featuredImage).width(1600).url()}
              alt={work.featuredImage.alt || work.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        {/* Project Content */}
        <div className="mx-auto max-w-3xl">
          {work.body ? (
            <CustomPortableText value={work.body} />
          ) : (
            <p className="text-lg leading-relaxed text-[var(--color-brand-charcoal)] opacity-90">
              {work.summary}
            </p>
          )}

          {/* Primary External CTA */}
          {work.externalUrl && (
            <div className="mt-16 flex border-t-2 border-[var(--color-brand-warm-dark)] pt-8">
              <a 
                href={work.externalUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[var(--color-brand-red)] px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[var(--color-brand-red-dark)] hover:shadow-[12px_12px_0px_rgba(210,47,37,0.15)]"
              >
                View Live Project
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          )}
          
          {/* PDF Link */}
          {work.pdfFile && (
            <div className="mt-12">
              <a
                href={work.pdfFile.asset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-sm bg-[var(--color-brand-dark)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[var(--color-brand-charcoal)]"
              >
                Download PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
