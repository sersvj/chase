import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import OrganizationSchema from '@/components/ui/OrganizationSchema'

import { getSiteSettings } from '@/lib/queries'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <>
      <Header siteTitle={settings?.siteTitle} />
      <main id="main-content" className="pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
      <OrganizationSchema />
    </>
  )
}
