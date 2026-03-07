'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { WorkSample } from '@/types/sanity'
import WorkCard from './WorkCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface WorkCarouselProps {
  workItems: WorkSample[]
}

export default function WorkCarousel({ workItems }: WorkCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [snapCount, setSnapCount] = useState(workItems.length)
  const [currentIndex, setCurrentIndex] = useState(0)

  const updatePager = (s: SwiperType) => {
    requestAnimationFrame(() => {
      setSnapCount(s.snapGrid?.length || 0)
      setCurrentIndex(s.snapIndex)
    })
  }

  return (
    <div className="relative w-full">
      {/* 
          The 'Bleed Container':
          - overflow-hidden on this wrapper clips the bleed area.
          - -mx-10 pulls it back so cards stay aligned with site content.
          - px-10 on the container (or Swiper) creates the "air gap" for hover scale/shadow.
          - !overflow-visible on Swiper is key.
      */}
      <div className="overflow-hidden -mx-10 px-10 py-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={32}
          slidesPerView={1}
          autoHeight={false}
          onInit={(s) => {
            setSwiper(s)
            updatePager(s)
          }}
          onSlideChange={(s) => setCurrentIndex(s.snapIndex)}
          onBreakpoint={(s) => updatePager(s)}
          onResize={(s) => updatePager(s)}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="!overflow-visible py-16" // py-16 ensures top/bottom hover room
        >
          {workItems.map((item) => (
            <SwiperSlide key={item._id} className="!h-auto !overflow-visible">
              <div className="h-full select-none">
                <WorkCard work={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Controls */}
      <div className="mt-2 flex items-center justify-center gap-8">
        <button
          onClick={() => swiper?.slidePrev()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--color-brand-dark)] transition-all hover:text-[var(--color-brand-red)] disabled:opacity-20"
          aria-label="Previous project"
          disabled={currentIndex === 0}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Custom Indicators */}
        <div className="flex gap-2 min-h-[6px]">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => swiper?.slideTo(swiper.snapGrid[index])}
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
          onClick={() => swiper?.slideNext()}
          className="flex h-10 w-10 cursor-pointer items-center justify-center text-[var(--color-brand-dark)] transition-all hover:text-[var(--color-brand-red)] disabled:opacity-20"
          aria-label="Next project"
          disabled={currentIndex >= snapCount - 1}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
