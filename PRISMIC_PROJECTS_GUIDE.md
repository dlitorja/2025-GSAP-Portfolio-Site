# Prismic Projects Guide

This guide explains how to create and manage projects in your Prismic CMS.

## Overview

The Project custom type supports rich media including:
- **Featured Images** - Main project thumbnail
- **Image Galleries** - Multiple images with optional captions
- **Video Embeds** - YouTube and Vimeo videos
- **Video Uploads** - Direct MP4/MOV file uploads
- **Multiple Videos** - Additional videos with titles and descriptions

---

## Creating a New Project

1. **Access Prismic Dashboard**
   - Go to your Prismic repository dashboard
   - Click "Create new" → "Project"

2. **Basic Information (Main Tab)**
   ```
   UID: unique-project-slug (auto-generated from title)
   Title: Your Project Name
   Description: 1-2 paragraph overview (supports bold, italic, links)
   Featured Image: Main project image (1200x675px recommended)
   Project Date: When the project was completed
   ```

3. **Links Tab**
   ```
   Live Project URL: https://your-project-live-site.com
   GitHub Repository URL: https://github.com/yourusername/repo
   ```

4. **Technologies Tab**
   - Click "Add item" to add each technology
   - Examples: React, Next.js, TypeScript, Tailwind CSS, GSAP
   - These appear as badges on the project card

5. **Media Tab**

   ### Image Gallery
   - Click "Add item" to add multiple images
   - Each image can have an optional caption
   - Images display in a 2-column grid on the project page
   - Recommended size: 1200x800px

   ### Videos

   **Option 1: Embed a Video (YouTube/Vimeo)**
   - Field: "Video Embed (YouTube/Vimeo)"
   - Paste the full YouTube or Vimeo URL
   - Examples:
     - `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
     - `https://vimeo.com/123456789`
   - Prismic automatically converts this to an embed

   **Option 2: Upload a Video File**
   - Field: "Uploaded Video File"
   - Click "Select a file" → Upload your video
   - Supported formats: MP4, MOV, WebM
   - Maximum size depends on your Prismic plan (Free: 100MB per file)
   - Best practices:
     - Compress videos before uploading
     - Use H.264 codec for MP4
     - Recommended resolution: 1920x1080 or 1280x720

   **Option 3: Additional Videos**
   - Use this for multiple videos beyond the main one
   - Each video can have:
     - Video Type: Choose "Embed" or "Uploaded File"
     - Video Embed URL: If using YouTube/Vimeo
     - Video File: If uploading directly
     - Video Title: Name for this video
     - Video Description: Brief description
   - Add as many videos as needed by clicking "Add item"

6. **Content Tab**
   ```
   Project Details: Full project write-up
   Supports: Headings, paragraphs, lists, bold, italic, links, embedded images
   Use this to explain:
   - Project goals and requirements
   - Your approach and process
   - Challenges faced and solutions
   - Results and outcomes
   - Lessons learned
   ```

---

## Best Practices

### Images
- **Featured Image**: Use high-quality images at 1200x675px (16:9 ratio)
- **Gallery**: Keep images under 2MB for faster loading
- **Alt Text**: Always add descriptive alt text for accessibility
- **Captions**: Use captions to provide context

### Videos

**When to Use Embeds (YouTube/Vimeo)**
- ✅ Long videos (>5 minutes)
- ✅ Videos already on YouTube/Vimeo
- ✅ Want view counts and engagement
- ✅ Unlimited storage (no file size limits)

**When to Upload Video Files**
- ✅ Short videos (<2 minutes)
- ✅ No branding/watermarks desired
- ✅ Complete control over playback
- ✅ Videos not suitable for public YouTube

**Video Optimization Tips**
1. **Compress before uploading**
   - Use [HandBrake](https://handbrake.fr/) (free)
   - Target bitrate: 5-8 Mbps for 1080p
   - Export as H.264 MP4

2. **Resolution recommendations**
   - 1920x1080 (Full HD) - Best quality
   - 1280x720 (HD) - Good balance
   - Avoid 4K unless necessary

3. **File size targets**
   - Under 50MB: Great
   - 50-100MB: Good
   - Over 100MB: Consider embedding instead

### Content Organization

**Project Structure Example:**
```
1. Featured Image (hero shot)
2. Description (overview)
3. Main Video (demo or walkthrough)
4. Technologies badges
5. Gallery (screenshots/mockups)
6. Additional Videos (specific features)
7. Full Content (detailed write-up)
```

---

## Example Project Setup

```
Title: "E-commerce Platform Redesign"
Description: "A complete redesign of an online store with focus on mobile UX and conversion optimization."

Technologies:
- Next.js
- TypeScript
- Tailwind CSS
- Stripe
- Prismic CMS

Featured Image: Homepage hero shot

Video Embed: https://youtube.com/watch?v=demo-walkthrough
(or)
Video File: Upload 30-second product tour video

Gallery:
- Before/after comparison
- Mobile mockups
- Cart checkout flow
- Product detail pages

Additional Videos:
1. "Checkout Flow Demo" (uploaded MP4)
2. "Mobile Experience" (Vimeo embed)
3. "Admin Dashboard" (YouTube embed)

Content: Full case study with problem, solution, results
```

---

## Viewing Your Projects

### Project Listing Page
- URL: `yoursite.com/projects`
- Shows all published projects in a grid
- Sorted by date (newest first)
- Shows featured image, title, description, and technologies

### Project Detail Page
- URL: `yoursite.com/projects/[project-slug]`
- Displays all project content with beautiful animations
- Media loads progressively as you scroll

---

## Publishing Workflow

1. **Create Draft**
   - Fill in all fields
   - Upload images/videos
   - Write content

2. **Preview**
   - Use Prismic's preview feature to see how it looks
   - Check all media loads correctly
   - Verify links work

3. **Publish**
   - Click "Publish" in Prismic
   - Changes go live in ~30 seconds
   - Site rebuilds automatically (on Vercel)

4. **Update Anytime**
   - Edit any field in Prismic
   - Click "Publish" again
   - No code deployment needed!

---

## Troubleshooting

### Video Not Playing
- ✅ Check file format (MP4 works best)
- ✅ Verify file uploaded successfully
- ✅ Try a different browser
- ✅ Check file size (under 100MB on free plan)

### Video Embed Not Showing
- ✅ Use full URL (not shortened links)
- ✅ Ensure video is public (not private)
- ✅ Test URL in browser first

### Images Not Loading
- ✅ Check image uploaded to Prismic
- ✅ Verify image isn't corrupted
- ✅ Try re-uploading

### Changes Not Appearing
- ✅ Ensure you clicked "Publish" (not just "Save")
- ✅ Wait 30-60 seconds for rebuild
- ✅ Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- ✅ Check Vercel deployment status

---

## Tips & Tricks

1. **Batch Upload**: Upload multiple images at once in the gallery
2. **Reorder Items**: Drag and drop to reorder gallery images or videos
3. **Duplicate Projects**: Use "Duplicate" to create similar projects quickly
4. **Rich Text Formatting**: Use the content editor's formatting toolbar
5. **Link to Other Pages**: You can link to other projects or blog posts in the content

---

## Need Help?

- **Prismic Docs**: https://prismic.io/docs
- **Video Optimization**: https://handbrake.fr/
- **Image Optimization**: https://tinypng.com/
- **Project Setup**: See example projects in your dashboard

---

**Ready to create your first project?** Head to your Prismic dashboard and start building! 🚀

