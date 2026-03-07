'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MoonLogo from '@/components/ui/MoonLogo'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'
import type { SocialLinks } from '@/types/sanity'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header({ 
  siteTitle, 
  socialLinks 
}: { 
  siteTitle?: string,
  socialLinks?: SocialLinks 
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const socialPlatforms = [
    {
      id: 'instagram',
      url: socialLinks?.instagram,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      url: socialLinks?.linkedin,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      id: 'facebook',
      url: socialLinks?.facebook,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: 'twitter',
      url: socialLinks?.twitter,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.06a4.923 4.923 0 0 0 3.946 4.84 4.996 4.996 0 0 1-2.212.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0 0 24 4.59z" />
        </svg>
      ),
    },
  ].filter(p => !!p.url)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-brand-white)]/95 shadow-sm backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <ScrollProgressBar />
        <div className="container-site flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className={`z-[60] flex items-center transition-opacity duration-300 focus-visible:outline-none ${
              menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label={`${siteTitle || 'Chase Creative'} — Home`}
          >
            <MoonLogo size={38} />
          </Link>

          {/* Desktop Navigation - Hidden below lg breakpoint to prevent overlap */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8" role="list">
              {navLinks.map(({ label, href }) => {
                const isActive = pathname === href || pathname.startsWith(href + '/')
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative text-sm font-medium tracking-wide transition-colors duration-200 hover:text-[var(--color-brand-red)] ${
                        isActive
                          ? 'text-[var(--color-brand-red)]'
                          : 'text-[var(--color-brand-dark)]'
                      }`}
                    >
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[var(--color-brand-red)]"
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Link
            href="/contact"
            className="hidden rounded-sm bg-[var(--color-brand-red)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-[var(--color-brand-red-dark)] hover:shadow-[var(--shadow-btn)] lg:block"
          >
            Let&apos;s Chat
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="z-[60] flex h-10 w-10 items-center justify-center rounded-sm text-[var(--color-brand-dark)] transition-colors hover:text-[var(--color-brand-red)] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <div className={`relative flex h-full w-full flex-col items-center justify-center transition-all ${menuOpen ? 'gap-0' : 'gap-1.5'}`}>
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 1 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-current origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block h-0.5 w-6 bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -1 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 bg-current origin-center"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Enhanced Off-canvas Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[55] bg-[var(--color-brand-dark)]/40 backdrop-blur-md lg:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              id="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col shadow-2xl lg:hidden h-[100svh]"
              style={{ backgroundColor: 'var(--color-brand-white)' }}
            >
              {/* Top Branding & Close Area */}
              <div className="flex h-16 items-center justify-between px-8 md:h-20">
                <MoonLogo size={32} showWordmark={false} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-sm text-[var(--color-brand-dark)] transition-colors hover:text-[var(--color-brand-red)]"
                  aria-label="Close navigation menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex flex-1 flex-col justify-between overflow-y-auto px-8 pb-8 pt-2">
                <nav aria-label="Mobile navigation">
                  <ul className="flex flex-col gap-0.5" role="list">
                    {navLinks.map(({ label, href }, index) => {
                      const isActive = pathname === href || pathname.startsWith(href + '/')
                      return (
                        <motion.li
                          key={href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          <Link
                            href={href}
                            className={`group flex items-center justify-between py-2 text-2xl font-bold tracking-tight transition-all ${
                              isActive
                                ? 'text-[var(--color-brand-red)]'
                                : 'text-[var(--color-brand-dark)] hover:pl-2'
                            }`}
                          >
                            {label}
                            {!isActive && (
                              <motion.span 
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                className="text-[var(--color-brand-red)]"
                              >
                                →
                              </motion.span>
                            )}
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 space-y-6"
                >
                  <Link
                    href="/contact"
                    className="block w-full rounded-sm bg-[var(--color-brand-red)] py-4 text-center text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
                  >
                    Let&apos;s Chat
                  </Link>

                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--color-brand-dark)] opacity-40">
                      Connect
                    </p>
                    <div className="flex items-center gap-6">
                      {socialPlatforms.map((p) => (
                        <a
                          key={p.id}
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--color-brand-dark)] transition-colors hover:text-[var(--color-brand-red)]"
                        >
                          {p.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </>
        )}
      </AnimatePresence>
    </>
  )
}
