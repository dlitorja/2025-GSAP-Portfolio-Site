'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
}: AnimatedHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleLineRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for sequential animations
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // Animate elements in sequence
      if (showAnnouncement && badgeRef.current) {
        tl.from(badgeRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
        })
      }
      
      tl.from(
          titleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          showAnnouncement ? '-=0.3' : '0'
        )
      
      if (heroSubtitle && subtitleLineRef.current) {
        tl.from(
          subtitleLineRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          '-=0.5'
        )
      }
      
      tl.from(
          descriptionRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          buttonsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          socialsRef.current,
          {
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-20"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          {showAnnouncement && announcementBadge && (
            <div ref={badgeRef}>
              <Badge variant="secondary" className="mb-4">
                {announcementBadge}
              </Badge>
            </div>
          )}
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            {heroHeadline}
          </h1>
          {heroSubtitle && (
            <p
              ref={subtitleLineRef}
              className="text-2xl md:text-3xl text-muted-foreground mt-4"
            >
              {heroSubtitle}
            </p>
          )}
          <p
            ref={descriptionRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mt-6"
          >
            {heroDescription}
          </p>
        </div>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button asChild size="lg" className="text-lg">
            <Link href="/projects">
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>

        <div
          ref={socialsRef}
          className="flex gap-4 justify-center items-center pt-8"
        >
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
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
              className="text-muted-foreground hover:text-foreground transition-colors"
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
              className="text-muted-foreground hover:text-foreground transition-colors"
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
              className="text-muted-foreground hover:text-foreground transition-colors"
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

