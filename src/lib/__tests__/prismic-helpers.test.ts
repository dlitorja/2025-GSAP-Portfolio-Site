import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getSiteSettings, getPrismicLinkUrl, getPrismicRichText } from '../prismic-helpers'
import * as prismic from '@prismicio/client'

// Mock the Prismic client
const mockGetSingle = vi.fn()
const mockCreateClient = vi.fn(() => ({
  getSingle: mockGetSingle,
}))

vi.mock('../prismic', () => ({
  createClient: () => mockCreateClient(),
}))

describe('Prismic Helpers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getSiteSettings', () => {
    beforeEach(() => {
      mockGetSingle.mockClear()
    })

    it('should return site settings when available', async () => {
      const mockSettings = {
        data: {
          site_title: 'Test Site',
          meta_title: 'Test Meta',
        },
      }

      mockGetSingle.mockResolvedValue(mockSettings)

      const result = await getSiteSettings()
      
      expect(result).toEqual(mockSettings)
      expect(mockGetSingle).toHaveBeenCalledWith('site_settings', {
        fetchOptions: {
          next: { revalidate: 60 },
        },
      })
    })

    it('should return null when document is not found', async () => {
      const notFoundError = new Error('Not found')
      notFoundError.name = 'NotFoundError'
      mockGetSingle.mockRejectedValue(notFoundError)

      const result = await getSiteSettings()
      
      expect(result).toBeNull()
    })

    it('should return null and log error for non-NotFound errors', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const error = new Error('Network error')
      mockGetSingle.mockRejectedValue(error)

      const result = await getSiteSettings()
      
      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch site settings:', error)
      
      consoleSpy.mockRestore()
    })
  })

  describe('getPrismicLinkUrl', () => {
    it('should extract URL from link field', () => {
      const linkField: prismic.LinkField = {
        link_type: 'Web',
        url: 'https://example.com',
      }

      const result = getPrismicLinkUrl(linkField)
      expect(result).toBe('https://example.com')
    })

    it('should return empty string for undefined link field', () => {
      const result = getPrismicLinkUrl(undefined)
      expect(result).toBe('')
    })

    it('should return empty string for link field without URL', () => {
      const linkField = {
        link_type: 'Document',
      } as unknown as prismic.LinkField

      const result = getPrismicLinkUrl(linkField)
      expect(result).toBe('')
    })
  })

  describe('getPrismicRichText', () => {
    it('should extract text from rich text field', () => {
      const richTextField: prismic.RichTextField = [
        {
          type: 'paragraph',
          text: 'First paragraph',
          spans: [],
        },
        {
          type: 'paragraph',
          text: 'Second paragraph',
          spans: [],
        },
      ]

      const result = getPrismicRichText(richTextField)
      expect(result).toBe('First paragraph Second paragraph')
    })

    it('should return empty string for undefined rich text field', () => {
      const result = getPrismicRichText(undefined)
      expect(result).toBe('')
    })

    it('should return empty string for empty array', () => {
      const result = getPrismicRichText([])
      expect(result).toBe('')
    })

    it('should handle blocks without text property', () => {
      const richTextField: prismic.RichTextField = [
        {
          type: 'paragraph',
          text: '',
          spans: [],
        },
      ] as prismic.RichTextField

      const result = getPrismicRichText(richTextField)
      expect(result).toBe('')
    })
  })
})

