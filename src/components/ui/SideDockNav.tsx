'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SideDockNavProps {
  href: string
  label: string
}

export default function SideDockNav({ href, label }: SideDockNavProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show after a slight delay for a premium entrance
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="absolute inset-y-0 left-6 z-40 hidden w-px lg:block xl:left-12"
        >
          <div className="sticky top-1/2 -translate-y-1/2">
            <Link
              href={href}
              className="group flex flex-col items-center gap-12"
            >
              {/* The Arrow Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-brand-warm-dark)] bg-white/50 text-[var(--color-brand-muted)] backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--color-brand-red)] group-hover:bg-[var(--color-brand-red)] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(210,47,37,0.2)]">
                <ArrowLeft size={20} />
              </div>

              {/* The Vertical Label */}
              <div className="relative h-40">
                <span 
                  className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-brand-muted)] transition-colors duration-300 [writing-mode:vertical-lr] group-hover:text-[var(--color-brand-dark)]"
                >
                  {label}
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
