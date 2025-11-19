import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/prismic'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { Calendar, MapPin, Play, Image as ImageIcon } from 'lucide-react'
import { GalleryDocument } from '@/types/prismic'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'A collection of my photography and videography work',
}

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

export default async function GalleryPage() {
  const client = createClient()
  
  let galleryItems: GalleryDocument[] = []
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await client.getAllByType('gallery' as any, {
      orderings: [{ field: 'my.gallery.date', direction: 'desc' }],
    })
    galleryItems = response as unknown as GalleryDocument[]
  } catch (error: unknown) {
    // Only log actual errors, not "not found" cases (which are expected when content isn't set up)
    const isNotFoundError = (error && typeof error === 'object' && 'name' in error && error.name === 'NotFoundError') ||
                           (error && typeof error === 'object' && 'message' in error && 
                            typeof error.message === 'string' && error.message.includes('No documents were returned'))
    if (!isNotFoundError) {
      console.error('Error fetching gallery items from Prismic:', error)
    }
  }

  // Separate items by category
  const photographyItems = galleryItems.filter((item) => item.data.category === 'Photography')
  const videographyItems = galleryItems.filter((item) => item.data.category === 'Videography')
  const otherItems = galleryItems.filter((item) => 
    item.data.category !== 'Photography' && item.data.category !== 'Videography'
  )

  const renderGalleryItem = (item: GalleryDocument) => {
    const featuredImage = item.data.featuredImage?.url
    const mediaType = item.data.mediaType
    const isVideo = mediaType === 'Single Video' || mediaType === 'Video Gallery' || mediaType === 'Mixed Media'
    const category = item.data.category || 'Mixed Media'
    
    return (
      <Link key={item.id} href={`/gallery/${item.uid}`}>
        <Card className="group h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer">
          {/* Featured Image/Thumbnail */}
          {featuredImage ? (
            <div className="aspect-[4/3] overflow-hidden relative">
              <Image
                src={featuredImage}
                alt={item.data.featuredImage?.alt || item.data.title || 'Gallery item'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                quality={85}
              />
              {/* Overlay with video indicator */}
              {isVideo && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                    <Play className="h-8 w-8 text-white fill-white" />
                  </div>
                </div>
              )}
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <Badge 
                  variant={isVideo ? "default" : "secondary"}
                  className="backdrop-blur-sm bg-black/50 text-white border-0"
                >
                  {isVideo ? (
                    <Play className="h-3 w-3 mr-1" />
                  ) : (
                    <ImageIcon className="h-3 w-3 mr-1" />
                  )}
                  {category}
                </Badge>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
              <div className="text-center p-6">
                {isVideo ? (
                  <Play className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                ) : (
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                )}
                <p className="text-sm text-muted-foreground">No preview image</p>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {item.data.title}
            </h3>
            
            {item.data.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.data.description[0] && 'text' in item.data.description[0]
                  ? item.data.description[0].text
                  : ''}
              </p>
            )}
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
              {item.data.date && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <time>
                    {new Date(item.data.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </time>
                </div>
              )}
              {item.data.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{item.data.location}</span>
                </div>
              )}
            </div>
            
            {/* Tags */}
            {item.data.tags && item.data.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {item.data.tags.slice(0, 3).map((tagItem, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tagItem.tag}
                  </Badge>
                ))}
                {item.data.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{item.data.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A visual collection of my photography and videography work
            </p>
          </div>
        </ScrollReveal>

        {/* Gallery Sections - Photography and Videography side by side */}
        {galleryItems.length === 0 ? (
          <ScrollReveal direction="fade">
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                No gallery items found. Add some items in your Prismic dashboard.
              </p>
              <p className="text-sm text-muted-foreground">
                See <code className="bg-muted px-2 py-1 rounded">PRISMIC_SETUP.md</code> for instructions.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Photography Section */}
            <ScrollReveal direction="fade" delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ImageIcon className="h-6 w-6" />
                  Photography
                </h2>
                {photographyItems.length === 0 ? (
                  <p className="text-muted-foreground">No photography items yet.</p>
                ) : (
                  <ScrollStagger staggerDelay={0.05}>
                    <div className="grid gap-6">
                      {photographyItems.map((item) => renderGalleryItem(item))}
                    </div>
                  </ScrollStagger>
                )}
              </div>
            </ScrollReveal>

            {/* Videography Section */}
            <ScrollReveal direction="fade" delay={0.3}>
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Play className="h-6 w-6" />
                  Videography
                </h2>
                {videographyItems.length === 0 ? (
                  <p className="text-muted-foreground">No videography items yet.</p>
                ) : (
                  <ScrollStagger staggerDelay={0.05}>
                    <div className="grid gap-6">
                      {videographyItems.map((item) => renderGalleryItem(item))}
                    </div>
                  </ScrollStagger>
                )}
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* Other Items (Mixed Media, etc.) */}
        {otherItems.length > 0 && (
          <ScrollReveal direction="fade" delay={0.4}>
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Other</h2>
              <ScrollStagger staggerDelay={0.05}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {otherItems.map((item) => renderGalleryItem(item))}
                </div>
              </ScrollStagger>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}

