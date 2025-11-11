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

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    // Set initial state based on direction
    const initialState: gsap.TweenVars = {
      opacity: 0,
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

    gsap.set(element, initialState)

    // Create scroll trigger animation
    gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
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
  }, [direction, delay, duration])

  return (
    <div ref={ref} className={className}>
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
    const items = element.children

    gsap.set(items, {
      opacity: 0,
      y: 40,
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

