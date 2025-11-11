# Content Migration Guide

## Migrating from Carrd.co to Prismic

This guide will help you transfer your content from Carrd.co to your new Prismic-powered site.

## Step 1: Export Content from Carrd.co

Carrd.co doesn't have a built-in export feature, so you'll need to manually copy your content:

1. Go to your Carrd.co site editor
2. Open each section
3. Copy text content to a text file or document
4. Download any images you're using
5. Note any links or external resources

### Organize Your Content

Create a folder structure:
```
carrd-content/
  ├── images/
  │   ├── profile.jpg
  │   ├── project-1.jpg
  │   └── project-2.jpg
  ├── about.txt
  ├── projects.txt
  └── contact-info.txt
```

## Step 2: Set Up Prismic Content Types

Follow `PRISMIC_SETUP.md` to create these content types:
- About (Single Type)
- Project (Repeatable Type)
- Blog Post (Repeatable Type)

## Step 3: Migrate About Page Content

1. Log into your Prismic dashboard
2. Go to "About" (Single Type)
3. Fill in fields:
   - **Name**: Your full name
   - **Role/Title**: Your job title or tagline
   - **Bio**: Copy your bio from Carrd.co (can use rich text formatting)
   - **Profile Image**: Upload your profile photo
   - **Skills**: Add your skills (one at a time)
   - **Experience**: Add work experience
   - **Social Links**: Add GitHub, LinkedIn, Twitter, etc.
   - **Resume Link**: Add link to your resume if you have one
4. Click "Save"
5. Click "Publish"

## Step 4: Migrate Projects

For each project on your Carrd.co site:

1. In Prismic, create a new "Project" document
2. Fill in fields:
   - **UID**: Create a URL-friendly slug (e.g., "portfolio-website")
   - **Title**: Project name
   - **Description**: Short description
   - **Featured Image**: Upload main project image
   - **Gallery**: Upload additional project screenshots
   - **Technologies**: Add tech stack (Next.js, React, etc.)
   - **Project Link**: Live site URL
   - **GitHub Link**: Repository URL
   - **Date**: Project completion date
   - **Content**: Detailed project description (rich text)
   - **Video Embed**: YouTube/Vimeo URL if you have a demo
3. Click "Save"
4. Click "Publish"
5. Repeat for all projects

### Tips for Project Migration

- Use high-quality images (at least 1200px wide)
- Write detailed descriptions of your process
- Highlight technologies and challenges overcome
- Include links to live demos and source code

## Step 5: Create Initial Blog Posts (Optional)

If you want to start blogging:

1. Create a new "Blog Post" document
2. Fill in fields:
   - **UID**: URL slug (e.g., "getting-started-with-nextjs")
   - **Title**: Post title
   - **Excerpt**: Short summary
   - **Featured Image**: Cover image
   - **Author**: Your name
   - **Publish Date**: Today's date
   - **Tags**: Add relevant tags
   - **Content**: Your article (rich text)
   - **Video Embed**: Optional video
3. Save and publish

### Blog Post Ideas

- "How I Built My Portfolio with Next.js and GSAP"
- "Migrating from Carrd to a Custom Site"
- "My Web Development Journey"
- Case studies for major projects

## Step 6: Verify Content Display

1. Run your local development server: `npm run dev`
2. Check these pages:
   - `/` - Home page (projects should preview)
   - `/about` - Your about page
   - `/projects` - All projects
   - `/projects/[project-slug]` - Individual project pages
   - `/blog` - Blog listing (if you added posts)
3. Make sure all images load and text displays correctly

## Step 7: Optimize Images

Before uploading to Prismic, optimize images:

1. Use tools like:
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - ImageOptim (Mac)
2. Recommended sizes:
   - Profile photos: 800x800px
   - Project images: 1200x630px (16:9 ratio)
   - Cover images: 1600x900px
3. Use WebP or JPEG format
4. Keep file sizes under 500KB

## Step 8: Update Domain Settings

Once content is migrated and site is deployed:

1. Keep Carrd.co site live while testing new site
2. Test thoroughly at your Vercel URL
3. When ready, update DNS to point to Vercel (see DEPLOYMENT.md)
4. Monitor for 24-48 hours
5. Cancel Carrd.co subscription once everything works

## Content Checklist

### About Page
- [ ] Name and title
- [ ] Profile photo
- [ ] Bio/description
- [ ] Skills list
- [ ] Work experience
- [ ] Social media links
- [ ] Resume/CV link

### Projects
- [ ] All projects migrated
- [ ] Project descriptions written
- [ ] Screenshots/images uploaded
- [ ] Technologies listed
- [ ] Live demo links added
- [ ] GitHub links added
- [ ] Dates added

### Blog (Optional)
- [ ] First blog post published
- [ ] Images optimized
- [ ] Tags added
- [ ] Author info correct

### Home Page
- [ ] Hero text updated (edit `src/app/page.tsx`)
- [ ] Social links updated
- [ ] Email address correct

### Contact Page
- [ ] Email address in footer updated
- [ ] Contact form tested

## Tips for Success

1. **Start Small**: Migrate your About page first, test, then do projects
2. **Use Rich Text**: Prismic's rich text editor supports formatting, links, and images
3. **Preview Before Publishing**: Use Prismic's preview feature
4. **Version Control**: Prismic keeps version history, so you can revert changes
5. **Mobile Check**: View Prismic content on mobile after publishing

## Need Help?

- Prismic Documentation: https://prismic.io/docs
- Prismic Community: https://community.prismic.io/
- Next.js Docs: https://nextjs.org/docs

## Timeline Estimate

- About page: 30 minutes
- 5-6 projects: 2-3 hours
- First blog post: 1 hour
- Image optimization: 1 hour
- Testing: 1 hour

**Total: 5-7 hours** for a complete migration

Take your time and migrate in stages. You can keep your Carrd.co site live until you're 100% happy with the new site!

