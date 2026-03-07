'use client'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useMotionVariants } from '@/hooks/useMotionVariants'
import { useEffect } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { pageTransition } = useMotionVariants()

  // Ensure scroll is at top on navigation
  // We use a small timeout to let the exit animation start before jumping
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageTransition}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  )
}
