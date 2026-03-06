import { getSiteSettings } from '@/lib/queries'
import JsonLd from '@/components/ui/JsonLd'
import { getBaseUrl } from '@/lib/site'

/**
 * Helper component that fetches site settings and renders 
 * the 'Person' and 'ProfessionalService' schema for the homepage.
 */
export default async function OrganizationSchema() {
  const settings = await getSiteSettings()
  const baseUrl = getBaseUrl()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Chase Creative Co.',
    founder: {
      '@type': 'Person',
      name: 'Jacqueline Chase',
    },
    url: baseUrl,
    description: settings?.bio ? 'Chase Creative Co. offers professional copywriting and brand strategy services.' : '',
    sameAs: settings?.socialLinks 
      ? Object.values(settings.socialLinks).filter(url => !!url) 
      : [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Wilmington',
      addressRegion: 'NC',
    },
  }

  return <JsonLd data={schema} />
}
