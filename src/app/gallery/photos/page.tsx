'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { GalleryDocument } from '@/types/prismic'
import { Card } from '@/components/ui/card'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { ImageLightbox } from '@/components/image-lightbox'
import { ArrowLeft, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PhotoItem {
  id: string
  url: string
  alt: string
  galleryItemId: string
  galleryItemUid: string
  galleryItemTitle: string
  caption?: string
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const client = createClient()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const galleryItems = await client.getAllByType('gallery' as any, {
          orderings: [{ field: 'my.gallery.date', direction: 'desc' }],
        })

        const extractedPhotos: PhotoItem[] = []
        
        galleryItems.forEach((item) => {
          const itemData = item.data as unknown as GalleryDocument['data']
          const mediaType = (itemData.mediaType as string) || 'Single Image'
          
          // Track if we found images for this item
          let itemPhotosFound = 0
          
          // Add images from image gallery FIRST (prioritize gallery over single/featured)
          if (itemData.imageGallery) {
            const galleryArray = Array.isArray(itemData.imageGallery) 
              ? itemData.imageGallery 
              : [itemData.imageGallery]
            
            galleryArray.forEach((galleryItem, idx: number) => {
              const image = galleryItem.image
              if (image?.url) {
                extractedPhotos.push({
                  id: `${item.id}-gallery-${idx}`,
                  url: image.url,
                  alt: image.alt || (galleryItem.caption ? String(galleryItem.caption) : undefined) || itemData.title || `Gallery photo ${idx + 1}`,
                  galleryItemId: item.id,
                  galleryItemUid: item.uid || '',
                  galleryItemTitle: itemData.title || 'Untitled',
                  caption: galleryItem.caption ? String(galleryItem.caption) : undefined,
                })
                itemPhotosFound++
              }
            })
          }
          
          // Add single image (only if no imageGallery images found)
          if (itemPhotosFound === 0 && mediaType === 'Single Image' && itemData.singleImage?.url) {
            extractedPhotos.push({
              id: `${item.id}-single`,
              url: itemData.singleImage.url,
              alt: itemData.singleImage.alt || itemData.title || 'Gallery photo',
              galleryItemId: item.id,
              galleryItemUid: item.uid || '',
              galleryItemTitle: itemData.title || 'Untitled',
            })
            itemPhotosFound++
          }
          
          // Add featured image as fallback
          if (itemPhotosFound === 0 && itemData.featuredImage?.url) {
            extractedPhotos.push({
              id: `${item.id}-featured`,
              url: itemData.featuredImage.url,
              alt: itemData.featuredImage.alt || itemData.title || 'Gallery photo',
              galleryItemId: item.id,
              galleryItemUid: item.uid || '',
              galleryItemTitle: itemData.title || 'Untitled',
            })
          }
        })
        
        setPhotos(extractedPhotos)
      } catch (error: unknown) {
        const isNotFoundError = (error && typeof error === 'object' && 'name' in error && error.name === 'NotFoundError') ||
                               (error && typeof error === 'object' && 'message' in error && 
                                typeof error.message === 'string' && error.message.includes('No documents were returned'))
        if (!isNotFoundError) {
          console.error('Error fetching gallery items from Prismic:', error)
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchPhotos()
  }, [])
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }
  
  // Prepare images for lightbox
  const lightboxImages = photos.map(photo => ({
    url: photo.url,
    alt: photo.alt,
    caption: photo.caption || photo.galleryItemTitle,
  }))

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-6">
              <Link href="/gallery">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Gallery
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Photos</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A visual collection of photography work
            </p>
          </div>
        </ScrollReveal>

        {/* Photo Gallery Grid */}
        {loading ? (
          <ScrollReveal direction="fade">
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">Loading photos...</p>
            </div>
          </ScrollReveal>
        ) : photos.length === 0 ? (
          <ScrollReveal direction="fade">
            <div className="text-center py-20">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground mb-4">
                No photos found. Add gallery items with images in your Prismic dashboard.
              </p>
              <p className="text-sm text-muted-foreground">
                See <code className="bg-muted px-2 py-1 rounded">PRISMIC_SETUP.md</code> for instructions.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <>
            <ScrollStagger staggerDelay={0.05}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(index)}
                    className="group cursor-pointer"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 h-full">
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={photo.url}
                          alt={photo.alt}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Title overlay on hover */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-white font-semibold text-sm line-clamp-2">
                            {photo.galleryItemTitle}
                          </h3>
                          {photo.caption && (
                            <p className="text-white/80 text-xs mt-1 line-clamp-1">
                              {photo.caption}
                            </p>
                          )}
                        </div>
                        {/* Click hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
                            Click to view
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </ScrollStagger>
            
            <ImageLightbox
              images={lightboxImages}
              initialIndex={lightboxIndex}
              isOpen={lightboxOpen}
              onClose={() => setLightboxOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  )
}

