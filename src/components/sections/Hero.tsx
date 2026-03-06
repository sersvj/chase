'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMotionVariants } from '@/hooks/useMotionVariants'
import { useReducedMotion } from 'framer-motion'
import WordSearchPanel from '@/components/ui/WordSearchPanel'

const HEADLINE_WORDS = ['Copywriter.', 'Optimist.', 'Brand Builder.']

export default function Hero() {
  const { fadeUp, staggerContainer } = useMotionVariants()
  const prefersReducedMotion = useReducedMotion()

  const wordVariants = {
    hidden: prefersReducedMotion 
      ? { opacity: 0 } 
      : { opacity: 0, y: 8, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: prefersReducedMotion ? 0.15 : 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  const wordStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-[var(--color-brand-warm)] py-20 lg:py-28">
      <div 
        className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--color-brand-red)]/5 blur-3xl" 
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="z-0"
      >
        <WordSearchPanel />
      </motion.div>
      
      <div className="container-site relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-charcoal)]"
          >
            Available for Bookings
          </motion.p>

          <motion.h1
            variants={wordStagger}
            initial="hidden"
            animate="visible"
            className="font-display mb-8 text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--color-brand-dark)] sm:text-6xl lg:text-7xl"
            style={{ perspective: 800 }}
            aria-label="Copywriter. Optimist. Brand Builder."
          >
            {HEADLINE_WORDS.map((word) => (
              <motion.span
                key={word}
                variants={wordVariants}
                className="block"
                style={{ display: 'block', transformOrigin: 'bottom center' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-lg text-lg leading-relaxed text-[var(--color-brand-charcoal)] sm:text-xl"
          >
            Digital marketer, skilled in producing attention-grabbing content. 
            Versatile writer with fast-paced agency experience based in Downtown Wilmington, North Carolina.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              href="/work"
              className="rounded-sm bg-[var(--color-brand-red)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-[var(--color-brand-red-dark)] hover:shadow-[var(--shadow-btn)] active:scale-95"
            >
              View My Work
            </Link>
            <Link
              href="/about"
              className="rounded-sm border-2 border-[var(--color-brand-dark)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[var(--color-brand-dark)] transition-all duration-200 hover:bg-[var(--color-brand-dark)] hover:text-white active:scale-95"
            >
              About Me
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


