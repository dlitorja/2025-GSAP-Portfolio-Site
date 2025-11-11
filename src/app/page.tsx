import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { AnimatedHero } from '@/components/animated-hero'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section with GSAP Animations */}
      <AnimatedHero />

      {/* Featured Work Preview */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Featured Work
              </h2>
              <p className="text-muted-foreground">
                A selection of my recent projects
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/projects">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Placeholder cards - will be populated from Prismic */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video bg-muted" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Project Title {i}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    A brief description of this amazing project and the technologies used.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">GSAP</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Latest Articles
              </h2>
              <p className="text-muted-foreground">
                Thoughts on design, development, and creativity
              </p>
            </div>
            <Button asChild variant="ghost">
              <Link href="/blog">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-6">
            {/* Placeholder blog posts - will be populated from Prismic */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <time>Nov {i}, 2025</time>
                      <span>·</span>
                      <span>5 min read</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      Blog Post Title {i}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      An engaging excerpt from the blog post that gives readers
                      a preview of what they'll learn from reading the full article.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Web Development</Badge>
                      <Badge variant="outline">Tutorial</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
