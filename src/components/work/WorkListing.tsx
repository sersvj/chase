'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import WorkCard from '@/components/ui/WorkCard'
import type { WorkSample, WorkCategory } from '@/types/sanity'

interface WorkListingProps {
  initialWork: WorkSample[]
}

const categories: { label: string; value: WorkCategory | 'all' }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Brand Messaging', value: 'brand-messaging' },
  { label: 'Website Copy', value: 'website-copy' },
  { label: 'Article Content', value: 'blog-content' },
  { label: 'Social Media', value: 'social-media' },
  { label: 'Email Campaigns', value: 'email' },
]

function WorkListingContent({ initialWork }: WorkListingProps) {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<WorkCategory | 'all'>('all')

  useEffect(() => {
    const category = searchParams.get('category') as WorkCategory | null
    if (category && categories.some(cat => cat.value === category)) {
      setActiveCategory(category)
      // Scroll to top of filters when deep-linked
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [searchParams])

  const filteredWork = activeCategory === 'all' 
    ? initialWork 
    : initialWork.filter(work => work.category === activeCategory)

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`
              rounded-full px-6 py-2 text-sm font-bold transition-all duration-300 cursor-pointer
              ${activeCategory === cat.value 
                ? 'bg-[var(--color-brand-red)] text-white shadow-md' 
                : 'bg-[var(--color-brand-warm)] text-[var(--color-brand-charcoal)] hover:bg-[var(--color-brand-warm-dark)]'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredWork.map((work, index) => {
            // Asymmetric layout logic for 12-col grid
            const getColSpan = (i: number) => {
              const pattern = i % 4
              if (pattern === 0) return 'lg:col-span-7' 
              if (pattern === 1) return 'lg:col-span-5'
              if (pattern === 2) return 'lg:col-span-5'
              return 'lg:col-span-7'
            }

            return (
              <motion.div
                key={work._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`col-span-1 ${getColSpan(index)}`}
              >
                <WorkCard work={work} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredWork.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center text-[var(--color-brand-muted)]"
        >
          <p>No projects found in this category yet. Check back soon!</p>
        </motion.div>
      )}
    </div>
  )
}

export default function WorkListing(props: WorkListingProps) {
  return (
    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading portfolio...</div>}>
      <WorkListingContent {...props} />
    </Suspense>
  )
}
