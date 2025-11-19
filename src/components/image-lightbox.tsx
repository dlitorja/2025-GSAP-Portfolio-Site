'use client'

import { useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageLightboxProps {
  images: Array<{
    url: string
    alt: string
    caption?: string
  }>
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function ImageLightbox({ images, initialIndex, isOpen, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Update current index when initialIndex changes (when opening with a different image)
  useEffect(() => {
    if (isOpen) {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => setCurrentIndex(initialIndex), 0)
    }
  }, [initialIndex, isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length, onClose])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || images.length === 0) return null

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const currentImage = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Previous Button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 z-10 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation()
            goToPrevious()
          }}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}

      {/* Image Container - Only stop propagation when clicking the image itself */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="lightbox-image"
          onClick={(e) => e.stopPropagation()}
        />
        {(currentImage.caption || images.length > 1) && (
          <div 
            className="absolute bottom-8 left-0 right-0 text-center text-white px-4 pointer-events-none"
          >
            {currentImage.caption && (
              <p className="text-lg mb-2 drop-shadow-lg">{currentImage.caption}</p>
            )}
            {images.length > 1 && (
              <p className="text-sm text-white/70 drop-shadow-lg">
                {currentIndex + 1} / {images.length}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 z-10 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation()
            goToNext()
          }}
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}
    </div>
  )
}

