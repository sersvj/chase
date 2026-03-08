'use client'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useMotionVariants } from '@/hooks/useMotionVariants'
import { useEffect } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { pageTransition } = useMotionVariants()

  // Ensure scroll is at top on navigation immediately
  useEffect(() => {
    window.scrollTo(0, 0)
    // Manually trigger a scroll event to wake up intersection observers/animations
    window.dispatchEvent(new Event('scroll'))
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
