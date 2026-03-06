'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import type { WorkSample } from '@/types/sanity'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'

interface WorkCardProps {
  work: WorkSample
}

export default function WorkCard({ work }: WorkCardProps) {
  const hasImage = !!work.featuredImage
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useTransform(y, [0, 1], [2, -2])
  const rotateY = useTransform(x, [0, 1], [-3, 3])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseLeave() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? {} : { rotateX, rotateY, transformPerspective: 800 }}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 150, damping: 30 }}
      className="h-full"
    >
      <Link 
        href={`/work/${work.slug.current}`} 
        className="group flex h-full flex-col border-2 border-[var(--color-brand-charcoal)] bg-white transition-all duration-500 hover:border-[var(--color-brand-red)] hover:shadow-[8px_8px_0px_var(--color-brand-red-muted,rgba(210,47,37,0.1))] outline-none"
        draggable={false}
      >
        {/* Media Half - Shown only if there is a featured image */}
        {hasImage && (
          <div className="relative aspect-[3/2] w-full overflow-hidden border-b-2 border-[var(--color-brand-charcoal)] transition-colors duration-500 group-hover:border-[var(--color-brand-red)]">
            <Image
              src={urlFor(work.featuredImage!).width(800).height(533).url()}
              alt={work.featuredImage!.alt || work.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              draggable={false}
            />
            
            {/* Category Badge - Minimalist Tag */}
            <div className="absolute right-4 top-4 z-20 bg-[var(--color-brand-dark)] px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white">
              {work.category === 'blog-content' ? 'Article Content' : work.category.replace('-', ' ')}
            </div>
          </div>
        )}

        {/* Content Half */}
        <div className="flex flex-1 flex-col p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              {!hasImage && (
                <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-brand-red)]">
                  {work.category === 'blog-content' ? 'Article Content' : work.category.replace('-', ' ')}
                </span>
              )}
              <h3 className="font-display text-xl font-bold leading-tight text-[var(--color-brand-dark)] transition-colors duration-300 group-hover:text-[var(--color-brand-red)] md:text-2xl">
                {work.title}
              </h3>
            </div>
          </div>
          
          <p className={`mt-4 flex-1 text-sm leading-relaxed text-[var(--color-brand-charcoal)] opacity-80 ${hasImage ? 'line-clamp-3' : 'line-clamp-6'}`}>
            {work.summary}
          </p>
          
          <div className="mt-8 flex items-center gap-2">
            <div className="h-[2px] w-8 bg-[var(--color-brand-red)] transition-all duration-500 group-hover:w-12" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-brand-dark)]">
              Explore Project
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

