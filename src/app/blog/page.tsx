import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles about web development, design, and creative coding',
}

function estimateReadingTime(richText: any[]): number {
  if (!richText) return 5
  
  const text = richText.map(block => block.text).join(' ')
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute) || 5
}

export default async function BlogPage() {
  const client = createClient()
  
  let posts: any[] = []
  
  try {
    const response = await client.getAllByType('blog_post', {
      orderings: [{ field: 'my.blog_post.publishDate', direction: 'desc' }],
    })
    posts = response
  } catch (error) {
    console.error('Error fetching blog posts from Prismic:', error)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts on web development, design, and the creative process
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              No blog posts found. Add some posts in your Prismic dashboard.
            </p>
            <p className="text-sm text-muted-foreground">
              See <code className="bg-muted px-2 py-1 rounded">PRISMIC_SETUP.md</code> for instructions.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => {
              const readingTime = estimateReadingTime(post.data.content)
              
              return (
                <Link key={post.id} href={`/blog/${post.uid}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 group">
                    <div className="flex flex-col md:flex-row">
                      {post.data.featuredImage?.url && (
                        <div className="md:w-1/3">
                          <div className="aspect-video md:aspect-square overflow-hidden md:rounded-l-lg">
                            <img
                              src={post.data.featuredImage.url}
                              alt={post.data.featuredImage.alt || post.data.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      )}
                      <div className={post.data.featuredImage?.url ? 'md:w-2/3' : 'w-full'}>
                        <CardHeader>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
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
                          <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                            {post.data.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {post.data.excerpt && (
                            <CardDescription className="text-base mb-4 line-clamp-3">
                              {post.data.excerpt[0]?.text || ''}
                            </CardDescription>
                          )}
                          {post.data.tags && post.data.tags.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {post.data.tags.slice(0, 3).map((tagItem: any, idx: number) => (
                                <Badge key={idx} variant="outline">
                                  {tagItem.tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {post.data.author && (
                            <p className="text-sm text-muted-foreground mt-4">
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
        )}
      </div>
    </div>
  )
}

