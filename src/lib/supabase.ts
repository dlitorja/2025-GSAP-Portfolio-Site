import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Contact form will not work.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for contact form submission
export interface ContactSubmission {
  name: string
  email: string
  message: string
  status?: 'unread' | 'read' | 'archived'
  created_at?: string
  updated_at?: string
}

// Helper function to submit contact form
export async function submitContactForm(data: ContactSubmission) {
  const { data: submission, error } = await supabase
    .from('contact_submissions')
    .insert([
      {
        name: data.name,
        email: data.email,
        message: data.message,
        status: 'unread',
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return submission
}

