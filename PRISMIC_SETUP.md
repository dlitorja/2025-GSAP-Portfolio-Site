# Prismic CMS Setup Instructions

## Step 1: Create Prismic Account & Repository

1. Go to https://prismic.io/ and sign up for a free account
2. Create a new repository (choose a repository name, e.g., "litorja-portfolio")
3. Note your repository name - you'll need it for the environment variables

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
PRISMIC_ACCESS_TOKEN=your-access-token (optional for public content)
```

## Step 3: Install Slice Machine

Run in terminal:
```bash
npx @slicemachine/init@latest
```

Follow the prompts and login with your Prismic account.

## Step 4: Define Custom Types

Create the following custom types in Prismic:

### 1. Project (Repeatable Type)
- **UID**: uid
- **Title**: title (Key Text)
- **Description**: description (Rich Text)
- **Featured Image**: featuredImage (Image)
- **Gallery**: gallery (Group with Image field)
- **Technologies**: technologies (Group with text field)
- **Project Link**: projectLink (Link)
- **GitHub Link**: githubLink (Link)
- **Date**: date (Date)
- **Video Embed**: videoEmbed (Embed - supports YouTube/Vimeo)
- **Content**: content (Rich Text with embeds)

### 2. Blog Post (Repeatable Type)
- **UID**: uid
- **Title**: title (Key Text)
- **Excerpt**: excerpt (Rich Text, single paragraph)
- **Featured Image**: featuredImage (Image)
- **Author**: author (Key Text)
- **Date**: publishDate (Date)
- **Tags**: tags (Group with text field)
- **Content**: content (Rich Text with embeds, images)
- **Video Embed**: videoEmbed (Embed - supports YouTube/Vimeo)

### 3. About (Single Type)
- **Name**: name (Key Text)
- **Title/Role**: role (Key Text)
- **Bio**: bio (Rich Text)
- **Profile Image**: profileImage (Image)
- **Skills**: skills (Group with title and description)
- **Experience**: experience (Group with title, company, dates, description)
- **Social Links**: socialLinks (Group with platform and URL)
- **Resume Link**: resumeLink (Link)

## Step 5: Push Types to Prismic

After defining types in Slice Machine:
```bash
npm run slicemachine
```

Open http://localhost:9999 and push your types to Prismic.

## Step 6: Add Sample Content

1. Go to your Prismic dashboard
2. Add at least one project, one blog post, and fill in your about page
3. Publish the content

## Done!

Your Prismic CMS is now ready. The Next.js app will automatically fetch and display your content.

