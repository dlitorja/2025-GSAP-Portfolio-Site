import { AnimatedHero } from '@/components/animated-hero'
import { createClient } from '@/lib/prismic'
import { SiteSettingsDocument } from '@/types/prismic'

// Enable ISR - regenerate page every 60 seconds
export const revalidate = 60

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
  const homepageBackgroundVideo = (siteSettings?.data.homepage_background_video && 'url' in siteSettings.data.homepage_background_video) 
    ? siteSettings.data.homepage_background_video.url 
    : null
  
  return (
    <div className="relative min-h-screen">
      {/* Background Video (takes priority over image) */}
      {homepageBackgroundVideo ? (
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          >
            <source src={homepageBackgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark Overlay - adjustable opacity */}
          <div className="absolute inset-0 bg-black/65" />
        </div>
      ) : homepageBackgroundImage ? (
        /* Background Image with Dark Overlay */
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
          <div className="absolute inset-0 bg-black/65" />
        </div>
      ) : null}
      
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
          hasBackgroundImage={!!(homepageBackgroundVideo || homepageBackgroundImage)}
        />
      </div>
    </div>
  )
}
