export default function Loading() {
  return (
    <div className="container-site py-20 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 h-4 w-24 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
        <div className="mb-6 h-12 w-full animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
        <div className="mb-12 h-24 w-3/4 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
        
        <div className="mb-16 aspect-video w-full animate-pulse rounded-[var(--radius-card)] bg-[var(--color-brand-warm)] shadow-sm" />
        
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="h-4 w-full animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
          <div className="h-4 w-full animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
          <div className="h-4 w-5/6 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
        </div>
      </div>
    </div>
  )
}
