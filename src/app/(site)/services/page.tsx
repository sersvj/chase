import { getServices, getSiteSettings } from '@/lib/queries'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'
import CTASection from '@/components/sections/CTASection'
import { AnimatedSection, AnimatedGrid } from '@/components/ui/AnimatedSection'
import { urlFor } from '@/lib/sanity'
import type { Metadata } from 'next'
import type { Service } from '@/types/sanity'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings?.seoServices

  return {
    title: seo?.title || 'Services',
    description: seo?.description || 'Professional copywriting and brand strategy services offered by Jacqueline Chase.',
    openGraph: {
      title: seo?.title || 'Services',
      description: seo?.description || 'Professional copywriting and brand strategy services offered by Jacqueline Chase.',
      images: seo?.image ? [urlFor(seo.image).width(1200).height(630).url()] : [],
    },
  }
}

export const revalidate = 60

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings()
  ])

  return (
    <div className="container-site py-20 lg:py-32">
      <AnimatedSection>
        <SectionHeading 
          title="Services & Expertise" 
          subtitle="How I Can Help"
          centered
        />
      </AnimatedSection>

      <AnimatedGrid className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {services.map((service: Service) => (
          <ServiceCard key={service._id} service={service} variant="dark" />
        ))}
      </AnimatedGrid>

      <AnimatedSection delay={0.1}>
        <CTASection />
      </AnimatedSection>
    </div>
  )
}
