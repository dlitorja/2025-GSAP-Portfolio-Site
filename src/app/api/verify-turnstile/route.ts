import { NextRequest, NextResponse } from 'next/server'

/**
 * API route to verify Cloudflare Turnstile tokens server-side
 * This provides additional security by validating tokens on the server
 * 
 * Usage:
 * POST /api/verify-turnstile
 * Body: { token: string }
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      )
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY

    if (!secretKey) {
      // If secret key is not configured, return success (client-side only verification)
      // In production, you should always configure the secret key
      console.warn('TURNSTILE_SECRET_KEY not configured - skipping server-side verification')
      return NextResponse.json({ success: true, message: 'Secret key not configured' })
    }

    // Get client IP for additional verification
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ||
                     request.headers.get('x-real-ip') ||
                     'unknown'

    // Verify token with Cloudflare
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: clientIP,
        }),
      }
    )

    const data = await verifyResponse.json()

    if (data.success) {
      return NextResponse.json({
        success: true,
        challenge_ts: data.challenge_ts,
        hostname: data.hostname,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Token verification failed',
          'error-codes': data['error-codes'],
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error verifying Turnstile token:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

