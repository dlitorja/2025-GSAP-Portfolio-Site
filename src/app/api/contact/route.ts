import { NextRequest, NextResponse } from 'next/server'
import { submitContactForm } from '@/lib/supabase'
import { z } from 'zod'
import { Resend } from 'resend'

// Initialize Resend only if API key is present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // Submit to Supabase (only if configured)
    try {
      await submitContactForm(validatedData)
    } catch (supabaseError) {
      // Log Supabase error but continue with email notification
      console.error('Failed to save to Supabase:', supabaseError)
    }

    // Send email notification via Resend (only if configured)
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact Form <noreply@litorja.com>',
          to: 'dustin@litorja.com',
          subject: `New Contact Form Submission from ${validatedData.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Submitted via litorja.com contact form</p>
          `,
        })
      } catch (emailError) {
        // Log email error but don't fail the request
        console.error('Failed to send email notification:', emailError)
      }
    } else {
      console.log('Resend API key not configured - email notification skipped')
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }

    // Log the actual error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Detailed error:', errorMessage)

    return NextResponse.json(
      { error: 'Failed to submit contact form', details: errorMessage },
      { status: 500 }
    )
  }
}

