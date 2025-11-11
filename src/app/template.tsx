'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const prevPathnameRef = useRef<string | null>(null)
  const isFirstLoad = useRef(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // First load - don't animate, let page-specific animations handle it
    if (isFirstLoad.current) {
      isFirstLoad.current = false
      prevPathnameRef.current = pathname
      return
    }

    // Skip ALL animations when navigating TO homepage - it has its own hero animations
    if (pathname === '/') {
      // Ensure container is visible immediately, no animation, no opacity changes
      // Don't kill tweens - let the hero component manage its own animations
      // Only ensure the container itself is visible
      container.style.opacity = '1'
      container.style.transform = 'none'
      prevPathnameRef.current = pathname
      return
    }

    // Page transition for non-home pages - smooth fade only
    // But only if we're not coming from homepage (to avoid flash)
    if (prevPathnameRef.current !== '/') {
      gsap.fromTo(
        container,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      )
    } else {
      // Coming from homepage - ensure visible immediately
      container.style.opacity = '1'
    }

    prevPathnameRef.current = pathname
  }, [pathname])

  return (
    <div ref={containerRef} className="min-h-full" style={{ opacity: 1 }}>
      {children}
    </div>
  )
}

