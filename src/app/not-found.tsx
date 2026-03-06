'use client'

import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center justify-center py-32 text-center lg:py-48">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading 
          title="Page Not Found" 
          subtitle="404 Error"
          centered
        />
        <p className="max-w-md mx-auto mb-10 text-[var(--color-brand-charcoal)] opacity-80">
          The page you are looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block rounded-sm bg-[var(--color-brand-red)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[var(--color-brand-red-dark)] hover:shadow-[var(--shadow-btn)]"
        >
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  )
}
