'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Get initial styles based on direction
  const getInitialStyle = () => {
    const baseStyle: React.CSSProperties = { opacity: 0 }
    
    switch (direction) {
      case 'up':
        return { ...baseStyle, transform: 'translateY(60px)' }
      case 'down':
        return { ...baseStyle, transform: 'translateY(-60px)' }
      case 'left':
        return { ...baseStyle, transform: 'translateX(60px)' }
      case 'right':
        return { ...baseStyle, transform: 'translateX(-60px)' }
      case 'fade':
        return baseStyle
      default:
        return baseStyle
    }
  }

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Don't set GSAP initial state if inline styles are already applied
    // The inline styles from getInitialStyle() handle the initial state
    // GSAP will animate from the inline styles to the final state

    // Set initial state in GSAP to match inline styles (for GSAP to track)
    const initialState: gsap.TweenVars = {
      opacity: 0,
      immediateRender: false, // Don't override inline styles
    }

    switch (direction) {
      case 'up':
        initialState.y = 60
        break
      case 'down':
        initialState.y = -60
        break
      case 'left':
        initialState.x = 60
        break
      case 'right':
        initialState.x = -60
        break
      case 'fade':
        // No additional properties for fade
        break
    }

    // Use fromTo to respect inline styles - don't override them
    gsap.fromTo(
      element,
      initialState, // From state (matches inline styles)
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        immediateRender: false, // Don't override inline styles on creation
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Refresh ScrollTrigger after a brief delay to ensure all elements are positioned
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(refreshTimer)
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }

  }, [direction, delay, duration])

  return (
    <div ref={ref} className={className} style={getInitialStyle()}>
      {children}
    </div>
  )
}

// Stagger children component
interface ScrollStaggerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function ScrollStagger({ children, staggerDelay = 0.1, className = '' }: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const items = Array.from(element.children) as HTMLElement[]

    // Set initial styles immediately to prevent flash
    items.forEach((item) => {
      // Set inline styles first
      item.style.opacity = '0'
      item.style.transform = 'translateY(40px)'
      
      // Then sync with GSAP
      requestAnimationFrame(() => {
        gsap.set(item, {
          opacity: 0,
          y: 40,
          immediateRender: false,
        })
      })
    })

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: staggerDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [staggerDelay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

