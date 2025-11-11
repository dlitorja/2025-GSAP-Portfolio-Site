'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

interface VideoEmbedProps {
  url: string
  title?: string
  thumbnail?: string
}

function getVideoInfo(url: string) {
  // YouTube patterns
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const youtubeMatch = url.match(youtubeRegex)
  
  if (youtubeMatch) {
    return {
      type: 'youtube' as const,
      id: youtubeMatch[1],
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
      thumbnail: `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`,
    }
  }

  // Vimeo patterns
  const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/
  const vimeoMatch = url.match(vimeoRegex)
  
  if (vimeoMatch) {
    return {
      type: 'vimeo' as const,
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      thumbnail: null, // Vimeo thumbnails require API call
    }
  }

  return null
}

export function VideoEmbed({ url, title = 'Video', thumbnail }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoInfo = getVideoInfo(url)

  if (!videoInfo) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Invalid video URL</p>
      </div>
    )
  }

  const displayThumbnail = thumbnail || videoInfo.thumbnail

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden group">
      {!isLoaded && displayThumbnail && (
        <>
          <img
            src={displayThumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors cursor-pointer"
            aria-label="Play video"
          >
            <div className="bg-primary/90 hover:bg-primary rounded-full p-4 transition-all group-hover:scale-110">
              <Play className="h-8 w-8 text-primary-foreground fill-current ml-1" />
            </div>
          </button>
        </>
      )}
      {(isLoaded || !displayThumbnail) && (
        <iframe
          src={`${videoInfo.embedUrl}?autoplay=${isLoaded ? '1' : '0'}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  )
}

// Specific components for convenience
export function YouTubeEmbed({ videoId, title }: { videoId: string; title?: string }) {
  return (
    <VideoEmbed
      url={`https://www.youtube.com/watch?v=${videoId}`}
      title={title}
    />
  )
}

export function VimeoEmbed({ videoId, title }: { videoId: string; title?: string }) {
  return (
    <VideoEmbed
      url={`https://vimeo.com/${videoId}`}
      title={title}
    />
  )
}

