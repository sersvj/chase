'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'

interface MoonLogoProps {
  className?: string
  size?: number
  /** Whether to show the animated wordmark PNG alongside the moon. Defaults to true. */
  showWordmark?: boolean
  /** Override the wordmark image path. Defaults to the standard dark wordmark. */
  wordmarkSrc?: string
}

/**
 * Animated logo component — full two-part reveal:
 * 1. Coral circle morphs into a waning crescent moon (SVG mask technique)
 * 2. Type-only logo PNG fades + slides in to the right
 *
 * SVG mask used for background-agnostic, fringe-free compositing.
 */
export default function MoonLogo({ className = '', size = 40, showWordmark = true, wordmarkSrc = '/assets/ccc-logo-type.png' }: MoonLogoProps) {
  const prefersReducedMotion = useReducedMotion()

  const punchStart = 80  // starts well off the right edge of the viewbox
  const punchEnd = 32    // final resting position (higher = thicker crescent)
  const punchR = 20      // oversized so no coral bleed at right edge

  // Moon animation duration + delay = total time before wordmark appears
  const moonDuration = 1.2
  const moonDelay = 0.4
  // Wait for the moon to fully finish before the wordmark appears
  const wordmarkDelay = moonDelay + moonDuration + 0.1

  return (
    <div className={`flex items-center ${className}`}>
      {/* Part 1: Animated SVG Moon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        <defs>
          <mask id="moon-mask">
            <circle cx="20" cy="20" r="18" fill="white" />
            <motion.circle
              cx={punchStart}
              cy="20"
              r={punchR}
              fill="black"
              initial={{ cx: punchStart }}
              animate={{ cx: punchEnd }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: moonDuration,
                      delay: moonDelay,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            />
          </mask>
        </defs>
        <circle cx="20" cy="20" r="18" fill="#D94F3D" mask="url(#moon-mask)" />
      </svg>

      {/* Part 2: Wordmark PNG — fades in only after moon animation fully completes */}
      {showWordmark && (
        <motion.div
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: prefersReducedMotion ? 0 : wordmarkDelay,
            ease: 'easeOut',
          }}
          className="shrink-0"
        >
          <Image
            src={wordmarkSrc}
            alt="Chase Creative"
            height={size * 0.55}
            width={size * 4.2}
            className="w-auto object-contain"
            style={{ height: `${size * 0.55}px` }}
            priority
          />
        </motion.div>
      )}
    </div>
  )
}
