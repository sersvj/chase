import SkeletonCard, { SkeletonGrid } from '@/components/ui/SkeletonCard'
import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="container-site py-20 lg:py-32">
      {/* Skeleton Title */}
      <div className="mb-12 h-12 w-48 animate-pulse rounded-sm bg-[var(--color-brand-muted)]/10" />
      
      {/* Skeleton Grid */}
      <SkeletonGrid count={6} />
    </div>
  )
}
