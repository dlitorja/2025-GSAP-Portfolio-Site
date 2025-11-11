'use client'

import { useRef, ReactNode, MouseEvent } from 'react'
import { gsap } from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className = '', strength = 0.3 }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!buttonRef.current) return

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </div>
  )
}

