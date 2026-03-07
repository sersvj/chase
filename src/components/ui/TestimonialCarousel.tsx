'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import type { Testimonial } from '@/types/sanity'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="relative mx-auto mt-16 max-w-4xl px-4 lg:mt-24">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        onSwiper={setSwiper}
        onSlideChange={(s) => setCurrentIndex(s.realIndex)}
        className="cursor-grab active:cursor-grabbing"
        autoHeight={true}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="relative select-none border-2 border-[var(--color-brand-charcoal)] bg-white p-10 text-center shadow-[8px_8px_0px_rgba(210,47,37,0.1)] md:p-16 lg:p-20">
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
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-8">
        <button
          onClick={() => swiper?.slidePrev()}
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
              onClick={() => swiper?.slideTo(index)}
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
          onClick={() => swiper?.slideNext()}
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
