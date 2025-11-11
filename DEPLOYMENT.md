# Deployment Guide

## Prerequisites

Before deploying, make sure you have:

1. ✅ Prismic account set up and content types configured
2. ✅ Supabase project created with contact_submissions table
3. ✅ GitHub repository with your code
4. ✅ Domain registered (litorja.com)

## Deploy to Vercel

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Portfolio site with Next.js, GSAP, Prismic, and Supabase"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Step 2: Import Project to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

Add the following environment variables in Vercel project settings:

```
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
PRISMIC_ACCESS_TOKEN=your-access-token

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

GITHUB_TOKEN=your-github-token (optional)
GITHUB_USERNAME=your-github-username
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be live at `your-project.vercel.app`

### Step 5: Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add your domain: `litorja.com`
3. Add www subdomain: `www.litorja.com`
4. Vercel will provide DNS records

### Step 6: Update DNS Records

In your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare):

1. Add A record pointing to Vercel's IP: `76.76.21.21`
2. Add CNAME for www: `cname.vercel-dns.com`

**Or use Cloudflare DNS (recommended for analytics):**

1. Point your domain's nameservers to Cloudflare
2. Add Vercel's DNS records in Cloudflare
3. Enable Cloudflare's proxy (orange cloud)
4. This allows you to use Cloudflare Analytics

### Step 7: SSL Certificate

Vercel automatically provisions an SSL certificate. Wait 5-10 minutes after configuring your domain.

## Alternative: Deploy to Railway

### Step 1: Create Railway Account

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Configure

1. Railway auto-detects Next.js
2. Add environment variables in the Variables tab
3. Click "Deploy"

### Step 4: Custom Domain

1. In project settings, click "Domains"
2. Add custom domain: `litorja.com`
3. Configure DNS records as provided

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify Prismic content displays
- [ ] Test contact form submission
- [ ] Check GitHub repos display
- [ ] Verify dark/light mode toggle works
- [ ] Test responsive design on mobile
- [ ] Check GSAP animations play smoothly
- [ ] Verify sitemap.xml is accessible
- [ ] Confirm robots.txt is correct
- [ ] Test Open Graph tags (use https://www.opengraph.xyz/)
- [ ] Set up UptimeRobot monitoring
- [ ] Enable Cloudflare Analytics

## UptimeRobot Setup

1. Go to [UptimeRobot](https://uptimerobot.com)
2. Create a free account
3. Add new monitor:
   - Monitor Type: HTTPS
   - URL: https://litorja.com
   - Monitoring Interval: 5 minutes
4. Add email alerts

## Cloudflare Analytics Setup

1. Use Cloudflare DNS (see domain setup above)
2. Go to Analytics tab in Cloudflare dashboard
3. View privacy-friendly analytics without cookies

## Continuous Deployment

Every push to your `main` branch automatically deploys to production.

For preview deployments:
- Create a new branch
- Push changes
- Vercel creates a preview URL
- Merge to main when ready

## Monitoring

- **Vercel Analytics**: Built-in analytics (optional paid tier)
- **Cloudflare Analytics**: Free, privacy-friendly
- **UptimeRobot**: Monitor uptime and get alerts
- **Vercel Logs**: Real-time function logs

## Performance

Optimize for Lighthouse 90+ scores:
- Images are auto-optimized by Next.js
- Static pages are pre-rendered
- Prismic content is cached
- GSAP is code-split

## Cost Breakdown

- Vercel: $0/month (Hobby tier)
- Prismic: $0/month (Free tier, 1 user)
- Supabase: $0/month (Free tier)
- Domain: ~$10-15/year
- UptimeRobot: $0/month (Free tier)
- Cloudflare: $0/month

**Total: $0/month** (domain excluded)

## Troubleshooting

### Build Fails

Check Vercel logs for errors. Common issues:
- Missing environment variables
- TypeScript errors
- Invalid Prismic queries

### 404 on Dynamic Routes

Ensure Prismic content is published and UIDs match routes.

### Contact Form Not Working

1. Verify Supabase credentials
2. Check RLS policies on contact_submissions table
3. Review API route logs in Vercel

### GSAP Animations Not Working

Ensure `gsap` is properly imported. Check browser console for errors.

## Support

For issues:
1. Check Vercel logs
2. Review browser console
3. Test locally with `npm run dev`
4. Verify all environment variables are set

