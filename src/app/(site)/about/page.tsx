import { getSiteSettings } from '@/lib/queries'
import SectionHeading from '@/components/ui/SectionHeading'
import CustomPortableText from '@/components/ui/CustomPortableText'
import CTASection from '@/components/sections/CTASection'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import type { SiteSettings } from '@/types/sanity'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings?.seoAbout

  return {
    title: seo?.title || 'About',
    description: seo?.description,
    openGraph: {
      title: seo?.title || 'About',
      description: seo?.description,
      images: seo?.image ? [urlFor(seo.image).width(1200).height(630).url()] : [],
    },
  }
}

export const revalidate = 60

export default async function AboutPage() {
  const settings: SiteSettings = await getSiteSettings()

  return (
    <div className="container-site py-20 lg:py-32">
      <AnimatedSection>
        <SectionHeading 
          title="Hi, I'm Jacqueline." 
          subtitle="About Me"
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Bio Text */}
        <AnimatedSection className="order-2 lg:order-1">
          {settings?.bio ? (
            <CustomPortableText value={settings.bio} />
          ) : (
            <p className="text-[var(--color-brand-muted)]">
              Bio content is currently being drafted in the Studio.
            </p>
          )}

          {/* Marketing Network Teaser */}
          {settings?.networkBlurb && (
            <div className="mt-12 rounded-sm border-l-4 border-[var(--color-brand-red)] bg-[var(--color-brand-warm)] p-8">
              <h3 className="font-display mb-4 text-xl font-bold text-[var(--color-brand-dark)]">
                Chase Creative Marketing Network
              </h3>
              <div className="text-sm leading-relaxed text-[var(--color-brand-charcoal)] prose prose-sm max-w-none">
                <CustomPortableText value={settings.networkBlurb} />
              </div>
            </div>
          )}
        </AnimatedSection>

        {/* Headshot / Image */}
        <AnimatedSection delay={0.15} className="order-1 lg:order-2">
          <div className="relative aspect-square w-full overflow-hidden border-2 border-[var(--color-brand-charcoal)] bg-[var(--color-brand-warm-dark)] shadow-[8px_8px_0px_var(--color-brand-red-muted,rgba(210,47,37,0.1))] transition-transform duration-500 hover:rotate-1">
            {settings?.headshot ? (
              <Image
                src={urlFor(settings.headshot).width(1000).height(1000).url()}
                alt={settings.headshot.alt || 'Jacqueline Chase'}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-[var(--color-brand-muted)]">
                Headshot placeholder
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>

      <CTASection />
    </div>
  )
}
