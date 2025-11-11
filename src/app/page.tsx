import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import { AnimatedHero } from '@/components/animated-hero'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { createClient } from '@/lib/prismic'
import { SiteSettingsDocument } from '@/types/prismic'

export default async function Home() {
  // Fetch site settings from Prismic
  const client = createClient()
  let siteSettings: SiteSettingsDocument | null = null
  
  try {
    siteSettings = await client.getSingle('site_settings') as unknown as SiteSettingsDocument
  } catch (error: any) {
    // Only log actual errors, not "not found" cases (which are expected when content isn't set up)
    const isNotFoundError = error?.name === 'NotFoundError' || 
                           error?.message?.includes('No documents were returned')
    if (!isNotFoundError) {
      console.error('Failed to fetch site settings:', error)
    }
  }

  // Extract data with fallbacks
  const heroHeadline = siteSettings?.data.hero_headline || 'Dustin Litorja'
  const heroSubtitle = siteSettings?.data.hero_subtitle || ''
  const heroDescription = siteSettings?.data.hero_description || "I'm a marketing consultant who specializes in content strategy."
  const announcementBadge = siteSettings?.data.announcement_badge || ''
  const showAnnouncement = siteSettings?.data.show_announcement || false
  const githubUrl = (siteSettings?.data.github_url && 'url' in siteSettings.data.github_url) ? siteSettings.data.github_url.url : ''
  const linkedinUrl = (siteSettings?.data.linkedin_url && 'url' in siteSettings.data.linkedin_url) ? siteSettings.data.linkedin_url.url : ''
  const twitterUrl = (siteSettings?.data.twitter_url && 'url' in siteSettings.data.twitter_url) ? siteSettings.data.twitter_url.url : ''
  const instagramUrl = (siteSettings?.data.instagram_url && 'url' in siteSettings.data.instagram_url) ? siteSettings.data.instagram_url.url : ''
  const homepageBackgroundImage = siteSettings?.data.homepage_background_image?.url
  
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Dark Overlay */}
      {homepageBackgroundImage && (
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url(${homepageBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        >
          {/* Dark Overlay - adjustable opacity */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Hero Section with GSAP Animations */}
        <AnimatedHero 
          heroHeadline={heroHeadline}
          heroSubtitle={heroSubtitle}
          heroDescription={heroDescription}
          announcementBadge={announcementBadge}
          showAnnouncement={showAnnouncement}
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          twitterUrl={twitterUrl}
          instagramUrl={instagramUrl}
        />

        {/* Featured Work Preview */}
        <ScrollReveal direction="up" delay={0.2}>
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
              
              <ScrollStagger staggerDelay={0.1}>
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Placeholder cards - will be populated from Prismic */}
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`group relative overflow-hidden rounded-lg border border-border hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${homepageBackgroundImage ? 'bg-card/95 backdrop-blur-sm' : 'bg-card'}`}
                    >
                      <div className="aspect-video bg-muted group-hover:scale-110 transition-transform duration-500" />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
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
              </ScrollStagger>
            </div>
          </section>
        </ScrollReveal>

        {/* Latest Blog Posts */}
        <ScrollReveal direction="up" delay={0.2}>
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

              <ScrollStagger staggerDelay={0.15}>
                <div className="space-y-6">
                  {/* Placeholder blog posts - will be populated from Prismic */}
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`group border border-border rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] ${homepageBackgroundImage ? 'bg-card/95 backdrop-blur-sm' : ''}`}
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
              </ScrollStagger>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
