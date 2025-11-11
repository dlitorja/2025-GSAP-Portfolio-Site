# Litorja Portfolio

A modern, visually impressive portfolio website built with Next.js 15, featuring GSAP animations, Prismic CMS for content management, and Supabase for backend functionality.

## Features

- **Modern Stack**: Next.js 15, React 19, TypeScript
- **Stunning Animations**: GSAP with ScrollTrigger for smooth, professional animations
- **Content Management**: Prismic CMS for easy content updates without coding
- **Backend**: Supabase for contact form submissions and data storage
- **Beautiful UI**: Tailwind CSS + shadcn/ui components
- **Dark Mode**: Automatic theme switching with next-themes
- **GitHub Integration**: Showcase your repositories automatically
- **Media Support**: YouTube and Vimeo video embeds, optimized image handling
- **SEO Optimized**: Metadata, Open Graph tags, sitemap, structured data
- **Fully Responsive**: Mobile-first design
- **Testing**: Vitest for unit tests
- **Zero-Cost Hosting**: Vercel (or Railway) deployment

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: GSAP (GreenSock)
- **CMS**: Prismic
- **Database**: Supabase
- **Forms**: React Hook Form + Zod validation
- **Deployment**: Vercel
- **Testing**: Vitest + React Testing Library

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── blog/              # Blog listing & posts
│   ├── contact/           # Contact page
│   ├── projects/          # Projects listing & details
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── animated-hero.tsx
│   ├── contact-form.tsx
│   ├── footer.tsx
│   ├── navigation.tsx
│   ├── scroll-reveal.tsx
│   ├── theme-toggle.tsx
│   ├── video-embed.tsx
│   └── ...
├── lib/                   # Utilities and configurations
│   ├── prismic.ts        # Prismic client
│   ├── supabase.ts       # Supabase client
│   ├── github.ts         # GitHub API
│   ├── gsap-utils.ts     # GSAP utilities
│   └── utils.ts          # General utilities
└── types/                # TypeScript types
    └── prismic.ts        # Prismic type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Prismic account (free)
- Supabase account (free)
- GitHub account
- Domain (optional, for production)

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd litorja-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Prismic
NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
PRISMIC_ACCESS_TOKEN=your-access-token

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# GitHub (optional)
GITHUB_TOKEN=your-github-token
GITHUB_USERNAME=your-github-username
```

4. **Set up Prismic**

Follow the instructions in `PRISMIC_SETUP.md` to:
- Create a Prismic repository
- Define content types
- Add sample content

5. **Set up Supabase**

Follow the instructions in `SUPABASE_SETUP.md` to:
- Create a Supabase project
- Set up the database table
- Configure RLS policies

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run Vitest tests
npm run test:ui      # Run Vitest with UI
npm run slicemachine # Start Prismic Slice Machine
```

## Documentation

- **[PRISMIC_SETUP.md](./PRISMIC_SETUP.md)** - Set up Prismic CMS
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Set up Supabase backend
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to Vercel/Railway
- **[CONTENT_MIGRATION.md](./CONTENT_MIGRATION.md)** - Migrate from Carrd.co

## Key Pages

- **`/`** - Home page with hero, featured projects, and latest blog posts
- **`/about`** - About page with bio, skills, and experience
- **`/projects`** - Projects listing page
- **`/projects/[uid]`** - Individual project details
- **`/blog`** - Blog listing page
- **`/blog/[uid]`** - Individual blog post
- **`/contact`** - Contact form

## Customization

### Update Site Information

1. **Edit metadata** in `src/app/layout.tsx`
2. **Update social links** in `src/components/footer.tsx` and `src/components/navigation.tsx`
3. **Customize colors** in `src/app/globals.css`

### Add New Features

- **Components**: Add to `src/components/`
- **Pages**: Add to `src/app/`
- **API Routes**: Add to `src/app/api/`
- **Utilities**: Add to `src/lib/`

## Deployment

Deploy to Vercel in 3 steps:

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables

See `DEPLOYMENT.md` for detailed instructions.

## Performance

- Lighthouse Score: 90+ (target)
- Optimized images with Next.js Image
- Static page generation where possible
- Efficient GSAP animations
- Code splitting and lazy loading

## Cost Breakdown

- **Vercel**: $0/month (Hobby tier)
- **Prismic**: $0/month (Free tier)
- **Supabase**: $0/month (Free tier)
- **Domain**: ~$10-15/year
- **Total**: $0/month

## License

MIT License - feel free to use this template for your own portfolio!

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for free hosting
- Prismic for the CMS
- Supabase for the backend
- shadcn for the beautiful UI components
- GSAP for powerful animations

## Support

For issues or questions:
1. Check the documentation files
2. Review the code comments
3. Check [Next.js docs](https://nextjs.org/docs)
4. Check [Prismic docs](https://prismic.io/docs)
5. Check [Supabase docs](https://supabase.com/docs)

---

Built with ❤️ using modern web technologies
