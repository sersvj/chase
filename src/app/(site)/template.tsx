'use client'

import PageTransition from '@/components/ui/PageTransition'

/**
 * Next.js Templates re-mount on every navigation.
 * This is the ideal place for page transitions in the App Router
 * to ensure that Framer Motion's AnimatePresence always triggers.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>
}
