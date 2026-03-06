export default function Loading() {
  return (
    <div className="container-site py-20 lg:py-32 text-center">
      {/* Skeleton Title */}
      <div className="mx-auto mb-12 h-12 w-64 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
      
      {/* Skeleton Grid */}
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4 rounded-sm bg-[var(--color-brand-warm)] p-8">
            <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--color-brand-muted)]/10" />
            <div className="h-6 w-3/4 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
            <div className="h-4 w-full animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
            <div className="h-4 w-5/6 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
