'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WorkSample } from '@/types/sanity'
import WorkCard from './WorkCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface WorkCarouselProps {
  workItems: WorkSample[]
}

export default function WorkCarousel({ workItems }: WorkCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  // Responsive items to show
  // We'll use a simple state-less approach first, or let CSS handle the width 
  // and Framer handle the "page" index.
  // Actually, for a "3 at a time" desktop view, we can slide by 1 or by 3.
  // User wants "3 visible on desktop down to 1 on mobile".
  
  const totalItems = workItems.length
  
  // Responsive items visible count
  const [itemsVisible, setItemsVisible] = useState(3) // Default to desktop view
  const [mounted, setMounted] = useState(false)

  // Actual count of steps we can take
  const maxIndex = Math.max(0, totalItems - itemsVisible)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Update itemsVisible on mount/resize — correctly using useEffect
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth >= 1024) setItemsVisible(3)
      else if (window.innerWidth >= 640) setItemsVisible(2)
      else setItemsVisible(1)
    }
    updateCount()
    setMounted(true)
    window.addEventListener('resize', updateCount)
    return () => window.removeEventListener('resize', updateCount)
  }, [])

  const handleDragEnd = (event: any, info: any) => {
    const offset = info.offset.x
    const velocity = info.velocity.x
    const swipeThreshold = 50

    if (offset < -swipeThreshold || velocity < -500) {
      if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1)
    } else if (offset > swipeThreshold || velocity > 500) {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1)
    }
    
    // Brief delay to prevent clicks after drag
    setTimeout(() => setIsDragging(false), 50)
  }

  return (
    <div className="group relative w-full pt-4 pb-12">
      {/* Carousel Container - Exact width of parent */}
      <div className="relative overflow-visible sm:overflow-hidden">
        <motion.div 
          className="flex cursor-grab py-8 active:cursor-grabbing touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{ 
            x: `-${currentIndex * (100 / itemsVisible)}%`
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        >
          {workItems.map((item) => (
            <div 
              key={item._id} 
              className="w-full shrink-0 px-2 sm:w-1/2 sm:px-3 lg:w-1/3 lg:px-4"
              onClickCapture={(e) => {
                // If we're dragging, prevent the link from firing
                if (isDragging) {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }}
            >
              <div className="h-full select-none pointer-events-auto">
                <WorkCard work={item} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls - Matching TestimonialCarousel style */}
      <div className="mt-12 flex items-center justify-center gap-8">
        <button
          onClick={prevSlide}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--color-brand-dark)] transition-all hover:text-[var(--color-brand-red)]"
          aria-label="Previous project"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Indicators — Only render after client mount to prevent legacy hydration mismatch */}
        <div className="flex gap-2 min-h-[6px]">
          {mounted && Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 cursor-pointer transition-all duration-500 ${
                index === currentIndex
                  ? 'w-10 bg-[var(--color-brand-red)]'
                  : 'w-2 bg-[var(--color-brand-warm-dark)] hover:bg-[var(--color-brand-muted)]'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--color-brand-dark)] transition-all hover:text-[var(--color-brand-red)]"
          aria-label="Next project"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
