'use client'

import { useReducedMotion, Variants } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * Returns Framer Motion animation variants that respect prefers-reduced-motion.
 * Includes mobile detection for adjusted delays and deference.
 */
export function useMotionVariants() {
  const prefersReduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const mobileDelay = isMobile ? 0.2 : 0

  const fadeUp: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.15 : 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: mobileDelay,
      },
    },
  }

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0.15 : 0.5,
        ease: 'easeOut',
        delay: mobileDelay,
      },
    },
  }

  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : isMobile ? 0.12 : 0.08,
        delayChildren: isMobile ? 0.25 : 0.1,
      },
    },
  }

  const pageTransition: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0.15 : 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        // No delay on page items itself to keep browsing snappy, 
        // but can add a tiny bit for impact if needed
      },
    },
    exit: prefersReduced
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -4,
          transition: { duration: 0.15, ease: 'easeIn' },
        },
  }

  return { fadeUp, fadeIn, staggerContainer, pageTransition, isMobile }
}
