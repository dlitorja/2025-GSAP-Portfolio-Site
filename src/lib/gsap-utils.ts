import { gsap } from 'gsap'

// Initialize GSAP defaults
export function initGSAP() {
  // Set default ease
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  })
}

// Common animation presets
export const fadeIn = {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power2.out',
}

export const fadeInUp = {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: 'power3.out',
}

export const fadeInDown = {
  opacity: 0,
  y: -30,
  duration: 0.8,
  ease: 'power2.out',
}

export const scaleIn = {
  opacity: 0,
  scale: 0.8,
  duration: 0.6,
  ease: 'back.out(1.7)',
}

export const slideInLeft = {
  opacity: 0,
  x: -50,
  duration: 0.8,
  ease: 'power2.out',
}

export const slideInRight = {
  opacity: 0,
  x: 50,
  duration: 0.8,
  ease: 'power2.out',
}

// Stagger animation helper
export function staggerAnimation(
  selector: string,
  animation: gsap.TweenVars,
  staggerDelay: number = 0.1
) {
  return gsap.from(selector, {
    ...animation,
    stagger: staggerDelay,
  })
}

// Timeline helper for complex animations
export function createTimeline(options?: gsap.TimelineVars) {
  return gsap.timeline(options)
}

