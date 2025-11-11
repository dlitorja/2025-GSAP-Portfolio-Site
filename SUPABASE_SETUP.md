# Supabase Setup Instructions

## Step 1: Create Supabase Account & Project

1. Go to https://supabase.com/ and sign up for a free account
2. Create a new project
3. Choose a database password and region
4. Wait for the project to be provisioned

## Step 2: Get API Credentials

1. In your Supabase project dashboard, go to **Settings** > **API**
2. Copy the following:
   - **Project URL** (API URL)
   - **anon/public** key

## Step 3: Configure Environment Variables

Add to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Create Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Run the following SQL to create the contact submissions table:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Create an index on status for filtering
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous inserts (for the contact form)
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Create a policy to allow reading your own submissions
-- (This would require authentication, which we're not using yet)
-- If you want to add an admin panel later, you can add policies for that
```

## Step 5: Optional Storage Setup (for future image uploads)

If you plan to allow image uploads in the future:

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `portfolio-images`
3. Set it to **Public** if you want images to be publicly accessible
4. Configure upload policies as needed

## Step 6: Test Connection

The contact form in your Next.js app will now be able to submit data to Supabase.

You can view submissions in your Supabase dashboard under **Table Editor** > **contact_submissions**.

## Done!

Your Supabase backend is ready. The contact form will automatically submit to this database.

