'use client'

/**
 * Reusable component for injecting JSON-LD structured data into the <head>.
 * This helps Google understand the entity relationships on the page.
 */
export default function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
