export default function Loading() {
  return (
    <div className="container-site py-20 lg:py-32">
      <div className="mb-12 h-12 w-64 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
      
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-video w-full animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
            <div className="h-4 w-1/4 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
            <div className="h-6 w-3/4 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
            <div className="h-4 w-full animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
          </div>
        ))}
      </div>
    </div>
  )
}
