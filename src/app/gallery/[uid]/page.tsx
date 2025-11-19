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
import { GalleryImages } from '@/components/gallery-images'
import { ArrowLeft, Calendar, MapPin, Play, Image as ImageIcon } from 'lucide-react'
import { GalleryDocument } from '@/types/prismic'

interface GalleryPageProps {
  params: Promise<{ uid: string }>
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()

  try {
    const item = await client.getByUID('gallery' as any, uid) as unknown as GalleryDocument
    const descriptionText = item.data.description?.[0] && 'text' in item.data.description[0]
      ? item.data.description[0].text
      : 'Gallery item'
    return {
      title: item.data.title || 'Gallery Item',
      description: descriptionText,
    }
  } catch {
    return {
      title: 'Gallery Item Not Found',
    }
  }
}

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

export default async function GalleryItemPage({ params }: GalleryPageProps) {
  const { uid } = await params
  const client = createClient()

  let item: GalleryDocument | null = null
  try {
    item = await client.getByUID('gallery' as any, uid) as unknown as GalleryDocument
  } catch {
    notFound()
  }

  const { data } = item
  const mediaType = data.mediaType || 'Single Image'
  const category = data.category || 'Mixed Media'

  // Extract all images for the lightbox
  const extractImages = () => {
    const images: Array<{ url: string; alt: string; caption?: string }> = []
    
    // Extract from imageGallery
    if (data.imageGallery) {
      let galleryArray: any[] = []
      if (Array.isArray(data.imageGallery)) {
        galleryArray = data.imageGallery
      } else {
        galleryArray = [data.imageGallery]
      }
      
      galleryArray.forEach((galleryItem: any) => {
        const image = galleryItem.image || galleryItem.galleryImage || galleryItem
        if (image?.url) {
          images.push({
            url: image.url,
            alt: image.alt || galleryItem.caption || galleryItem.imageCaption || data.title || 'Gallery image',
            caption: galleryItem.caption || galleryItem.imageCaption,
          })
        }
      })
    }
    
    // Add single image if no gallery images found
    if (images.length === 0 && data.singleImage?.url) {
      images.push({
        url: data.singleImage.url,
        alt: data.singleImage.alt || data.title || 'Gallery image',
      })
    }
    
    // Add featured image as fallback if still no images
    if (images.length === 0 && data.featuredImage?.url) {
      images.push({
        url: data.featuredImage.url,
        alt: data.featuredImage.alt || data.title || 'Gallery image',
      })
    }
    
    return images
  }

  const allImages = extractImages()

  // Debug: Log what we're receiving (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Gallery Item Data:', {
      uid: item.uid,
      title: data.title,
      mediaType,
      hasImageGallery: !!data.imageGallery,
      imageGalleryLength: Array.isArray(data.imageGallery) ? data.imageGallery.length : 0,
      hasSingleImage: !!data.singleImage?.url,
      totalImagesExtracted: allImages.length,
      imageGallery: data.imageGallery,
    })
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <ScrollReveal direction="fade">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/gallery">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-sm">
                {category}
              </Badge>
              {mediaType && (
                <Badge variant="outline" className="text-sm">
                  {mediaType}
                </Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              {data.date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>
                    {new Date(data.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{data.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {data.description && (
              <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
                <PrismicRichText field={data.description} />
              </div>
            )}

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {data.tags.map((tagItem: any, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {tagItem.tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        <Separator className="my-12" />

        {/* Media Content */}
        <ScrollReveal direction="fade" delay={0.2}>
          {/* Image Gallery - Show all images with lightbox */}
          {allImages.length > 0 && <GalleryImages images={allImages} />}
          
          {(!data.imageGallery || 
            (Array.isArray(data.imageGallery) && data.imageGallery.length === 0) ||
            (!Array.isArray(data.imageGallery) && !data.imageGallery)) && 
           process.env.NODE_ENV === 'development' && (
            <div className="mb-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Debug Info:</strong> No image gallery found. 
                Media Type: {mediaType || 'Not set'}. 
                Has imageGallery field: {data.imageGallery ? 'Yes' : 'No'}. 
                ImageGallery is array: {Array.isArray(data.imageGallery) ? 'Yes' : 'No'}. 
                ImageGallery length: {Array.isArray(data.imageGallery) ? data.imageGallery.length : 'N/A'}.
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
                Make sure you've added images to the &quot;Image Gallery&quot; field in Prismic and published the document.
              </p>
            </div>
          )}

          {/* Single Image - Only show if no image gallery exists */}
          {(!data.imageGallery || !Array.isArray(data.imageGallery) || data.imageGallery.length === 0) &&
           mediaType === 'Single Image' && 
           data.singleImage?.url && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-2xl ring-1 ring-border">
              <img
                src={data.singleImage.url}
                alt={data.singleImage.alt || data.title || 'Gallery image'}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Single Video - Embed */}
          {mediaType === 'Single Video' && data.singleVideo === 'Embed (YouTube/Vimeo)' && data.videoEmbed?.html && (
            <Card className="p-4 mb-12 shadow-lg">
              <div className="aspect-video rounded-lg overflow-hidden">
                <div
                  dangerouslySetInnerHTML={{ __html: data.videoEmbed.html }}
                />
              </div>
            </Card>
          )}

          {/* Single Video - Uploaded File */}
          {mediaType === 'Single Video' && data.singleVideo === 'Uploaded File' && data.videoFile && 'url' in data.videoFile && data.videoFile.url && (
            <Card className="p-4 mb-12 shadow-lg">
              <video
                className="w-full aspect-video rounded-lg"
                controls
                preload="metadata"
              >
                <source src={data.videoFile.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Card>
          )}

          {/* Video Gallery */}
          {mediaType === 'Video Gallery' && data.videoGallery && data.videoGallery.length > 0 && (
            <div className="mb-12 space-y-8">
              {data.videoGallery.map((video: any, idx: number) => (
                <Card key={idx} className="p-4 shadow-lg">
                  {video.videoTitle && (
                    <h3 className="text-xl font-semibold mb-2">{video.videoTitle}</h3>
                  )}
                  {video.videoDescription && (
                    <p className="text-muted-foreground mb-4">{video.videoDescription}</p>
                  )}
                  
                  {/* Embedded Video */}
                  {video.videoType === 'Embed (YouTube/Vimeo)' && video.videoEmbed?.html && (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <div
                        dangerouslySetInnerHTML={{ __html: video.videoEmbed.html }}
                      />
                    </div>
                  )}
                  
                  {/* Uploaded Video File */}
                  {video.videoType === 'Uploaded File' && video.videoFile && 'url' in video.videoFile && video.videoFile.url && (
                    <video
                      className="w-full aspect-video rounded-lg"
                      controls
                      preload="metadata"
                    >
                      <source src={video.videoFile.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Mixed Media */}
          {mediaType === 'Mixed Media' && (
            <div className="mb-12 space-y-8">
              {/* Single Image if exists */}
              {data.singleImage?.url && (
                <div className="rounded-lg overflow-hidden shadow-2xl ring-1 ring-border">
                  <img
                    src={data.singleImage.url}
                    alt={data.singleImage.alt || data.title || 'Gallery image'}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Image Gallery if exists */}
              {allImages.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Images</h2>
                  <GalleryImages images={allImages} />
                </div>
              )}

              {/* Single Video if exists */}
              {data.singleVideo === 'Embed (YouTube/Vimeo)' && data.videoEmbed?.html && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Video</h2>
                  <Card className="p-4 shadow-lg">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <div
                        dangerouslySetInnerHTML={{ __html: data.videoEmbed.html }}
                      />
                    </div>
                  </Card>
                </div>
              )}

              {data.singleVideo === 'Uploaded File' && data.videoFile && 'url' in data.videoFile && data.videoFile.url && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Video</h2>
                  <Card className="p-4 shadow-lg">
                    <video
                      className="w-full aspect-video rounded-lg"
                      controls
                      preload="metadata"
                    >
                      <source src={data.videoFile.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </Card>
                </div>
              )}

              {/* Video Gallery if exists */}
              {data.videoGallery && data.videoGallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Videos</h2>
                  <div className="space-y-8">
                    {data.videoGallery.map((video: any, idx: number) => (
                      <Card key={idx} className="p-4 shadow-lg">
                        {video.videoTitle && (
                          <h3 className="text-xl font-semibold mb-2">{video.videoTitle}</h3>
                        )}
                        {video.videoDescription && (
                          <p className="text-muted-foreground mb-4">{video.videoDescription}</p>
                        )}
                        
                        {video.videoType === 'Embed (YouTube/Vimeo)' && video.videoEmbed?.html && (
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <div
                              dangerouslySetInnerHTML={{ __html: video.videoEmbed.html }}
                            />
                          </div>
                        )}
                        
                        {video.videoType === 'Uploaded File' && video.videoFile && 'url' in video.videoFile && video.videoFile.url && (
                          <video
                            className="w-full aspect-video rounded-lg"
                            controls
                            preload="metadata"
                          >
                            <source src={video.videoFile.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fallback: Featured Image if no other media */}
          {!data.singleImage?.url && 
           (!data.imageGallery || data.imageGallery.length === 0) &&
           mediaType !== 'Single Video' &&
           mediaType !== 'Video Gallery' &&
           data.featuredImage?.url && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-2xl ring-1 ring-border">
              <img
                src={data.featuredImage.url}
                alt={data.featuredImage.alt || data.title || 'Gallery image'}
                className="w-full h-auto"
              />
            </div>
          )}
        </ScrollReveal>
      </div>
    </div>
  )
}

// Generate static paths for all gallery items
export async function generateStaticParams() {
  const client = createClient()

  try {
    const items = await client.getAllByType('gallery' as any)
    return items.map((item) => ({
      uid: item.uid,
    }))
  } catch {
    return []
  }
}

