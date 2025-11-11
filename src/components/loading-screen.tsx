'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Animate loading screen out
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    })

    tl.to('.loading-screen', {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
    })
      .to('.loading-screen', {
        display: 'none',
        duration: 0,
      })
  }, [])

  if (!isLoading) return null

  return (
    <div className="loading-screen fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

