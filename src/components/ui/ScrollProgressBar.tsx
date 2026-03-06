'use client'

import { useScroll, useSpring, motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

/**
 * A thin red progress bar that fills as the user scrolls down the page.
 * Uses useSpring for smooth, inertia-based feel.
 * Respects prefers-reduced-motion.
 */
export default function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 200,
    damping: prefersReducedMotion ? 50 : 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-[var(--color-brand-red)]"
      aria-hidden="true"
    />
  )
}
