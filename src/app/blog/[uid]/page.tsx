import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { PrismicRichText } from '@prismicio/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'

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
    const post = await client.getByUID('blog_post', uid)
    return {
      title: post.data.title || 'Blog Post',
      description: post.data.excerpt?.[0]?.text || 'Read this blog post',
      openGraph: {
        title: post.data.title || 'Blog Post',
        description: post.data.excerpt?.[0]?.text || 'Read this blog post',
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { uid } = await params
  const client = createClient()

  let post
  try {
    post = await client.getByUID('blog_post', uid)
  } catch {
    notFound()
  }

  const { data } = post
  const readingTime = estimateReadingTime(data.content)

  return (
    <div className="container mx-auto px-4 py-20">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Post Header */}
        <header className="mb-8">
          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {data.tags.map((tagItem: any, idx: number) => (
                <Badge key={idx} variant="secondary">
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
          {data.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {data.excerpt[0]?.text}
            </p>
          )}
        </header>

        <Separator className="my-8" />

        {/* Featured Image */}
        {data.featuredImage?.url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={data.featuredImage.url}
              alt={data.featuredImage.alt || data.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Video Embed */}
        {data.videoEmbed?.html && (
          <Card className="p-4 mb-8">
            <div
              className="aspect-video"
              dangerouslySetInnerHTML={{ __html: data.videoEmbed.html }}
            />
          </Card>
        )}

        {/* Post Content */}
        {data.content && (
          <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
            <PrismicRichText field={data.content} />
          </div>
        )}

        <Separator className="my-12" />

        {/* Footer */}
        <footer className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Posts
            </Link>
          </Button>
        </footer>
      </article>
    </div>
  )
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const client = createClient()

  try {
    const posts = await client.getAllByType('blog_post')
    return posts.map((post) => ({
      uid: post.uid,
    }))
  } catch {
    return []
  }
}

