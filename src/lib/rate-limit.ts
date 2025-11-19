/**
 * Simple in-memory rate limiter for API routes
 * For production, consider using a more robust solution like Upstash Redis
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

/**
 * Rate limit configuration
 */
const RATE_LIMIT = {
  // Maximum requests per window
  maxRequests: 5,
  // Time window in milliseconds (15 minutes)
  windowMs: 15 * 60 * 1000,
}

/**
 * Clean up expired entries periodically
 */
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}, 60 * 1000) // Clean up every minute

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (e.g., IP address, user ID)
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean
  remaining: number
  resetTime: number
} {
  const now = Date.now()
  const key = identifier

  // Get or create rate limit entry
  let entry = store[key]

  // If entry doesn't exist or has expired, create a new one
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + RATE_LIMIT.windowMs,
    }
    store[key] = entry
  }

  // Increment request count
  entry.count++

  const remaining = Math.max(0, RATE_LIMIT.maxRequests - entry.count)
  const allowed = entry.count <= RATE_LIMIT.maxRequests

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
  }
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: Request): string {
  // Try to get IP from various headers (for Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')

  return (
    cfConnectingIP ||
    realIP ||
    (forwarded ? forwarded.split(',')[0].trim() : '') ||
    'unknown'
  )
}

