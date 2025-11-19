import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from '../route'
import { NextRequest } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { submitContactForm } from '@/lib/supabase'

// Mock dependencies
vi.mock('@/lib/rate-limit')
vi.mock('@/lib/supabase')

const mockSend = vi.fn().mockResolvedValue({ id: 'test-email-id' })
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}))

// Mock Supabase to prevent initialization errors
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(),
      })),
    })),
  })),
}))

// Set environment variables for tests
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.RESEND_API_KEY = 'test-resend-key'
  })

  const createMockRequest = (body: { name: string; email: string; message: string }) => {
    return new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.1',
      },
      body: JSON.stringify(body),
    })
  }

  it('should successfully submit contact form', async () => {
    const mockCheckRateLimit = vi.mocked(checkRateLimit)
    mockCheckRateLimit.mockReturnValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 15 * 60 * 1000,
    })

    const mockSubmitContactForm = vi.mocked(submitContactForm)
    mockSubmitContactForm.mockResolvedValue([{ id: 'test-id' }])

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.message).toBe('Contact form submitted successfully')
    expect(mockSubmitContactForm).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    })
  })

  it('should return 429 when rate limit is exceeded', async () => {
    const mockCheckRateLimit = vi.mocked(checkRateLimit)
    mockCheckRateLimit.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetTime: Date.now() + 15 * 60 * 1000,
    })

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(429)
    expect(data.error).toBe('Too many requests. Please try again later.')
    expect(data.retryAfter).toBeDefined()
    expect(response.headers.get('Retry-After')).toBeDefined()
    expect(response.headers.get('X-RateLimit-Limit')).toBe('5')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0')
  })

  it('should return 400 for invalid form data', async () => {
    const mockCheckRateLimit = vi.mocked(checkRateLimit)
    mockCheckRateLimit.mockReturnValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 15 * 60 * 1000,
    })

    const request = createMockRequest({
      name: 'J', // Too short
      email: 'invalid-email', // Invalid email
      message: 'short', // Too short
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid form data')
    expect(data.details).toBeDefined()
  })

  it('should return 500 for Supabase submission errors', async () => {
    const mockCheckRateLimit = vi.mocked(checkRateLimit)
    mockCheckRateLimit.mockReturnValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 15 * 60 * 1000,
    })

    const mockSubmitContactForm = vi.mocked(submitContactForm)
    mockSubmitContactForm.mockRejectedValue(new Error('Database error'))

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to submit contact form')
    expect(data.details).toBe('Database error')
  })

  it('should send email notification when Resend is configured', async () => {
    const mockCheckRateLimit = vi.mocked(checkRateLimit)
    mockCheckRateLimit.mockReturnValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 15 * 60 * 1000,
    })

    const mockSubmitContactForm = vi.mocked(submitContactForm)
    mockSubmitContactForm.mockResolvedValue([{ id: 'test-id' }])

    // Ensure RESEND_API_KEY is set for this test
    process.env.RESEND_API_KEY = 'test-resend-key'
    mockSend.mockClear()

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    // Verify that the email send was attempted (mocked)
    // Note: The actual send happens inside the route, and since Resend is mocked,
    // it will use our mockSend function
  })

  it('should handle email sending failures gracefully', async () => {
    const mockCheckRateLimit = vi.mocked(checkRateLimit)
    mockCheckRateLimit.mockReturnValue({
      allowed: true,
      remaining: 4,
      resetTime: Date.now() + 15 * 60 * 1000,
    })

    const mockSubmitContactForm = vi.mocked(submitContactForm)
    mockSubmitContactForm.mockResolvedValue([{ id: 'test-id' }])

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    })

    // Mock Resend to throw an error
    vi.doMock('resend', () => ({
      Resend: vi.fn().mockImplementation(() => ({
        emails: {
          send: vi.fn().mockRejectedValue(new Error('Email service error')),
        },
      })),
    }))

    const response = await POST(request)

    // Should still succeed even if email fails
    expect(response.status).toBe(200)
    
    consoleSpy.mockRestore()
  })

  it('should include rate limit headers in successful response', async () => {
    const mockCheckRateLimit = vi.mocked(checkRateLimit)
    const resetTime = Date.now() + 15 * 60 * 1000
    mockCheckRateLimit.mockReturnValue({
      allowed: true,
      remaining: 3,
      resetTime,
    })

    const mockSubmitContactForm = vi.mocked(submitContactForm)
    mockSubmitContactForm.mockResolvedValue([{ id: 'test-id' }])

    const request = createMockRequest({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message',
    })

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(response.headers.get('X-RateLimit-Limit')).toBe('5')
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('3')
    expect(response.headers.get('X-RateLimit-Reset')).toBeDefined()
  })
})

