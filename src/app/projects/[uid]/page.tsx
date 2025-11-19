import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/prismic'
import { PrismicRichText } from '@prismicio/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollReveal, ScrollStagger } from '@/components/scroll-reveal'
import { ArrowLeft, ExternalLink, Github, Calendar } from 'lucide-react'
import { ProjectDocument } from '@/types/prismic'

interface ProjectPageProps {
  params: Promise<{ uid: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { uid } = await params
  const client = createClient()

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const project = await client.getByUID('project' as any, uid) as unknown as ProjectDocument
    const descriptionText = project.data.description?.[0] && 'text' in project.data.description[0]
      ? project.data.description[0].text
      : 'Project details'
    return {
      title: project.data.title || 'Project',
      description: descriptionText,
    }
  } catch {
    return {
      title: 'Project Not Found',
    }
  }
}

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { uid } = await params
  const client = createClient()

  let project: ProjectDocument | null = null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    project = await client.getByUID('project' as any, uid) as unknown as ProjectDocument
  } catch {
    notFound()
  }

  const { data } = project

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <ScrollReveal direction="fade">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </ScrollReveal>

        {/* Project Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
            
            {data.date && (
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
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
                {data.technologies.map((tech, idx: number) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4 flex-wrap">
              {data.projectLink && 'url' in data.projectLink && data.projectLink.url && (
                <Button asChild size="lg">
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
              {data.githubLink && 'url' in data.githubLink && data.githubLink.url && (
                <Button asChild variant="outline" size="lg">
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
        </ScrollReveal>

        <Separator className="my-12" />

        {/* Featured Image */}
        {data.featuredImage?.url && (
          <ScrollReveal direction="fade" delay={0.2}>
            <div className="mb-12 rounded-lg overflow-hidden shadow-2xl ring-1 ring-border">
              <img
                src={data.featuredImage.url}
                alt={data.featuredImage.alt || data.title || 'Project image'}
                className="w-full h-auto"
              />
            </div>
          </ScrollReveal>
        )}

        {/* Description */}
        {data.description && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none mb-12">
              <PrismicRichText field={data.description} />
            </div>
          </ScrollReveal>
        )}

        {/* Video Embed */}
        {data.videoEmbed?.html && (
          <ScrollReveal direction="fade" delay={0.2}>
            <Card className="p-4 mb-12 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Project Video</h2>
              <div
                className="aspect-video rounded-lg overflow-hidden"
                dangerouslySetInnerHTML={{ __html: data.videoEmbed.html }}
              />
            </Card>
          </ScrollReveal>
        )}

        {/* Uploaded Video File */}
        {data.videoFile && 'url' in data.videoFile && data.videoFile.url && (
          <ScrollReveal direction="fade" delay={0.2}>
            <Card className="p-4 mb-12 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Project Video</h2>
              <video
                className="w-full aspect-video rounded-lg"
                controls
                preload="metadata"
              >
                <source src={data.videoFile.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Card>
          </ScrollReveal>
        )}

        {/* Gallery */}
        {data.gallery && data.gallery.length > 0 && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Gallery</h2>
              <ScrollStagger staggerDelay={0.1}>
                <div className="grid gap-4 md:grid-cols-2">
                  {data.gallery.map((item, idx: number) => (
                    item.image?.url && (
                      <div key={idx} className="rounded-lg overflow-hidden shadow-lg ring-1 ring-border hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={item.image.url}
                          alt={item.image.alt || item.caption || `Gallery image ${idx + 1}` || 'Project gallery image'}
                          className="w-full h-auto"
                        />
                        {item.caption && (
                          <div className="p-4 bg-muted">
                            <p className="text-sm text-muted-foreground">{item.caption}</p>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </ScrollStagger>
            </div>
          </ScrollReveal>
        )}

        {/* Additional Videos */}
        {data.additionalVideos && data.additionalVideos.length > 0 && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Additional Videos</h2>
              <ScrollStagger staggerDelay={0.1}>
                <div className="space-y-6">
                  {data.additionalVideos.map((video, idx: number) => (
                    <Card key={idx} className="p-4 shadow-lg">
                      {video.videoTitle && (
                        <h3 className="text-xl font-semibold mb-2">{video.videoTitle}</h3>
                      )}
                      {video.videoDescription && (
                        <p className="text-muted-foreground mb-4">{video.videoDescription}</p>
                      )}
                      {/* Embedded Video */}
                      {video.videoEmbed?.html && (
                        <div
                          className="aspect-video rounded-lg overflow-hidden"
                          dangerouslySetInnerHTML={{ __html: video.videoEmbed.html }}
                        />
                      )}
                      {/* Uploaded Video File */}
                      {video.videoFile && 'url' in video.videoFile && video.videoFile.url && (
                        <video
                          className="w-full aspect-video rounded-lg"
                          controls
                          preload="metadata"
                        >
                          <source src={video.videoFile.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </Card>
                  ))}
                </div>
              </ScrollStagger>
            </div>
          </ScrollReveal>
        )}

        {/* Main Content */}
        {data.content && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
              <PrismicRichText field={data.content} />
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const client = createClient()

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const projects = await client.getAllByType('project' as any)
    return projects.map((project) => ({
      uid: project.uid,
    }))
  } catch {
    return []
  }
}

