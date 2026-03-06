'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// Grid configuration
const COLS = 32
const ROWS = 27
const CELL_W = 28
const CELL_H = 30
const ALPHABET = 'ABCDEFGHIJKLMNOPRSTUVWXY'

const WORD_GROUPS: string[][] = [
  ['BRAND', 'VOICE', 'COPY', 'HOOK', 'STORY'],
  ['BRIEF', 'PITCH', 'TONE', 'DRAFT', 'WRITE'],
  ['CRAFT', 'WORDS', 'LEAD', 'IDEAS', 'EDIT'],
  ['BRAND', 'STORY', 'COPY', 'TONE', 'HOOK'],
]


interface PlacedWord { word: string; cells: [number, number][]; horizontal: boolean }
interface GridData   { grid: string[][]; placed: PlacedWord[] }
type Phase = 'entering' | 'circling' | 'holding' | 'scrambling'


function randomLetter() { return ALPHABET[Math.floor(Math.random() * ALPHABET.length)] }

function generateGrid(words: string[]): GridData {
  const grid: string[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, randomLetter))
  const placed: PlacedWord[] = []
  const occupied = new Map<string, string>()

  for (const word of words) {
    let success = false
    for (let attempt = 0; attempt < 500 && !success; attempt++) {
      const horizontal = Math.random() > 0.35
      const startRow = horizontal ? Math.floor(Math.random() * ROWS) : Math.floor(Math.random() * (ROWS - word.length + 1))
      const startCol = horizontal ? Math.floor(Math.random() * (COLS - word.length + 1)) : Math.floor(Math.random() * COLS)

      let valid = true
      const cells: [number, number][] = []
      for (let i = 0; i < word.length; i++) {
        const r = horizontal ? startRow : startRow + i
        const c = horizontal ? startCol + i : startCol
        const key = `${r},${c}`
        if (occupied.has(key) && occupied.get(key) !== word[i]) { valid = false; break }
        cells.push([r, c])
      }

      if (valid) {
        for (let i = 0; i < word.length; i++) {
          const r = horizontal ? startRow : startRow + i
          const c = horizontal ? startCol + i : startCol
          grid[r][c] = word[i]
          occupied.set(`${r},${c}`, word[i])
        }
        placed.push({ word, cells, horizontal })
        success = true
      }
    }
  }
  return { grid, placed }
}

/** SVG path for a rounded rect - required for Framer Motion pathLength animation. */
function sketchyRoundedRectPath(x: number, y: number, w: number, h: number, r: number, seed: number): string {
  const rx = Math.min(r, w / 2, h / 2)
  const jitter = (i: number) => { const n = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453; return (n - Math.floor(n) - 0.5) * 3.5 }
  const [j0, j1, j2, j3, j4, j5] = Array.from({ length: 6 }, (_, i) => jitter(i))
  return [`M ${x+rx+j0} ${y+j1}`,`H ${x+w-rx+j2}`,`A ${rx} ${rx} 0 0 1 ${x+w+j3} ${y+rx+j1}`,`V ${y+h-rx+j4}`,`A ${rx} ${rx} 0 0 1 ${x+w-rx+j2} ${y+h+j5}`,`H ${x+rx+j0}`,`A ${rx} ${rx} 0 0 1 ${x+j3} ${y+h-rx+j4}`,`V ${y+rx+j1}`,`A ${rx} ${rx} 0 0 1 ${x+rx+j0} ${y+j1}`,'Z'].join(' ')
}

function wordBounds(cells: [number, number][], horizontal: boolean) {
  const rows = cells.map(([r]) => r); const cols = cells.map(([, c]) => c); const pad = 5
  return { x: Math.min(...cols)*CELL_W-pad, y: Math.min(...rows)*CELL_H-pad, w: (Math.max(...cols)-Math.min(...cols)+1)*CELL_W+pad*2, h: (Math.max(...rows)-Math.min(...rows)+1)*CELL_H+pad*2, r: horizontal?(CELL_H/2+pad):8 }
}


interface CircleItem { word: string; cells: [number, number][]; horizontal: boolean; id: string }

