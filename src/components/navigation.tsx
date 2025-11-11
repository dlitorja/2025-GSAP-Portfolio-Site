'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

interface NavigationProps {
  siteTitle?: string
}

export function Navigation({ siteTitle = 'Dustin Litorja' }: NavigationProps) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // Animate navigation on mount
    if (navRef.current && logoRef.current) {
      // Set initial state for logo
      gsap.set(logoRef.current, { opacity: 0, x: -20 })
      
      // Animate logo in
      gsap.to(logoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      // Get nav links excluding the logo
      const navLinks = navRef.current.querySelectorAll('.nav-link')
      if (navLinks.length > 0) {
        // Set initial state for nav links
        gsap.set(navLinks, { opacity: 0, y: -10 })
        
        // Animate nav links in
        gsap.to(navLinks, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2,
        })
      }
    }
  }, [])

  return (
    <nav ref={navRef} className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            ref={logoRef}
            href="/" 
            className="text-xl font-bold hover:text-primary transition-colors"
          >
            {siteTitle}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'nav-link text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary px-2 py-1',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

