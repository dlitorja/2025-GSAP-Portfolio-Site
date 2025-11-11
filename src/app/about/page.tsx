import { Metadata } from 'next'
import { createClient } from '@/lib/prismic'
import { PrismicRichText } from '@prismicio/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { ExternalLink, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me, my skills, and experience',
}

export default async function AboutPage() {
  const client = createClient()
  
  let about
  
  try {
    about = await client.getSingle('about')
  } catch (error: any) {
    // Only log actual errors, not "not found" cases (which are expected when content isn't set up)
    const isNotFoundError = error?.name === 'NotFoundError' || 
                           error?.message?.includes('No documents were returned')
    if (!isNotFoundError) {
      console.error('Error fetching about page from Prismic:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About</h1>
            <p className="text-xl text-muted-foreground">
              Learn more about me, my skills, and experience
            </p>
          </div>
        </ScrollReveal>

        {!about ? (
          <ScrollReveal direction="fade">
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                About page content not found. Set up your About page in Prismic.
              </p>
              <p className="text-sm text-muted-foreground">
                See <code className="bg-muted px-2 py-1 rounded">PRISMIC_SETUP.md</code> for instructions.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <>
            {(() => {
              const { data } = about
              return (
                <>
                  {/* Header Section */}
        <ScrollReveal direction="fade" delay={0.2}>
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            {data.profileImage?.url && (
              <div className="md:w-1/3">
                <div className="aspect-square rounded-lg overflow-hidden shadow-lg ring-1 ring-border">
                  <img
                    src={data.profileImage.url}
                    alt={data.profileImage.alt || data.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className={data.profileImage?.url ? 'md:w-2/3' : 'w-full'}>
              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{data.name}</h1>
              </ScrollReveal>
              {data.role && (
                <ScrollReveal direction="up" delay={0.3}>
                  <p className="text-xl text-muted-foreground mb-6">{data.role}</p>
                </ScrollReveal>
              )}
              {data.bio && (
                <ScrollReveal direction="up" delay={0.4}>
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <PrismicRichText field={data.bio} />
                  </div>
                </ScrollReveal>
              )}
              <ScrollReveal direction="up" delay={0.5}>
                <div className="flex gap-4 mt-6">
                {data.resumeLink?.url && (
                  <Button asChild>
                    <a
                      href={data.resumeLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>

        {/* Social Links */}
        {data.socialLinks && data.socialLinks.length > 0 && (
          <ScrollReveal direction="up" delay={0.2}>
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-4">Connect</h2>
              <div className="flex gap-3 flex-wrap">
                {data.socialLinks.map((social: any, idx: number) => (
                  social.url?.url && (
                    <Button key={idx} asChild variant="outline">
                      <a
                        href={social.url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {social.platform}
                      </a>
                    </Button>
                  )
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
              <ScrollStagger staggerDelay={0.1}>
                <div className="grid gap-6 md:grid-cols-2">
                  {data.skills.map((skill: any, idx: number) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>{skill.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{skill.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollStagger>
            </div>
          </ScrollReveal>
        )}

        {/* Experience Section */}
        {data.experience && data.experience.length > 0 && (
          <ScrollReveal direction="up" delay={0.1}>
            <div>
              <h2 className="text-3xl font-bold mb-8">Experience</h2>
              <ScrollStagger staggerDelay={0.15}>
                <div className="space-y-6">
                  {data.experience.map((exp: any, idx: number) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle>{exp.title}</CardTitle>
                            <CardDescription className="text-base">
                              {exp.company}
                            </CardDescription>
                          </div>
                          {exp.dates && (
                            <Badge variant="secondary">{exp.dates}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      {exp.description && (
                        <CardContent>
                          <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none">
                            <PrismicRichText field={exp.description} />
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </ScrollStagger>
            </div>
          </ScrollReveal>
        )}
                </>
              )
            })()}
          </>
        )}
      </div>
    </div>
  )
}

