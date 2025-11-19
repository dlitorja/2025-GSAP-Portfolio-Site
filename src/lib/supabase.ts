import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fail fast in production - validate environment variables
// Skip validation in test environment
if (process.env.NODE_ENV !== 'test' && (!supabaseUrl || !supabaseAnonKey)) {
  const missingVars = []
  if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!supabaseAnonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  
  const errorMessage = `Missing required Supabase environment variables: ${missingVars.join(', ')}`
  
  if (process.env.NODE_ENV === 'production') {
    throw new Error(errorMessage)
  } else {
    console.error(errorMessage)
    console.warn('Contact form will not work without Supabase credentials.')
  }
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key')

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

