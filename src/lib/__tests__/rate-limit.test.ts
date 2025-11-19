import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { checkRateLimit, getClientIP } from '../rate-limit'

describe('Rate Limiting', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('checkRateLimit', () => {
    it('should allow requests within the limit', () => {
      const identifier = 'test-ip-1'
      
      // Make 5 requests (the limit)
      for (let i = 0; i < 5; i++) {
        const result = checkRateLimit(identifier)
        expect(result.allowed).toBe(true)
        expect(result.remaining).toBe(5 - i - 1)
      }
    })

    it('should block requests exceeding the limit', () => {
      const identifier = 'test-ip-2'
      
      // Make 5 requests (the limit)
      for (let i = 0; i < 5; i++) {
        checkRateLimit(identifier)
      }
      
      // 6th request should be blocked
      const result = checkRateLimit(identifier)
      expect(result.allowed).toBe(false)
      expect(result.remaining).toBe(0)
    })

    it('should reset after the time window expires', () => {
      const identifier = 'test-ip-3'
      
      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        checkRateLimit(identifier)
      }
      
      // Should be blocked
      expect(checkRateLimit(identifier).allowed).toBe(false)
      
      // Fast-forward time by 15 minutes + 1 second
      vi.advanceTimersByTime(15 * 60 * 1000 + 1000)
      
      // Should be allowed again (the cleanup interval should have cleared it)
      // Note: The cleanup runs every minute, so we need to account for that
      const result = checkRateLimit(identifier)
      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(4) // 5 - 1 (the new request)
    })

    it('should track different identifiers separately', () => {
      const identifier1 = 'test-ip-4'
      const identifier2 = 'test-ip-5'
      
      // Exhaust limit for identifier1
      for (let i = 0; i < 5; i++) {
        checkRateLimit(identifier1)
      }
      
      // identifier2 should still be allowed
      const result = checkRateLimit(identifier2)
      expect(result.allowed).toBe(true)
      expect(result.remaining).toBe(4)
    })

    it('should return correct reset time', () => {
      const identifier = 'test-ip-6'
      const beforeTime = Date.now()
      
      const result = checkRateLimit(identifier)
      
      expect(result.resetTime).toBeGreaterThan(beforeTime)
      expect(result.resetTime).toBeLessThanOrEqual(beforeTime + 15 * 60 * 1000)
    })
  })

  describe('getClientIP', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const request = new Request('http://example.com', {
        headers: {
          'x-forwarded-for': '192.168.1.1, 10.0.0.1',
        },
      })
      
      const ip = getClientIP(request)
      expect(ip).toBe('192.168.1.1')
    })

    it('should extract IP from x-real-ip header', () => {
      const request = new Request('http://example.com', {
        headers: {
          'x-real-ip': '192.168.1.2',
        },
      })
      
      const ip = getClientIP(request)
      expect(ip).toBe('192.168.1.2')
    })

    it('should prioritize cf-connecting-ip over other headers', () => {
      const request = new Request('http://example.com', {
        headers: {
          'cf-connecting-ip': '192.168.1.3',
          'x-forwarded-for': '192.168.1.1',
          'x-real-ip': '192.168.1.2',
        },
      })
      
      const ip = getClientIP(request)
      expect(ip).toBe('192.168.1.3')
    })

    it('should return unknown if no IP headers are present', () => {
      const request = new Request('http://example.com')
      
      const ip = getClientIP(request)
      expect(ip).toBe('unknown')
    })
  })
})

