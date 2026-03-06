'use client'

import { motion } from 'framer-motion'
import { useMotionVariants } from '@/hooks/useMotionVariants'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  const { fadeUp } = useMotionVariants()

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-red)]">
          {subtitle}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl ${
          light ? 'text-[var(--color-brand-warm)]' : 'text-[var(--color-brand-dark)]'
        }`}
      >
        {title}
      </h2>
      {centered && (
        <div className="mx-auto mt-6 h-1 w-12 bg-[var(--color-brand-red)]" aria-hidden="true" />
      )}
    </motion.div>
  )
}
