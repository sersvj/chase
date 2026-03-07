import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'
import MoonLogo from '@/components/ui/MoonLogo'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default async function Footer() {
  const settings = await getSiteSettings()
  const year = new Date().getFullYear()

  // Map Sanity social links to icons
  const socialPlatforms = [
    {
      id: 'instagram',
      label: 'Instagram',
      url: settings?.socialLinks?.instagram,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: settings?.socialLinks?.linkedin,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      id: 'facebook',
      label: 'Facebook',
      url: settings?.socialLinks?.facebook,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: 'twitter',
      label: 'Twitter',
      url: settings?.socialLinks?.twitter,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.84 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
        </svg>
      ),
    },
  ].filter(platform => !!platform.url)

  return (
    <footer className="bg-[var(--color-brand-dark)] text-[var(--color-brand-warm)]">
      <div className="container-site py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <MoonLogo size={34} wordmarkSrc="/assets/ccc-logo-type-light.svg" />
            <p className="max-w-xs text-sm leading-relaxed text-[var(--color-brand-warm)]/80">
              {settings?.tagline || 'Copywriter. Optimist. Brand Builder.'}
            </p>
            <p className="text-sm font-medium text-[var(--color-brand-warm)]/60">
              hello@chasecreative.co
            </p>
            <div className="flex gap-4 pt-1">
              {socialPlatforms.map(({ label, url, icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[var(--color-brand-warm)]/70 transition-colors duration-200 hover:text-[var(--color-brand-red)]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-warm)]/70">
              Navigation
            </p>
            <ul className="space-y-2.5" role="list">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-brand-warm)]/80 transition-colors duration-200 hover:text-[var(--color-brand-red)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-warm)]/70">
              Work Together
            </p>
            <p className="mb-5 text-sm leading-relaxed text-[var(--color-brand-warm)]/80">
              Available for projects. Let&apos;s talk about what we can build together.
            </p>
            <Link
              href="/contact"
              className="inline-block rounded-sm bg-[var(--color-brand-red)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[var(--color-brand-red-dark)] hover:shadow-[var(--shadow-btn)]"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-[var(--color-brand-warm)]/60">
          &copy; {year} {settings?.siteTitle || 'Chase Creative Co.'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

