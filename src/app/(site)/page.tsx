import { getSiteSettings, getFeaturedWork, getServices, getFeaturedTestimonials } from '@/lib/queries'
import Hero from '@/components/sections/Hero'
import SectionHeading from '@/components/ui/SectionHeading'
import ServiceCard from '@/components/ui/ServiceCard'
import WorkCarousel from '@/components/ui/WorkCarousel'
import TestimonialCarousel from '@/components/ui/TestimonialCarousel'
import { AnimatedSection, AnimatedGrid } from '@/components/ui/AnimatedSection'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import type { WorkSample, Service, Testimonial } from '@/types/sanity'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings?.seoHome

  return {
    title: seo?.title,
    description: seo?.description,
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      images: seo?.image ? [urlFor(seo.image).width(1200).height(630).url()] : [],
    },
  }
}

export const revalidate = 60

export default async function HomePage() {
  const featuredWork: WorkSample[] = await getFeaturedWork()
  const services: Service[] = await getServices()
  const testimonials: Testimonial[] = await getFeaturedTestimonials()

  return (
    <div className="flex flex-col overflow-hidden">
      <Hero />

      <section id="work" className="container-site py-20 lg:py-32">
        <AnimatedSection>
          <div className="flex flex-col justify-between md:flex-row md:items-end">
            <SectionHeading 
              title="Featured Projects" 
              subtitle="Selected Work"
            />
            <Link 
              href="/work" 
              className="mb-12 font-bold uppercase tracking-widest text-[var(--color-brand-dark)] transition-colors hover:text-[var(--color-brand-red)] md:mb-16"
            >
              See All Work &rarr;
            </Link>
          </div>
        </AnimatedSection>

        {featuredWork && featuredWork.length > 0 ? (
          <WorkCarousel workItems={featuredWork} />
        ) : (
          <div className="py-20 text-center text-[var(--color-brand-muted)]">
            <p>Ready to showcase some amazing copy? Head over to the Studio to add your first project.</p>
          </div>
        )}
      </section>

      <section id="services" className="bg-[var(--color-brand-dark)] py-20 lg:py-32">
        <div className="container-site">
          <AnimatedSection>
            <SectionHeading 
              title="How I Can Help" 
              subtitle="Services"
              light
            />
          </AnimatedSection>
          
          {services && services.length > 0 ? (
            <AnimatedGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </AnimatedGrid>
          ) : (
            <div className="py-20 text-center text-[var(--color-brand-warm)]/50">
              <p>Services catalog coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {testimonials && testimonials.length > 0 && (
        <section className="bg-[var(--color-brand-warm)] py-20 lg:py-32">
          <div className="container-site">
            <AnimatedSection>
              <SectionHeading 
                title="Kind Words" 
                subtitle="Testimonials"
                centered
              />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <TestimonialCarousel testimonials={testimonials} />
            </AnimatedSection>
          </div>
        </section>
      )}

      <AnimatedSection>
        <section className="border-t border-[var(--color-brand-warm-dark)] py-20 lg:py-32">
          <div className="container-site text-center">
            <SectionHeading 
              title="Let's build something together." 
              subtitle="Get In Touch"
              centered
            />
            <Link
              href="/contact"
              className="inline-block rounded-sm bg-[var(--color-brand-red)] px-12 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:scale-105 hover:bg-[var(--color-brand-red-dark)] hover:shadow-[var(--shadow-btn)]"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
