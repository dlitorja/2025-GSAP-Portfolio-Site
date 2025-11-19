'use client'

import { useEffect, useRef, useState } from 'react'

interface CloudflareTurnstileProps {
  siteKey: string
  onSuccess: (token: string) => void
  onError?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
  className?: string
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement | string,
        options: {
          sitekey: string
          callback: (token: string) => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact'
        }
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

export function CloudflareTurnstile({
  siteKey,
  onSuccess,
  onError,
  theme = 'auto',
  size = 'normal',
  className = '',
}: CloudflareTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Turnstile script if not already loaded
    if (!document.querySelector('script[src*="challenges.cloudflare.com"]')) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = () => {
        setIsLoaded(true)
      }
      document.body.appendChild(script)
    } else if (window.turnstile) {
      // Turnstile is already loaded, set state in next tick to avoid synchronous setState
      setTimeout(() => setIsLoaded(true), 0)
    }

    // Check if Turnstile is already available
    const checkTurnstile = setInterval(() => {
      if (window.turnstile) {
        setIsLoaded(true)
        clearInterval(checkTurnstile)
      }
    }, 100)

    return () => {
      clearInterval(checkTurnstile)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return
    }

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          onSuccess(token)
        },
        'error-callback': () => {
          onError?.()
        },
        theme,
        size,
      })
      widgetIdRef.current = widgetId
    } catch (error) {
      console.error('Failed to render Cloudflare Turnstile:', error)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (error) {
          console.error('Failed to remove Turnstile widget:', error)
        }
        widgetIdRef.current = null
      }
    }
  }, [isLoaded, siteKey, onSuccess, onError, theme, size])

  return (
    <div className={className}>
      <div ref={containerRef} className="turnstile-container" />
    </div>
  )
}

