import { getWorkSamples, getSiteSettings } from '@/lib/queries'
import SectionHeading from '@/components/ui/SectionHeading'
import WorkListing from '@/components/work/WorkListing'
import { urlFor } from '@/lib/sanity'
import type { WorkSample } from '@/types/sanity'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings?.seoWork

  return {
    title: seo?.title || 'Portfolio',
    description: seo?.description,
    openGraph: {
      title: seo?.title || 'Portfolio',
      description: seo?.description,
      images: seo?.image ? [urlFor(seo.image).width(1200).height(630).url()] : [],
    },
  }
}

export const revalidate = 60

export default async function WorkPage() {
  const allWork: WorkSample[] = await getWorkSamples()

  return (
    <div className="container-site py-20 lg:py-32">
      <SectionHeading 
        title="Recent Projects" 
        subtitle="My Portfolio"
      />

      <WorkListing initialWork={allWork} />
    </div>
  )
}
