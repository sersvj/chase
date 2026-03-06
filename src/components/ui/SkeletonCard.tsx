/**
 * SkeletonCard — loading placeholder for content cards.
 * Use in loading.tsx route segments for async Sanity content.
 */
export default function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-brand-warm-dark)] ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {/* Image area */}
      <div className="aspect-[4/3] w-full bg-[var(--color-brand-warm-dark)] brightness-95" />
      {/* Content area */}
      <div className="space-y-3 p-5">
        <div className="h-3 w-16 rounded bg-[var(--color-brand-muted)]/20" />
        <div className="h-5 w-3/4 rounded bg-[var(--color-brand-muted)]/30" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-[var(--color-brand-muted)]/20" />
          <div className="h-3 w-5/6 rounded bg-[var(--color-brand-muted)]/20" />
        </div>
      </div>
    </div>
  )
}

/**
 * SkeletonGrid — renders N skeleton cards in a responsive grid.
 */
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
