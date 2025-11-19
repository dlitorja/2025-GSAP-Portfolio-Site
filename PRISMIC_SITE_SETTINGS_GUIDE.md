# Prismic Site Settings Guide

This guide will help you set up and manage your site settings through Prismic CMS.

## Overview

We've created a **Site Settings** custom type in Prismic that allows you to manage:
- Site title and branding
- Hero section content
- SEO metadata
- Social media links
- Footer content

All without touching code!

## Setup Steps

### 1. Push the Custom Type to Prismic

First, you need to push the Site Settings custom type to your Prismic repository:

```bash
npx @slicemachine/cli push
```

This will sync the `customtypes/site_settings/index.json` file to your Prismic dashboard.

### 2. Create a Site Settings Document

1. Log into your Prismic dashboard at `https://litorja-portfolio.prismic.io`
2. Click **"Documents"** in the left sidebar
3. Click **"Create New"** button
4. Select **"Site Settings"** from the list
5. Fill in the fields (see below for details)
6. Click **"Save"** and then **"Publish"**

### 3. Fill in the Fields

#### Main Tab
- **Site Title**: Your name (e.g., "Dustin Litorja")
- **Hero Headline**: Your professional tagline (e.g., "Content Strategy | Marketing | Videography | Photography")
- **Hero Description**: A welcome message (e.g., "Welcome to Dustin Litorja's Portfolio")
- **Announcement Badge** (Optional): Any announcement text (e.g., "Available for freelance work")
- **Show Announcement Badge**: Toggle to show/hide the announcement badge

#### SEO Tab
- **Meta Title**: Page title for search engines
- **Meta Description**: Description for search results and social sharing
- **Meta Keywords**: Comma-separated keywords for SEO
- **Open Graph Image**: Upload a 1200x630px image for social media sharing

#### Social Links Tab
- **GitHub URL**: Your GitHub profile link
- **LinkedIn URL**: Your LinkedIn profile link
- **Twitter/X URL**: Your Twitter/X profile link
- **Instagram URL**: Your Instagram profile link

#### Footer Tab
- **Footer Text**: Copyright text (e.g., "© 2025 Dustin Litorja. All rights reserved.")
- **Footer Tagline**: Tagline displayed in footer

## How It Works

The site now fetches content from Prismic on every page load. Here's what's managed:

### Homepage (`/`)
- Hero headline
- Hero description
- Announcement badge (if enabled)
- Social media links

### Navigation (All pages)
- Site title in the header

### Footer (All pages)
- Site title
- Footer tagline
- Copyright text
- Social media links

### SEO Metadata (All pages)
- Page title
- Meta description
- Meta keywords
- Open Graph images

## Fallback Values

If Prismic is unavailable or you haven't created the document yet, the site will use these fallback values:
- **Site Title**: "Dustin Litorja"
- **Hero Headline**: "Content Strategy | Marketing | Videography | Photography"
- **Hero Description**: "Welcome to Dustin Litorja's Portfolio"

## Updating Content

To update your site content:
1. Log into Prismic
2. Go to **Documents** > **Site Settings**
3. Make your changes
4. Click **"Save"** and **"Publish"**
5. Changes will appear on your site within ~1 minute (Next.js cache)

## Environment Variables

Make sure you have these environment variables set:

```bash
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=litorja-portfolio
PRISMIC_ACCESS_TOKEN=your_access_token_here
```

## File Structure

The Prismic integration includes:

```
customtypes/
  └── site_settings/
      └── index.json          # Custom type schema

src/
  ├── types/
  │   └── prismic.ts          # TypeScript types (includes SiteSettingsDocument)
  ├── lib/
  │   └── prismic.ts          # Prismic client
  ├── app/
  │   ├── layout.tsx          # Fetches settings for nav/footer/metadata
  │   └── page.tsx            # Fetches settings for hero section
  └── components/
      ├── navigation.tsx      # Uses site title
      ├── animated-hero.tsx   # Uses hero content
      └── footer.tsx          # Uses footer content
```

## Troubleshooting

### "Document not found" error
- Make sure you've created and published the Site Settings document in Prismic
- Verify your `NEXT_PUBLIC_PRISMIC_ENVIRONMENT` matches your repository name

### Changes not appearing
- Clear your browser cache
- Restart your Next.js dev server
- Make sure you clicked "Publish" (not just "Save") in Prismic

### TypeScript errors
- Run `npm run build` to check for type errors
- Make sure all fields in Prismic match the schema

## Benefits of This Setup

✅ **No Code Deployments**: Update content without touching code  
✅ **Preview Changes**: Use Prismic's preview feature before publishing  
✅ **Content History**: Track all changes in Prismic  
✅ **Type Safety**: Full TypeScript support  
✅ **Fallback Protection**: Site works even if Prismic is down  
✅ **SEO Control**: Manage meta tags without editing code  

## Next Steps

Consider adding Prismic management for:
- About page content
- Project entries
- Blog posts
- Contact page text
- Site-wide announcements

All of these can be managed through Prismic without code changes!

