# Quick Start Checklist

Use this checklist to track your progress in getting the site live.

## ☑️ Initial Setup (Local Development)

- [ ] Clone/download the project
- [ ] Run `npm install`
- [ ] Verify build works: `npm run build`
- [ ] Start dev server: `npm run dev`
- [ ] View site at http://localhost:3000

## ☑️ Prismic Configuration

See `PRISMIC_SETUP.md` for detailed instructions.

- [ ] Create Prismic account at https://prismic.io
- [ ] Create a new repository
- [ ] Note your repository name
- [ ] Create custom types:
  - [ ] Project (Repeatable)
  - [ ] Blog Post (Repeatable)
  - [ ] About (Single)
- [ ] Get API credentials
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
  PRISMIC_ACCESS_TOKEN=your-token
  ```

## ☑️ Supabase Configuration

See `SUPABASE_SETUP.md` for detailed instructions.

- [ ] Create Supabase account at https://supabase.com
- [ ] Create a new project
- [ ] Run the SQL to create `contact_submissions` table
- [ ] Get API credentials from Settings > API
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
  ```

## ☑️ GitHub Integration (Optional)

- [ ] Add to `.env.local`:
  ```
  GITHUB_USERNAME=your-username
  GITHUB_TOKEN=your-token (optional)
  ```

## ☑️ Add Content to Prismic

See `CONTENT_MIGRATION.md` for detailed instructions.

- [ ] Fill in About page:
  - [ ] Name and role
  - [ ] Profile photo
  - [ ] Bio
  - [ ] Skills
  - [ ] Experience
  - [ ] Social links
- [ ] Add at least 3-4 projects:
  - [ ] Project 1
  - [ ] Project 2
  - [ ] Project 3
  - [ ] Project 4 (optional)
- [ ] Write first blog post (optional)
- [ ] Publish all content in Prismic

## ☑️ Customize Site

- [ ] Update metadata in `src/app/layout.tsx`:
  - [ ] Site title
  - [ ] Description
  - [ ] URL
- [ ] Update social links in `src/components/footer.tsx`
- [ ] Update email in `src/app/contact/page.tsx`
- [ ] Test contact form locally
- [ ] Customize hero text in `src/components/animated-hero.tsx` (optional)

## ☑️ Test Everything Locally

- [ ] Home page displays correctly
- [ ] About page shows your content
- [ ] Projects page lists all projects
- [ ] Individual project pages work
- [ ] Blog page displays posts
- [ ] Individual blog posts open
- [ ] Contact form submits successfully
- [ ] GitHub repos display (if configured)
- [ ] Dark mode toggle works
- [ ] Navigation works on mobile
- [ ] All animations play smoothly

## ☑️ Prepare for Deployment

- [ ] Run `npm run build` to verify production build
- [ ] Create GitHub repository
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Add remote: `git remote add origin <your-repo-url>`
- [ ] Push: `git push -u origin main`

## ☑️ Deploy to Vercel

See `DEPLOYMENT.md` for detailed instructions.

- [ ] Create Vercel account at https://vercel.com
- [ ] Import project from GitHub
- [ ] Add environment variables in Vercel:
  - [ ] NEXT_PUBLIC_PRISMIC_ENVIRONMENT
  - [ ] PRISMIC_ACCESS_TOKEN
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] GITHUB_USERNAME (optional)
  - [ ] GITHUB_TOKEN (optional)
- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Visit your Vercel URL to verify

## ☑️ Configure Custom Domain

- [ ] Add domain in Vercel project settings
- [ ] Update DNS records:
  - [ ] A record: `76.76.21.21`
  - [ ] CNAME for www: `cname.vercel-dns.com`
- [ ] Wait for SSL certificate (5-10 minutes)
- [ ] Verify site loads at your domain

## ☑️ Post-Launch

- [ ] Test site on mobile devices
- [ ] Test site in different browsers
- [ ] Submit sitemap to Google Search Console
- [ ] Set up UptimeRobot monitoring
- [ ] Set up Cloudflare Analytics (optional)
- [ ] Share your new portfolio! 🎉

## ☑️ Optional Enhancements

- [ ] Add Google/Cloudflare Analytics
- [ ] Create RSS feed for blog
- [ ] Add newsletter signup
- [ ] Add more blog posts
- [ ] Add more projects
- [ ] Implement search functionality (Pagefind/Orama)
- [ ] Add testimonials section
- [ ] Create case studies for projects

## 📊 Progress Tracking

### Week 1: Setup & Configuration
- Days 1-2: Prismic and Supabase setup
- Days 3-4: Content migration
- Days 5-7: Customization and testing

### Week 2: Launch
- Days 1-2: Deployment and domain setup
- Days 3-7: Monitoring and refinements

## 🆘 Troubleshooting

**Build fails:**
- Check all environment variables are set
- Verify Prismic repository name is correct
- Check for TypeScript errors

**Prismic content not showing:**
- Verify content is published in Prismic
- Check environment variables
- Check browser console for errors

**Contact form not working:**
- Verify Supabase credentials
- Check RLS policies in Supabase
- Check browser console and Vercel logs

**Animations not working:**
- Check browser console for GSAP errors
- Verify scripts are loading
- Test in different browsers

## 📞 Need Help?

1. Check the documentation files
2. Review error messages carefully
3. Check browser console
4. Check Vercel deployment logs
5. Verify all environment variables

---

**Estimated Time to Complete:**
- Basic setup: 2-3 hours
- Content migration: 3-5 hours
- Deployment: 1-2 hours
- **Total: 6-10 hours** spread over 1-2 weeks

Take your time and don't rush! Building a quality portfolio is worth the effort. 🚀