export default function WordSearchPanel() {
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ALL animation state lives here — mutated directly, never causes React re-renders
  const stateRef = useRef({
    mounted:        false,
    phase:          'entering' as Phase,
    cycleIndex:     0,
    circleCount:    0,
    gridData:       null as GridData | null,
    displayGrid:    null as string[][] | null,
    enterStartMs:   0,            // performance.now() when entering phase began
  })

  // Only React state we need: the SVG circles (5 max, drives Framer Motion)
  const [circles, setCircles]         = useState<CircleItem[]>([])
  const [showCircles, setShowCircles] = useState(false)

  const timerRef    = useRef<ReturnType<typeof setTimeout>  | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const rafRef      = useRef<number | null>(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current)    clearTimeout(timerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  // Canvas RAF draw loop
  // Runs at ~60fps. Reads from stateRef — no React involvement per frame.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      const s = stateRef.current

      if (!s.mounted || !s.displayGrid) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Build highlighted set from current circleCount
      const highlighted = new Set<string>()
      if (s.phase !== 'scrambling' && s.phase !== 'entering' && s.gridData) {
        s.gridData.placed.slice(0, s.circleCount).forEach(pw =>
          pw.cells.forEach(([r, c]) => highlighted.add(`${r},${c}`))
        )
      }

      const now = performance.now()
      ctx.textAlign    = 'center'
      ctx.textBaseline = 'middle'

      s.displayGrid.forEach((row, r) => {
        row.forEach((letter, c) => {
          const isH = highlighted.has(`${r},${c}`)

          // Per-cell opacity — computed from elapsed time during entrance wave
          let alpha: number
          if (s.phase === 'scrambling') {
            alpha = 0.12
          } else if (s.phase === 'entering') {
            const waveDelayMs = Math.min((r + c) * 22, 1800)
            const elapsed     = now - s.enterStartMs - waveDelayMs
            alpha = Math.max(0, Math.min(1, elapsed / 200))
          } else {
            alpha = 1
          }

          ctx.globalAlpha = alpha
          ctx.fillStyle   = isH ? '#D94F3D' : 'rgba(44, 38, 30, 0.30)'
          ctx.font        = `${isH ? 700 : 500} 13px ui-monospace, monospace`
          ctx.fillText(letter, c * CELL_W + CELL_W / 2, r * CELL_H + CELL_H / 2)
        })
      })

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, []) // Empty deps: runs once, reads stateRef on every frame


  // Drives animation via timeouts that mutate stateRef directly.
  const runPhase = useCallback((phase: Phase, cycleIndex: number, gridData: GridData) => {
    clearTimers()
    stateRef.current.phase      = phase
    stateRef.current.cycleIndex = cycleIndex
    stateRef.current.gridData   = gridData

    if (phase === 'entering') {
      stateRef.current.circleCount  = 0
      stateRef.current.enterStartMs = performance.now()
      setShowCircles(false)
      setCircles([])
      // Entrance wave takes ~2s, then a short pause before circling
      timerRef.current = setTimeout(() => runPhase('circling', cycleIndex, gridData), 2900)
    }

    else if (phase === 'circling') {
      setShowCircles(true)
      let idx = 0
      const revealNext = () => {
        idx++
        stateRef.current.circleCount = idx
        setCircles(gridData.placed.slice(0, idx).map(pw => ({
          ...pw, id: `${cycleIndex}-${pw.word}`,
        })))
        if (idx < gridData.placed.length) {
          timerRef.current = setTimeout(revealNext, 750)
        } else {
          timerRef.current = setTimeout(() => runPhase('holding', cycleIndex, gridData), 750)
        }
      }
      timerRef.current = setTimeout(revealNext, 400)
    }

    else if (phase === 'holding') {
      timerRef.current = setTimeout(() => runPhase('scrambling', cycleIndex, gridData), 2400)
    }

    else if (phase === 'scrambling') {
      setShowCircles(false)
      let count = 0
      const nextCycle = (cycleIndex + 1) % WORD_GROUPS.length
      const nextData  = generateGrid(WORD_GROUPS[nextCycle])

      intervalRef.current = setInterval(() => {
        count++
        if (count < 18) {
          // Mutate displayGrid directly — no setState, no React reconciliation
          stateRef.current.displayGrid = Array.from(
            { length: ROWS }, () => Array.from({ length: COLS }, randomLetter)
          )
        } else {
          clearTimers()
          stateRef.current.displayGrid = nextData.grid
          runPhase('entering', nextCycle, nextData)
        }
      }, 70)
    }
  }, [clearTimers])

  // Deferred init (1.4s) - lets hero animations finish first
  useEffect(() => {
    const t = setTimeout(() => {
      const data = generateGrid(WORD_GROUPS[0])
      stateRef.current.displayGrid = data.grid
      stateRef.current.gridData    = data
      stateRef.current.mounted     = true
      runPhase('entering', 0, data)
    }, 1400)
    return () => { clearTimeout(t); clearTimers() }
  }, [runPhase, clearTimers])

  // Don't render anything for reduced-motion users (purely decorative)
  if (prefersReducedMotion) return null

  const SVG_W = COLS * CELL_W
  const SVG_H = ROWS * CELL_H

  return (
    <div
      className="absolute inset-y-0 right-0 hidden lg:block overflow-hidden"
      style={{ width: '72%', contain: 'layout style paint' }}
      aria-hidden="true"
    >
      {/* Left-to-right fade: solid brand-warm → transparent at midpoint */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--color-brand-warm) 0%, var(--color-brand-warm) 5%, transparent 42%)' }}
      />

      <div className="absolute top-0 right-0" style={{ width: SVG_W, height: SVG_H }}>

        <canvas ref={canvasRef} width={SVG_W} height={SVG_H} style={{ display: 'block' }} />

        <svg
          width={SVG_W}
          height={SVG_H}
          className="pointer-events-none absolute inset-0"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="sketch-filter" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.025 0.03" numOctaves="4" seed="42" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          <AnimatePresence>
            {showCircles && circles.map((pw, idx) => {
              const b = wordBounds(pw.cells, pw.horizontal)
              const d = sketchyRoundedRectPath(b.x, b.y, b.w, b.h, b.r, stateRef.current.cycleIndex * 31 + idx)
              return (
                <motion.path
                  key={pw.id}
                  d={d}
                  fill="rgba(210, 47, 37, 0.06)"
                  stroke="var(--color-brand-red)"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#sketch-filter)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{
                    pathLength: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
                    opacity:    { duration: 0.15 },
                  }}
                />
              )
            })}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  )
}
