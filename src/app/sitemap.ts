import { MetadataRoute } from 'next'
import { getWorkSamples, getPosts } from '@/lib/queries'
import { WorkSample, Post } from '@/types/sanity'
import { getBaseUrl } from '@/lib/site'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()

  const workSamples = await getWorkSamples()
  const posts = await getPosts()

  const workEntries = workSamples.map((work: WorkSample) => ({
    url: `${baseUrl}/work/${work.slug.current}`,
    lastModified: new Date(work.publishedAt),
  }))

  const blogEntries = posts.map((post: Post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
  }))

  const staticPages = ['', '/about', '/work', '/blog', '/contact', '/services'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))

  return [...staticPages, ...workEntries, ...blogEntries]
}
