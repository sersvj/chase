'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Testimonial } from '@/types/sanity'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1 === testimonials.length ? 0 : prev + 1))
  }, [testimonials.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }, [testimonials.length])

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    const swipeThreshold = 50

    if (offset < -swipeThreshold || velocity < -500) {
      nextSlide()
    } else if (offset > swipeThreshold || velocity > 500) {
      prevSlide()
    }
  }

  const t = testimonials[currentIndex]

  return (
    <div className="relative mx-auto mt-16 max-w-4xl px-4 lg:mt-24">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0, y: direction > 0 ? 12 : -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -12 : 12 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="cursor-grab active:cursor-grabbing"
        >
          <div className="relative select-none border-2 border-[var(--color-brand-charcoal)] bg-white p-10 text-center shadow-[8px_8px_0px_rgba(210,47,37,0.1)] md:p-16 lg:p-20">
            {/* Quotation mark decoration */}
            <div className="absolute -top-6 -left-4 select-none font-display text-8xl text-[var(--color-brand-red)] opacity-10" aria-hidden="true">
              &ldquo;
            </div>

            <p className="font-display mb-10 text-xl font-medium italic leading-relaxed text-[var(--color-brand-dark)] md:text-2xl lg:text-3xl">
              {t.quote}
            </p>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-brand-red)]">
                {t.author}
              </p>
              {t.title && (
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-dark)] opacity-40">
                  {t.title}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-8">
        <button
          onClick={prevSlide}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--color-brand-dark)] transition-all hover:text-[var(--color-brand-red)]"
          aria-label="Previous testimonial"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`h-1.5 cursor-pointer transition-all duration-500 ${
                index === currentIndex
                  ? 'w-10 bg-[var(--color-brand-red)]'
                  : 'w-2 bg-[var(--color-brand-warm-dark)] hover:bg-[var(--color-brand-muted)]'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--color-brand-dark)] transition-all hover:text-[var(--color-brand-red)]"
          aria-label="Next testimonial"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
