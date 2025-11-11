import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { PrismicRichText } from '@prismicio/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react'

interface ProjectPageProps {
  params: Promise<{ uid: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()

  try {
    const project = await client.getByUID('project', uid)
    return {
      title: project.data.title || 'Project',
      description: project.data.description?.[0]?.text || 'Project details',
    }
  } catch {
    return {
      title: 'Project Not Found',
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { uid } = await params
  const client = createClient()

  let project
  try {
    project = await client.getByUID('project', uid)
  } catch {
    notFound()
  }

  const { data } = project

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
          
          {data.date && (
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Calendar className="h-4 w-4" />
              <time>{new Date(data.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}</time>
            </div>
          )}

          {/* Technologies */}
          {data.technologies && data.technologies.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
              {data.technologies.map((tech: any, idx: number) => (
                <Badge key={idx} variant="secondary">
                  {tech.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4">
            {data.projectLink?.url && (
              <Button asChild>
                <a
                  href={data.projectLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Site
                </a>
              </Button>
            )}
            {data.githubLink?.url && (
              <Button asChild variant="outline">
                <a
                  href={data.githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Featured Image */}
        {data.featuredImage?.url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={data.featuredImage.url}
              alt={data.featuredImage.alt || data.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Description */}
        {data.description && (
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <PrismicRichText field={data.description} />
          </div>
        )}

        {/* Video Embed */}
        {data.videoEmbed?.html && (
          <Card className="p-4 mb-8">
            <div
              className="aspect-video"
              dangerouslySetInnerHTML={{ __html: data.videoEmbed.html }}
            />
          </Card>
        )}

        {/* Gallery */}
        {data.gallery && data.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {data.gallery.map((item: any, idx: number) => (
                item.image?.url && (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    <img
                      src={item.image.url}
                      alt={item.image.alt || `Gallery image ${idx + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        {data.content && (
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <PrismicRichText field={data.content} />
          </div>
        )}
      </div>
    </div>
  )
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const client = createClient()

  try {
    const projects = await client.getAllByType('project')
    return projects.map((project) => ({
      uid: project.uid,
    }))
  } catch {
    return []
  }
}

