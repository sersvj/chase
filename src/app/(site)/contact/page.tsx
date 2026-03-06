import React from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactForm from '@/components/forms/ContactForm'
import ReCaptchaWrapper from '@/components/forms/ReCaptchaWrapper'
import { getSiteSettings } from '@/lib/queries'
import CustomPortableText from '@/components/ui/CustomPortableText'
import type { Metadata } from 'next'
import { urlFor } from '@/lib/sanity'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings?.seoContact

  return {
    title: seo?.title || 'Contact',
    description: seo?.description || 'Get in touch with Chase Creative Co. for professional copywriting and brand strategy services.',
    openGraph: {
      title: seo?.title || 'Contact',
      description: seo?.description || 'Get in touch with Chase Creative Co. for professional copywriting and brand strategy services.',
      images: seo?.image ? [urlFor(seo.image).width(1200).height(630).url()] : [],
    },
  }
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <div className="container-site py-20 lg:py-32">
      <SectionHeading 
        title="Let's build something." 
        subtitle="Contact"
      />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left: Contact Info / Context */}
        <div>
          <h3 className="font-display mb-6 text-2xl font-bold text-[var(--color-brand-dark)] md:text-3xl">
            I welcome the opportunity to work with you.
          </h3>
          <p className="mb-8 text-lg leading-relaxed text-[var(--color-brand-charcoal)]">
            {settings?.contactNote || 'Whether you\'re looking to refresh your brand messaging, build a high-converting landing page, or share a story with the world—I\'m here to help.'}
          </p>

          <div className="space-y-8">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[var(--color-brand-red)]">Email</p>
              <a 
                href={`mailto:${settings?.email || 'hello@chasecreative.co'}`}
                className="text-xl font-medium text-[var(--color-brand-dark)] transition-colors hover:text-[var(--color-brand-red)]"
              >
                {settings?.email || 'hello@chasecreative.co'}
              </a>
            </div>

            <div className=" rounded-sm border-l-4 border-[var(--color-brand-red)] bg-[var(--color-brand-warm)] p-8">
              <h4 className="font-display mb-4 text-xl font-bold text-[var(--color-brand-dark)]">
                Chase Creative Marketing Network
              </h4>
              <div className="text-sm leading-relaxed text-[var(--color-brand-charcoal)] prose prose-sm max-w-none">
                {settings?.networkBlurb ? (
                  <CustomPortableText value={settings.networkBlurb} />
                ) : (
                  <p>Need more than just words? I work with a collective of top-tier designers, developers, and strategists. If your project needs more muscle, I have the right people in mind.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <ReCaptchaWrapper>
            <ContactForm />
          </ReCaptchaWrapper>
        </div>
      </div>
    </div>
  )
}
