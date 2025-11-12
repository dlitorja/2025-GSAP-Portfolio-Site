'use client'

import { useState } from 'react'
import { ContactForm } from '@/components/contact-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Mail, Shield } from 'lucide-react'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  const [isHumanVerified, setIsHumanVerified] = useState(false)

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
          {/* Contact Information */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="lg:w-64 lg:flex-shrink-0 w-full">
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
                      To protect against spam, please confirm you're not a robot to reveal the email address.
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="human-check"
                        checked={isHumanVerified}
                        onChange={(e) => setIsHumanVerified(e.target.checked)}
                        className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                      />
                      <Label
                        htmlFor="human-check"
                        className="text-sm font-medium leading-none cursor-pointer select-none"
                      >
                        I'm not a robot
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="flex-1 w-full min-w-0 max-w-2xl">
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
        </div>
      </div>
    </div>
  )
}

