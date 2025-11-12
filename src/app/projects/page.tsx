import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { ExternalLink, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my web development and design projects',
}

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

export default async function ProjectsPage() {
  const client = createClient()
  
  let projects: any[] = []
  
  try {
    const response = await client.getAllByType('project' as any, {
      orderings: [{ field: 'my.project.date', direction: 'desc' }],
    })
    projects = response
  } catch (error: any) {
    // Only log actual errors, not "not found" cases (which are expected when content isn't set up)
    const isNotFoundError = error?.name === 'NotFoundError' || 
                           error?.message?.includes('No documents were returned')
    if (!isNotFoundError) {
      console.error('Error fetching projects from Prismic:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A collection of my recent work in web development, design, and creative coding
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <ScrollReveal direction="fade">
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">
                No projects found. Add some projects in your Prismic dashboard.
              </p>
              <p className="text-sm text-muted-foreground">
                See <code className="bg-muted px-2 py-1 rounded">PRISMIC_SETUP.md</code> for instructions.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <ScrollStagger staggerDelay={0.1}>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.uid}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                    {project.data.featuredImage?.url && (
                      <div className="aspect-video overflow-hidden rounded-t-lg relative">
                        <img
                          src={project.data.featuredImage.url}
                          alt={project.data.featuredImage.alt || project.data.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {project.data.title}
                      </CardTitle>
                      {project.data.description && (
                        <CardDescription className="line-clamp-2">
                          {project.data.description[0]?.text || ''}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      {project.data.technologies && project.data.technologies.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-4">
                          {project.data.technologies.slice(0, 4).map((tech: any, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech.name}
                            </Badge>
                          ))}
                          {project.data.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.data.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        {project.data.projectLink && 'url' in project.data.projectLink && project.data.projectLink.url && (
                          <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                            <ExternalLink className="h-4 w-4" />
                            Live Site
                          </span>
                        )}
                        {project.data.githubLink && 'url' in project.data.githubLink && project.data.githubLink.url && (
                          <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                            <Github className="h-4 w-4" />
                            Source Code
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </ScrollStagger>
        )}
      </div>
    </div>
  )
}

