import { motion } from 'framer-motion'
import type { Service } from '@/types/sanity'
import * as Icons from 'lucide-react'
import Link from 'next/link'

interface ServiceCardProps {
  service: Service
  variant?: 'light' | 'dark'
}

export default function ServiceCard({ service, variant = 'light' }: ServiceCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent = (Icons as any)[service.icon || 'Sparkles'] || Icons.Sparkles

  const isDark = variant === 'dark'

  return (
    <Link 
      href={`/work?category=${service.categories?.[0] || 'all'}`}
      className={`group relative flex flex-col h-full rounded-[var(--radius-card)] p-8 transition-all duration-300 hover:-translate-y-1 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] ${
        isDark 
          ? 'bg-[var(--color-brand-dark)] border border-white/5 text-white' 
          : 'bg-white border border-[var(--color-brand-warm-dark)] text-[var(--color-brand-dark)]'
      }`}
    >
      {/* Icon Area */}
      <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-sm transition-all duration-300 ${
        isDark
          ? 'bg-white/10 text-[var(--color-brand-red)] group-hover:bg-[var(--color-brand-red)] group-hover:text-white'
          : 'bg-[var(--color-brand-warm)] text-[var(--color-brand-red)] group-hover:bg-[var(--color-brand-red)] group-hover:text-white'
      }`}>
        <IconComponent size={28} strokeWidth={1.5} />
      </div>
      
      {/* Content */}
      <h3 className={`font-display mb-4 text-xl font-bold md:text-2xl ${
        isDark ? 'text-white' : 'text-[var(--color-brand-dark)]'
      }`}>
        {service.title}
      </h3>
      <p className={`text-sm leading-relaxed ${
        isDark ? 'text-white/70' : 'text-[var(--color-brand-charcoal)]'
      }`}>
        {service.description}
      </p>

      {/* Deep Link CTA */}
      <div className={`mt-auto pt-6 flex items-center text-[10px] font-bold uppercase tracking-widest transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${
        isDark ? 'text-white' : 'text-[var(--color-brand-red)]'
      }`}>
        View Relevant Work
        <Icons.ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      {/* Decorative Accent */}
      <div 
        className="absolute bottom-6 right-6 h-1.5 w-0 bg-[var(--color-brand-red)] transition-all duration-300 group-hover:w-10" 
        aria-hidden="true" 
      />
    </Link>
  )
}
