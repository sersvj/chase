'use client'

import { useReducedMotion, Variants } from 'framer-motion'

/**
 * Returns Framer Motion animation variants that respect prefers-reduced-motion.
 * When the user prefers reduced motion, all animations are replaced with
 * instant opacity-only transitions.
 */
export function useMotionVariants() {
  const prefersReduced = useReducedMotion()

  const fadeUp: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.15 : 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0.15 : 0.4,
        ease: 'easeOut',
      },
    },
  }

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const pageTransition: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.15 : 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: prefersReduced
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -8,
          transition: { duration: 0.2, ease: 'easeIn' },
        },
  }

  return { fadeUp, fadeIn, staggerContainer, pageTransition }
}
