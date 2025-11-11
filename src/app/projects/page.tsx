import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExternalLink, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of my web development and design projects',
}

export default async function ProjectsPage() {
  const client = createClient()
  
  let projects: any[] = []
  
  try {
    const response = await client.getAllByType('project', {
      orderings: [{ field: 'my.project.date', direction: 'desc' }],
    })
    projects = response
  } catch (error) {
    console.error('Error fetching projects from Prismic:', error)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">
            A collection of my recent work in web development, design, and creative coding
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              No projects found. Add some projects in your Prismic dashboard.
            </p>
            <p className="text-sm text-muted-foreground">
              See <code className="bg-muted px-2 py-1 rounded">PRISMIC_SETUP.md</code> for instructions.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.uid}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  {project.data.featuredImage?.url && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={project.data.featuredImage.url}
                        alt={project.data.featuredImage.alt || project.data.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
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
                          <Badge key={idx} variant="secondary">
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      {project.data.projectLink?.url && (
                        <span className="flex items-center gap-1">
                          <ExternalLink className="h-4 w-4" />
                          Live Site
                        </span>
                      )}
                      {project.data.githubLink?.url && (
                        <span className="flex items-center gap-1">
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
        )}
      </div>
    </div>
  )
}

