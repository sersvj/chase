'use client'

import { useEffect } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="container-site flex flex-col items-center justify-center py-32 text-center lg:py-48">
      <SectionHeading 
        title="Something went wrong." 
        subtitle="System Error"
        centered
      />
      <p className="max-w-md mx-auto mb-10 text-[var(--color-brand-charcoal)] opacity-80">
        An unexpected error occurred. We&apos;ve been notified and are looking into it.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={() => reset()}
          className="inline-block rounded-sm border-2 border-[var(--color-brand-charcoal)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[var(--color-brand-dark)] transition-all hover:bg-[var(--color-brand-dark)] hover:text-white"
        >
          Try Again
        </button>
        <a
          href="/"
          className="inline-block rounded-sm bg-[var(--color-brand-red)] px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[var(--color-brand-red-dark)]"
        >
          Return Home
        </a>
      </div>
    </div>
  )
}
