# Push to GitHub via WSL

## Quick Push

Run the push script:
```bash
bash push-to-github.sh
```

## Manual Push (if script doesn't work)

```bash
# Navigate to project directory
cd ~/projects/Litorja\ Portfolio\ Site\ 2025

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Add Cloudflare Turnstile, GitHub Actions CI/CD, and fix all TypeScript/linting errors

- Add CloudflareTurnstile React component for email protection
- Integrate Turnstile into contact page email component
- Add server-side token verification API route
- Replace simple checkbox with Turnstile bot protection
- Add GitHub Actions workflows for CI/CD (test, lint, build, type-check)
- Fix all TypeScript errors (KeyTextField null handling, RichTextField type guards)
- Fix all ESLint errors (any types, HTML entity escaping)
- Add id property to all Prismic document types
- Fix Prismic content type assertions with proper eslint-disable comments
- Fix gallery array typing with proper GalleryItem type
- Fix KeyTextField null handling in caption fields
- Add comprehensive TypeScript error prevention guide
- Update package.json with new scripts (lint:fix, type-check, test:ci)
- Add setup documentation for Turnstile and GitHub Actions"

# Push to GitHub
git push origin main
```

## If you're on master branch

```bash
git push origin master
```
