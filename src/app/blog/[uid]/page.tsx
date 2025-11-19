import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { PrismicRichText } from '@prismicio/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { BlogPostDocument } from '@/types/prismic'

interface BlogPostPageProps {
  params: Promise<{ uid: string }>
}

function estimateReadingTime(richText: any[]): number {
  if (!richText) return 5
  
  const text = richText.map(block => block.text).join(' ')
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute) || 5
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()

  try {
    const post = await client.getByUID('blog_post' as any, uid) as unknown as BlogPostDocument
    const excerptText = post.data.excerpt?.[0] && 'text' in post.data.excerpt[0] 
      ? post.data.excerpt[0].text 
      : 'Read this blog post'
    return {
      title: post.data.title || 'Blog Post',
      description: excerptText,
      openGraph: {
        title: post.data.title || 'Blog Post',
        description: excerptText,
        images: post.data.featuredImage?.url ? [post.data.featuredImage.url] : [],
        type: 'article',
        publishedTime: post.data.publishDate || undefined,
      },
    }
  } catch {
    return {
      title: 'Blog Post Not Found',
    }
  }
}

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { uid } = await params
  const client = createClient()

  let post: BlogPostDocument | null = null
  try {
    post = await client.getByUID('blog_post' as any, uid) as unknown as BlogPostDocument
  } catch {
    notFound()
  }

  const { data } = post
  const readingTime = estimateReadingTime(data.content)

  return (
    <div className="container mx-auto px-4 py-20">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <ScrollReveal direction="fade">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </ScrollReveal>

        {/* Post Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <header className="mb-12">
            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                {data.tags.map((tagItem: any, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {tagItem.tag}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.title}</h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {data.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{data.author}</span>
                </div>
              )}
              {data.publishDate && (
                <>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time>
                      {new Date(data.publishDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </>
              )}
              <span>·</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            {data.excerpt && data.excerpt[0] && 'text' in data.excerpt[0] && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {data.excerpt[0].text}
              </p>
            )}
          </header>
        </ScrollReveal>

        <Separator className="my-12" />

        {/* Featured Image */}
        {data.featuredImage?.url && (
          <ScrollReveal direction="fade" delay={0.2}>
            <div className="mb-12 rounded-lg overflow-hidden shadow-2xl ring-1 ring-border">
              <img
                src={data.featuredImage.url}
                alt={data.featuredImage.alt || data.title || 'Featured image'}
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        )}

        {/* Video Embed */}
        {data.videoEmbed?.html && (
          <ScrollReveal direction="fade" delay={0.2}>
            <Card className="p-4 mb-12 shadow-lg">
              <div
                className="aspect-video rounded-lg overflow-hidden"
                dangerouslySetInnerHTML={{ __html: data.videoEmbed.html }}
              />
            </Card>
          </ScrollReveal>
        )}

        {/* Post Content */}
        {data.content && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
              <PrismicRichText field={data.content} />
            </div>
          </ScrollReveal>
        )}

        <Separator className="my-12" />

        {/* Footer */}
        <ScrollReveal direction="fade">
          <footer className="flex justify-between items-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Posts
              </Link>
            </Button>
          </footer>
        </ScrollReveal>
      </article>
    </div>
  )
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const client = createClient()

  try {
    const posts = await client.getAllByType('blog_post' as any)
    return posts.map((post) => ({
      uid: post.uid,
    }))
  } catch {
    return []
  }
}

