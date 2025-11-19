import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { Calendar, Clock } from 'lucide-react'
import * as prismic from '@prismicio/client'
import { BlogPostDocument } from '@/types/prismic'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about web development, design, and creative coding',
}

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

function estimateReadingTime(richText: prismic.RichTextField | undefined): number {
  if (!richText || !Array.isArray(richText)) return 5
  
  const text = richText.map((block) => {
    if (block && typeof block === 'object' && 'text' in block && typeof block.text === 'string') {
      return block.text
    }
    return ''
  }).join(' ')
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute) || 5
}

export default async function BlogPage() {
  const client = createClient()
  
  let posts: BlogPostDocument[] = []
  
  try {
    const response = await client.getAllByType('blog_post' as any, {
      orderings: [{ field: 'my.blog_post.publishDate', direction: 'desc' }],
    })
    posts = response as unknown as BlogPostDocument[]
  } catch (error: unknown) {
    // Only log actual errors, not "not found" cases (which are expected when content isn't set up)
    const isNotFoundError = (error && typeof error === 'object' && 'name' in error && error.name === 'NotFoundError') ||
                           (error && typeof error === 'object' && 'message' in error && 
                            typeof error.message === 'string' && error.message.includes('No documents were returned'))
    if (!isNotFoundError) {
      console.error('Error fetching blog posts from Prismic:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Thoughts on web development, design, and the creative process
            </p>
          </div>
        </ScrollReveal>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <ScrollReveal direction="fade">
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                No blog posts found. Add some posts in your Prismic dashboard.
              </p>
              <p className="text-sm text-muted-foreground">
                See <code className="bg-muted px-2 py-1 rounded">PRISMIC_SETUP.md</code> for instructions.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollStagger staggerDelay={0.1}>
            <div className="space-y-8">
              {posts.map((post) => {
                const readingTime = estimateReadingTime(post.data.content)
                
                return (
                  <Link key={post.id} href={`/blog/${post.uid}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20 overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {post.data.featuredImage?.url && (
                          <div className="md:w-1/3">
                            <div className="aspect-video md:aspect-square overflow-hidden md:rounded-l-lg relative">
                              <img
                                src={post.data.featuredImage.url}
                                alt={post.data.featuredImage.alt || post.data.title || 'Blog post image'}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        )}
                        <div className={post.data.featuredImage?.url ? 'md:w-2/3' : 'w-full'}>
                          <CardHeader>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                              {post.data.publishDate && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <time>
                                    {new Date(post.data.publishDate).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </time>
                                </div>
                              )}
                              <span>·</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{readingTime} min read</span>
                              </div>
                            </div>
                            <CardTitle className="text-2xl group-hover:text-primary transition-colors line-clamp-2">
                              {post.data.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {post.data.excerpt && (
                              <CardDescription className="text-base mb-4 line-clamp-3">
                                {post.data.excerpt[0] && 'text' in post.data.excerpt[0] 
                                  ? post.data.excerpt[0].text 
                                  : ''}
                              </CardDescription>
                            )}
                            {post.data.tags && post.data.tags.length > 0 && (
                              <div className="flex gap-2 flex-wrap mb-4">
                                {post.data.tags.slice(0, 3).map((tagItem, idx: number) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tagItem.tag}
                                  </Badge>
                                ))}
                                {post.data.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{post.data.tags.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                            {post.data.author && (
                              <p className="text-sm text-muted-foreground">
                                By {post.data.author}
                              </p>
                            )}
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </ScrollStagger>
        )}
      </div>
    </div>
  )
}

