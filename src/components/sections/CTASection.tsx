'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface CTASectionProps {
  title?: string
  description?: string
  buttonText?: string
  href?: string
}

export default function CTASection({
  title = "Ready to elevate your brand's voice?",
  description = "Whether you need a complete brand overhaul or targeted copy for your next campaign, I'm here to help you tell your story.",
  buttonText = "Let's Work Together",
  href = "/contact"
}: CTASectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24 rounded-sm border-2 border-[var(--color-brand-charcoal)] bg-[var(--color-brand-warm)] p-12 text-center text-[var(--color-brand-dark)] sm:p-20 shadow-[8px_8px_0px_var(--color-brand-red-muted,rgba(210,47,37,0.1))]"
    >
      <h2 className="font-display mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-lg text-[var(--color-brand-charcoal)] opacity-80">
        {description}
      </p>
      <Link 
        href={href} 
        className="inline-block rounded-sm bg-[var(--color-brand-red)] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[var(--color-brand-red-dark)] active:scale-95 shadow-md"
      >
        {buttonText}
      </Link>
    </motion.div>
  )
}
