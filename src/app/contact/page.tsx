'use client'

import { useState } from 'react'
import { ContactForm } from '@/components/contact-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Mail, Shield } from 'lucide-react'
import { CloudflareTurnstile } from '@/components/cloudflare-turnstile'

export default function ContactPage() {
  const [isHumanVerified, setIsHumanVerified] = useState(false)
  const [turnstileError, setTurnstileError] = useState(false)
  
  // Get Turnstile site key from environment variables
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
  
  const handleTurnstileSuccess = async (token: string) => {
    // Verify token server-side for additional security
    try {
      const response = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      const data = await response.json()
      if (data.success) {
        setIsHumanVerified(true)
        setTurnstileError(false)
      } else {
        console.error('Turnstile verification failed:', data)
        handleTurnstileError()
      }
    } catch (error) {
      console.error('Failed to verify token:', error)
      // On error, still allow verification (graceful degradation)
      // In production, you might want to be stricter
      setIsHumanVerified(true)
      setTurnstileError(false)
    }
  }
  
  const handleTurnstileError = () => {
    setTurnstileError(true)
    setIsHumanVerified(false)
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal direction="fade" delay={0.1}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'd love to hear from you.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-5xl mx-auto">
          {/* Contact Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="flex-1 w-full min-w-0 max-w-2xl order-1 lg:order-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send a Message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </ScrollReveal>

          {/* Contact Information */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="lg:w-64 lg:flex-shrink-0 w-full order-2 lg:order-2">
              {isHumanVerified ? (
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <a
                      href="mailto:dustin@litorja.com"
                      className="text-primary hover:underline transition-colors break-all"
                    >
                      dustin@litorja.com
                    </a>
                  </CardContent>
                </Card>
              ) : (
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      To protect against spam, please verify you're human to reveal the email address.
                    </p>
                    {turnstileSiteKey ? (
                      <div className="flex flex-col items-center space-y-3">
                        <CloudflareTurnstile
                          siteKey={turnstileSiteKey}
                          onSuccess={handleTurnstileSuccess}
                          onError={handleTurnstileError}
                          theme="auto"
                          size="normal"
                          className="w-full flex justify-center"
                        />
                        {turnstileError && (
                          <p className="text-sm text-destructive">
                            Verification failed. Please try again.
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground p-4 bg-muted rounded-md">
                        <p className="mb-2">Turnstile is not configured.</p>
                        <p className="text-xs">
                          Add <code className="bg-background px-1 py-0.5 rounded">NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> to your environment variables.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

