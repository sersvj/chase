import { PortableText, type PortableTextComponents } from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display mb-6 mt-12 text-2xl font-black uppercase tracking-tight text-[var(--color-brand-dark)] md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display mb-4 mt-8 text-xl font-bold text-[var(--color-brand-dark)]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-relaxed text-[var(--color-brand-charcoal)] opacity-90">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-2 border-[var(--color-brand-charcoal)] bg-[var(--color-brand-warm)] p-8 shadow-[6px_6px_0px_var(--color-brand-red)] lg:p-12">
        <div className="font-display text-xl font-medium italic leading-relaxed text-[var(--color-brand-dark)] lg:text-2xl">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-8 ml-4 space-y-3">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-8 ml-4 list-decimal space-y-3 font-medium text-[var(--color-brand-dark)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-[var(--color-brand-charcoal)]">
        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 bg-[var(--color-brand-red)]" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={target}
          className="portable-text-link"
        >
          {children}
        </a>
      )
    },
  },
}

export default function CustomPortableText({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
