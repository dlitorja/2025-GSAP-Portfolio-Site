'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Github, Linkedin } from 'lucide-react'

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline for sequential animations
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // Animate elements in sequence
      tl.from(badgeRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          subtitleRef.current,
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
          <div ref={badgeRef}>
            <Badge variant="secondary" className="mb-4">
              Available for freelance work
            </Badge>
          </div>
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Creative Developer
            <span className="block text-muted-foreground">& Designer</span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            Crafting beautiful digital experiences with modern web technologies,
            thoughtful design, and creative code.
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
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}

