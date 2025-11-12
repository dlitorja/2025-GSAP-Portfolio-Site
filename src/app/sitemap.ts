import { MetadataRoute } from 'next'
import { createClient } from '@/lib/prismic'

// Enable ISR - regenerate sitemap every 60 seconds
export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://litorja.com'
  const client = createClient()

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  // Dynamic routes - Projects
  let projectRoutes: MetadataRoute.Sitemap = []
  try {
    const projects = await client.getAllByType('project' as any)
    projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.uid}`,
      lastModified: new Date(project.last_publication_date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  // Dynamic routes - Blog Posts
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = await client.getAllByType('blog_post' as any)
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.uid}`,
      lastModified: new Date(post.last_publication_date),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes]
}

