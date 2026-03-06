import { getPosts, getSiteSettings } from '@/lib/queries'
import SectionHeading from '@/components/ui/SectionHeading'
import PostCard from '@/components/ui/PostCard'
import { AnimatedSection, AnimatedGrid } from '@/components/ui/AnimatedSection'
import { urlFor } from '@/lib/sanity'
import type { Post } from '@/types/sanity'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings?.seoBlog

  return {
    title: seo?.title || 'Blog',
    description: seo?.description,
    openGraph: {
      title: seo?.title || 'Blog',
      description: seo?.description,
      images: seo?.image ? [urlFor(seo.image).width(1200).height(630).url()] : [],
    },
  }
}

export const revalidate = 60

export default async function BlogPage() {
  const posts: Post[] = await getPosts()

  return (
    <div className="container-site py-20 lg:py-32">
      <AnimatedSection>
        <SectionHeading 
          title="Articles & Insights" 
          subtitle="Writing"
        />
      </AnimatedSection>

      {posts && posts.length > 0 ? (
        <AnimatedGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </AnimatedGrid>
      ) : (
        <div className="py-20 text-center text-[var(--color-brand-muted)]">
          <p className="max-w-md mx-auto">
            Articles and insights coming soon. Head over to the Studio to share your first piece.
          </p>
        </div>
      )}
    </div>
  )
}
