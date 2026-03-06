'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MoonLogo from '@/components/ui/MoonLogo'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Header({ siteTitle }: { siteTitle?: string }) {
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

  return (
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
          className="flex items-center focus-visible:outline-none"
          aria-label={`${siteTitle || 'Chase Creative'} — Home`}
        >
          <MoonLogo size={38} />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8" role="list">
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
          className="hidden rounded-sm bg-[var(--color-brand-red)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-[var(--color-brand-red-dark)] hover:shadow-[var(--shadow-btn)] md:block"
        >
          Let&apos;s Chat
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-sm text-[var(--color-brand-dark)] transition-colors hover:text-[var(--color-brand-red)] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <motion.div
            animate={menuOpen ? 'open' : 'closed'}
            className="flex flex-col gap-1.5"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 8 },
              }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-6 bg-current"
            />
            <motion.span
              variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              transition={{ duration: 0.15 }}
              className="block h-0.5 w-6 bg-current"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -8 },
              }}
              transition={{ duration: 0.2 }}
              className="block h-0.5 w-6 bg-current"
            />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="border-t border-[var(--color-brand-warm-dark)] bg-[var(--color-brand-white)] pb-6 md:hidden"
          >
            <nav aria-label="Mobile navigation">
              <ul className="container-site flex flex-col gap-1 pt-4" role="list">
                {navLinks.map(({ label, href }) => {
                  const isActive = pathname === href || pathname.startsWith(href + '/')
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`block py-2.5 text-base font-medium transition-colors ${
                          isActive
                            ? 'text-[var(--color-brand-red)]'
                            : 'text-[var(--color-brand-dark)] hover:text-[var(--color-brand-red)]'
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
                <li className="mt-4">
                  <Link
                    href="/contact"
                    className="inline-block rounded-sm bg-[var(--color-brand-red)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-brand-red-dark)]"
                  >
                    Let&apos;s Chat
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
