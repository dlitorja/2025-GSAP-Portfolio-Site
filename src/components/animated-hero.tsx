'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MagneticButton } from '@/components/magnetic-button'
import { ArrowRight, Github, Linkedin, Twitter, Instagram } from 'lucide-react'

interface AnimatedHeroProps {
  heroHeadline: string
  heroSubtitle?: string
  heroDescription: string
  announcementBadge?: string
  showAnnouncement?: boolean
  githubUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  hasBackgroundImage?: boolean
}

export function AnimatedHero({
  heroHeadline,
  heroSubtitle,
  heroDescription,
  announcementBadge,
  showAnnouncement = false,
  githubUrl,
  linkedinUrl,
  twitterUrl,
  instagramUrl,
  hasBackgroundImage = false,
}: AnimatedHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleLineRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Function to prepare buttons/socials for animation
    // CSS classes already hide them, we just need to remove the class and set GSAP properties
    const prepareButtonsAndSocials = () => {
      if (buttonsRef.current) {
        const magneticButtons = buttonsRef.current.querySelectorAll('.magnetic-btn')
        if (magneticButtons.length > 0) {
          // Remove CSS hiding class and set GSAP initial state
          buttonsRef.current.classList.remove('hero-buttons-hidden')
          gsap.set(magneticButtons, { opacity: 0, scale: 0.8, y: 20, visibility: 'visible' })
        }
      }
      if (socialsRef.current && socialsRef.current.children.length > 0) {
        // Remove CSS hiding class and set GSAP initial state
        socialsRef.current.classList.remove('hero-socials-hidden')
        gsap.set(socialsRef.current.children, { opacity: 0, rotation: -180, scale: 0, visibility: 'visible' })
      }
    }
    
    const ctx = gsap.context(() => {
      // Split title into words for animation
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || ''
        const words = titleText.split(' ')
        titleRef.current.innerHTML = ''
        // Make h1 visible again since we're now controlling opacity on the spans
        titleRef.current.style.opacity = '1'
        
        words.forEach((word, index) => {
          const span = document.createElement('span')
          span.textContent = word
          span.style.display = 'inline-block'
          // Add margin-right to preserve spacing between words (except for last word)
          if (index < words.length - 1) {
            span.style.marginRight = '0.45em'
          }
          // Set initial state immediately to prevent flash
          span.style.opacity = '0'
          span.style.transform = 'translateY(60px) rotateX(90deg)'
          span.style.transformOrigin = 'center bottom'
          titleRef.current?.appendChild(span)
        })
      }

      // Set initial hidden states IMMEDIATELY to prevent flash
      // Do this synchronously before any delays
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0, y: 30, filter: 'blur(10px)' })
      }
      if (heroSubtitle && subtitleLineRef.current) {
        gsap.set(subtitleLineRef.current, { opacity: 0, x: -50 })
      }
      if (showAnnouncement && badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, scale: 0, y: 20 })
      }

      // Use double requestAnimationFrame to ensure DOM is fully ready and any template animations have settled
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Small additional delay to ensure all React children are fully rendered
          setTimeout(() => {
            // Prepare buttons and socials - remove CSS hiding and set GSAP state
            prepareButtonsAndSocials()

            // Create a timeline for sequential animations
            const tl = gsap.timeline({
              defaults: { ease: 'power3.out' },
            })

          // Animate badge with scale bounce
          if (showAnnouncement && badgeRef.current) {
            tl.to(badgeRef.current, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: 'back.out(1.7)',
            })
          }
          
          // Animate title words with 3D flip effect
          if (titleRef.current) {
            const titleSpans = titleRef.current.querySelectorAll('span')
            tl.to(
              titleSpans,
              {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power3.out',
              },
              showAnnouncement ? '-=0.3' : '0'
            )
          }
          
          // Animate subtitle with slide and fade
          if (heroSubtitle && subtitleLineRef.current) {
            tl.to(
              subtitleLineRef.current,
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
              },
              '-=0.4'
            )
          }
          
          // Animate description with blur effect
          if (descriptionRef.current) {
            tl.to(
              descriptionRef.current,
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1,
                ease: 'power2.out',
              },
              '-=0.5'
            )
          }
          
          // Animate buttons with scale and stagger
          if (buttonsRef.current) {
            const magneticButtons = buttonsRef.current.querySelectorAll('.magnetic-btn')
            if (magneticButtons.length > 0) {
              // Ensure initial state is set right before animating
              prepareButtonsAndSocials()
              tl.to(
                magneticButtons,
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: 'back.out(1.4)',
                },
                '-=0.4'
              )
            }
          }
          
          // Animate social icons with rotation
          if (socialsRef.current && socialsRef.current.children.length > 0) {
            // Ensure initial state is set right before animating
            prepareButtonsAndSocials()
            tl.to(
              socialsRef.current.children,
              {
                opacity: 1,
                rotation: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'back.out(1.7)',
              },
              '-=0.3'
            )
          }

            // Fallback: ensure buttons and socials are visible even if animation didn't run
            // This handles edge cases where children weren't ready
            setTimeout(() => {
              if (buttonsRef.current) {
                const magneticButtons = buttonsRef.current.querySelectorAll('.magnetic-btn')
                magneticButtons.forEach(btn => {
                  const computedStyle = window.getComputedStyle(btn as HTMLElement)
                  if (computedStyle.opacity === '0' || computedStyle.opacity === '') {
                    gsap.to(btn, { opacity: 1, scale: 1, y: 0, duration: 0.3 })
                  }
                })
              }
              if (socialsRef.current && socialsRef.current.children.length > 0) {
                const socials = Array.from(socialsRef.current.children) as HTMLElement[]
                socials.forEach(social => {
                  const computedStyle = window.getComputedStyle(social)
                  if (computedStyle.opacity === '0' || computedStyle.opacity === '') {
                    gsap.to(social, { opacity: 1, rotation: 0, scale: 1, duration: 0.3 })
                  }
                })
              }
            }, 100)
          }, 50)
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [heroHeadline, heroSubtitle, heroDescription, showAnnouncement])

  return (
    <section
      ref={containerRef}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          {showAnnouncement && announcementBadge && (
            <div ref={badgeRef} style={{ opacity: 0 }}>
              <Badge variant="secondary" className="mb-4">
                {announcementBadge}
              </Badge>
            </div>
          )}
          <h1
            ref={titleRef}
            className={`text-5xl md:text-7xl font-bold tracking-tight ${hasBackgroundImage ? 'text-white' : ''}`}
            style={{ opacity: 0 }}
          >
            {heroHeadline}
          </h1>
          {heroSubtitle && (
            <p
              ref={subtitleLineRef}
              className={`text-2xl md:text-3xl mt-4 ${hasBackgroundImage ? 'text-white/90' : 'text-foreground/80'}`}
              style={{ opacity: 0 }}
            >
              {heroSubtitle}
            </p>
          )}
          <p
            ref={descriptionRef}
            className={`text-xl md:text-2xl max-w-2xl mx-auto mt-6 whitespace-pre-line ${hasBackgroundImage ? 'text-white/90' : 'text-foreground/80'}`}
            style={{ opacity: 0 }}
          >
            {heroDescription}
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="flex flex-col gap-4 justify-center items-center hero-buttons-hidden"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton strength={0.2}>
              <Button asChild size="lg" className="text-lg magnetic-btn">
                <Link href="/projects">View My Work</Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button asChild size="lg" className="text-lg magnetic-btn">
                <Link href="/gallery">
                  My Content
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Button asChild size="lg" className="text-lg magnetic-btn">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </MagneticButton>
          </div>
          <MagneticButton strength={0.2}>
            <Button asChild size="lg" className="text-lg magnetic-btn">
              <Link href="/about">About Me</Link>
            </Button>
          </MagneticButton>
        </div>

        <div
          ref={socialsRef}
          className="flex gap-4 justify-center items-center pt-8 hero-socials-hidden"
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={hasBackgroundImage ? 'text-white/70 hover:text-white transition-colors' : 'text-muted-foreground hover:text-foreground transition-colors'}
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
          )}
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={hasBackgroundImage ? 'text-white/70 hover:text-white transition-colors' : 'text-muted-foreground hover:text-foreground transition-colors'}
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          )}
          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={hasBackgroundImage ? 'text-white/70 hover:text-white transition-colors' : 'text-muted-foreground hover:text-foreground transition-colors'}
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={hasBackgroundImage ? 'text-white/70 hover:text-white transition-colors' : 'text-muted-foreground hover:text-foreground transition-colors'}
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

