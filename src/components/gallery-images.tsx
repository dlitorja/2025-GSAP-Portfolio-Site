'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ScrollStagger } from '@/components/scroll-reveal'
import { ImageLightbox } from '@/components/image-lightbox'

interface GalleryImage {
  url: string
  alt: string
  caption?: string
}

interface GalleryImagesProps {
  images: GalleryImage[]
}

export function GalleryImages({ images }: GalleryImagesProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  if (images.length === 0) return null

  return (
    <>
      <div className="mb-12">
        <ScrollStagger staggerDelay={0.1}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden shadow-lg ring-1 ring-border hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
                onClick={() => openLightbox(idx)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    quality={85}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      Click to view full size
                    </span>
                  </div>
                </div>
                {image.caption && (
                  <div className="p-4 bg-muted">
                    <p className="text-sm text-muted-foreground">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollStagger>
      </div>

      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

