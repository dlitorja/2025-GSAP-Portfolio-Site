'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const prevPathnameRef = useRef<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // First load - fade in
    if (!prevPathnameRef.current) {
      gsap.from(container, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      })
    } else {
      // Page transition - slide and fade
      const tl = gsap.timeline()

      // Fade out current content
      tl.to(container, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
      })
      // Fade in new content
      .from(container, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    prevPathnameRef.current = pathname
  }, [pathname])

  return (
    <div ref={containerRef} className="min-h-full">
      {children}
    </div>
  )
}

