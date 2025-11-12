import { Metadata } from 'next'
import React from 'react'
import { createClient } from '@/lib/prismic'
import { PrismicRichText } from '@prismicio/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { ExternalLink, Briefcase, Code } from 'lucide-react'
import { AboutDocument } from '@/types/prismic'

// Helper function to convert asterisk-prefixed lines to bullet points
function formatTextWithBullets(text: string) {
  if (!text) return null
  
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let currentList: string[] = []
  let currentParagraph: string[] = []
  
  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(
        <p key={`para-${elements.length}`} className="mb-2">
          {currentParagraph.join('\n')}
        </p>
      )
      currentParagraph = []
    }
  }
  
  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside mb-2 space-y-1 ml-4">
          {currentList.map((item, idx) => (
            <li key={idx} className="text-muted-foreground">
              {item.trim()}
            </li>
          ))}
        </ul>
      )
      currentList = []
    }
  }
  
  lines.forEach((line) => {
    const trimmedLine = line.trim()
    
    // Check if line starts with * or - (bullet point)
    if (trimmedLine.match(/^[\*\-\•]\s+/)) {
      flushParagraph()
      // Remove the bullet marker and add to list
      const listItem = trimmedLine.replace(/^[\*\-\•]\s+/, '')
      currentList.push(listItem)
    } else if (trimmedLine === '') {
      // Empty line - flush both paragraph and list
      flushParagraph()
      flushList()
    } else {
      // Regular text line
      flushList()
      currentParagraph.push(line)
    }
  })
  
  // Flush any remaining content
  flushParagraph()
  flushList()
  
  return elements.length > 0 ? <div>{elements}</div> : null
}

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me, my skills, and experience',
}

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

export default async function AboutPage() {
  const client = createClient()
  
  let about: AboutDocument | null = null
  
  try {
    about = await client.getSingle('about') as unknown as AboutDocument
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
        {!about ? (
          <ScrollReveal direction="fade">
            <div className="text-center py-20">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About</h1>
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
                        <div className="md:w-1/3 flex-shrink-0">
                          <div className="aspect-square rounded-lg overflow-hidden shadow-xl ring-1 ring-border bg-muted">
                            <img
                              src={data.profileImage.url}
                              alt={data.profileImage.alt || data.name || 'Profile'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                      <div className={data.profileImage?.url ? 'md:w-2/3' : 'w-full'}>
                        <ScrollReveal direction="up" delay={0.2}>
                          <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            {data.name || 'About Me'}
                          </h1>
                        </ScrollReveal>
                        {data.role && (
                          <ScrollReveal direction="up" delay={0.3}>
                            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
                              {data.role}
                            </p>
                          </ScrollReveal>
                        )}
                        {data.bio && (
                          <ScrollReveal direction="up" delay={0.4}>
                            <div className="prose prose-neutral dark:prose-invert max-w-none prose-lg">
                              <PrismicRichText field={data.bio} />
                            </div>
                          </ScrollReveal>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Social Links */}
                  {data.socialLinks && data.socialLinks.length > 0 && (
                    <ScrollReveal direction="up" delay={0.2}>
                      <div className="mb-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">Connect</h2>
                        <div className="flex gap-3 flex-wrap">
                          {data.socialLinks.map((social, idx: number) => (
                            social.url && 'url' in social.url && social.url.url && (
                              <Button key={idx} asChild size="xl">
                                <a
                                  href={social.url.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group"
                                >
                                  <ExternalLink className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                  {social.platform || 'Link'}
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
                        <div className="flex items-center gap-3 mb-8">
                          <Code className="h-8 w-8 text-primary" />
                          <h2 className="text-3xl md:text-4xl font-bold">Skills & Expertise</h2>
                        </div>
                        <ScrollStagger staggerDelay={0.1}>
                          <div className="grid gap-6 md:grid-cols-2">
                            {data.skills.map((skill, idx: number) => (
                              <Card 
                                key={idx} 
                                className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-border"
                              >
                                <CardHeader>
                                  <CardTitle className="text-xl">{skill.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-muted-foreground leading-relaxed">
                                    {formatTextWithBullets(skill.description || '')}
                                  </div>
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
                        <div className="flex items-center gap-3 mb-8">
                          <Briefcase className="h-8 w-8 text-primary" />
                          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
                        </div>
                        <ScrollStagger staggerDelay={0.15}>
                          <div className="space-y-6">
                            {data.experience.map((exp, idx: number) => (
                              <Card 
                                key={idx} 
                                className="hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border-border"
                              >
                                <CardHeader>
                                  <div className="flex justify-between items-start flex-wrap gap-4">
                                    <div className="flex-1">
                                      <CardTitle className="text-xl mb-1">{exp.title}</CardTitle>
                                      <CardDescription className="text-base font-medium">
                                        {exp.company}
                                      </CardDescription>
                                    </div>
                                    {exp.dates && (
                                      <Badge variant="secondary" className="text-sm px-3 py-1">
                                        {exp.dates}
                                      </Badge>
                                    )}
                                  </div>
                                </CardHeader>
                                {exp.description && (
                                  <CardContent>
                                    <div className="prose prose-neutral dark:prose-invert prose-sm max-w-none [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-1 [&_li]:text-muted-foreground [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-1">
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

