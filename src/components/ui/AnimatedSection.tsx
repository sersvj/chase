'use client'

import { motion } from 'framer-motion'
import { useMotionVariants } from '@/hooks/useMotionVariants'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  /** Delay before children start animating. Default 0. */
  delay?: number
}

/**
 * Wraps any content in a scroll-triggered fade-up animation.
 * Works as a client component wrapper around server-rendered children.
 * Respects prefers-reduced-motion via useMotionVariants.
 */
export function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const { fadeUp } = useMotionVariants()

  return (
    <motion.div
      variants={{
        ...fadeUp,
        visible: {
          ...fadeUp.visible,
          transition: {
            ...(fadeUp.visible as { transition?: object }).transition,
            delay,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedGridProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay between children. Default 0.08s */
  stagger?: number
}

/**
 * Wraps a grid of items and staggers their fade-up entrance on scroll.
 */
export function AnimatedGrid({ children, className = '', stagger = 0.08 }: AnimatedGridProps) {
  const { fadeUp } = useMotionVariants()

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.05,
      },
    },
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div key={i} variants={fadeUp}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={fadeUp}>{children}</motion.div>
      )}
    </motion.div>
  )
}
