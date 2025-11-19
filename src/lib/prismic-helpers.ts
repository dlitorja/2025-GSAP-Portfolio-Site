import { createClient } from './prismic'
import { SiteSettingsDocument } from '@/types/prismic'
import * as prismic from '@prismicio/client'

/**
 * Centralized function to fetch site settings from Prismic
 * Includes proper error handling and type safety
 */
export async function getSiteSettings(): Promise<SiteSettingsDocument | null> {
  const client = createClient()
  
  try {
    const document = await client.getSingle('site_settings', {
      // Add revalidation - cache for 60 seconds
      fetchOptions: {
        next: { revalidate: 60 }
      }
    })
    
    // Type assertion - Prismic returns a different type structure than our custom interface
    // Using unknown first to safely cast to our custom type
    return document as unknown as SiteSettingsDocument
  } catch (error: any) {
    // Only log actual errors, not "not found" cases (which are expected when content isn't set up)
    const isNotFoundError = error?.name === 'NotFoundError' || 
                           error?.message?.includes('No documents were returned')
    if (!isNotFoundError) {
      console.error('Failed to fetch site settings:', error)
    }
    return null
  }
}

/**
 * Helper to safely extract URL from Prismic link field
 */
export function getPrismicLinkUrl(linkField: prismic.LinkField | undefined): string {
  if (!linkField) return ''
  if ('url' in linkField && linkField.url) return linkField.url
  return ''
}

/**
 * Helper to safely extract text from Prismic rich text field
 */
export function getPrismicRichText(richTextField: prismic.RichTextField | undefined): string {
  if (!richTextField || !Array.isArray(richTextField)) return ''
  return richTextField
    .map((block: any) => block.text || '')
    .join(' ')
    .trim()
}

