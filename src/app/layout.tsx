import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { createClient } from "@/lib/prismic";
import { SiteSettingsDocument } from "@/types/prismic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate metadata dynamically from Prismic
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  let siteSettings: SiteSettingsDocument | null = null
  
  try {
    siteSettings = await client.getSingle('site_settings') as unknown as SiteSettingsDocument
  } catch (error: any) {
    // Only log actual errors, not "not found" cases (which are expected when content isn't set up)
    const isNotFoundError = error?.name === 'NotFoundError' || 
                           error?.message?.includes('No documents were returned')
    if (!isNotFoundError) {
      console.error('Failed to fetch site settings for metadata:', error)
    }
  }

  // Fallback values
  const siteTitle = siteSettings?.data.site_title || "Dustin Litorja"
  const metaTitle = siteSettings?.data.meta_title || "Dustin Litorja - Content Strategy | Marketing | Videography | Photography"
  const metaDescription = siteSettings?.data.meta_description || "Portfolio of Dustin Litorja - Content Strategy, Marketing, Videography, and Photography professional."
  const metaKeywords = siteSettings?.data.meta_keywords || "portfolio, content strategy, marketing, videography, photography, Dustin Litorja"
  const ogImageUrl = siteSettings?.data.og_image?.url || "/og-image.jpg"

  return {
    title: {
      default: metaTitle,
      template: `%s | ${siteTitle}`,
    },
    description: metaDescription,
    keywords: metaKeywords.split(',').map(k => k.trim()),
    authors: [{ name: siteTitle }],
    creator: siteTitle,
    metadataBase: new URL("https://litorja.com"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://litorja.com",
      siteName: `${siteTitle} Portfolio`,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteTitle} Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch site settings for navigation
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

  const siteTitle = siteSettings?.data.site_title || 'Dustin Litorja'
  const footerTagline = siteSettings?.data.footer_tagline || 'Creative developer and designer crafting beautiful digital experiences with modern web technologies.'
  const footerText = siteSettings?.data.footer_text || ''
  const githubUrl = (siteSettings?.data.github_url && 'url' in siteSettings.data.github_url) ? siteSettings.data.github_url.url : ''
  const linkedinUrl = (siteSettings?.data.linkedin_url && 'url' in siteSettings.data.linkedin_url) ? siteSettings.data.linkedin_url.url : ''
  const twitterUrl = (siteSettings?.data.twitter_url && 'url' in siteSettings.data.twitter_url) ? siteSettings.data.twitter_url.url : ''
  const instagramUrl = (siteSettings?.data.instagram_url && 'url' in siteSettings.data.instagram_url) ? siteSettings.data.instagram_url.url : ''
  const hasHomepageBackground = !!siteSettings?.data.homepage_background_image?.url
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation siteTitle={siteTitle} hasHomepageBackground={hasHomepageBackground} />
          <main className="flex-1">{children}</main>
          <Footer 
            siteTitle={siteTitle}
            footerTagline={footerTagline}
            footerText={footerText}
            githubUrl={githubUrl}
            linkedinUrl={linkedinUrl}
            twitterUrl={twitterUrl}
            instagramUrl={instagramUrl}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
