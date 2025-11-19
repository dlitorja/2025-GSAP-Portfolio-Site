#!/bin/bash

# Script to push changes to GitHub
# Run with: bash push-to-github.sh

set -e  # Exit on error

echo "🚀 Starting git push process..."

# Navigate to project directory
cd "$(dirname "$0")"

# Check git status
echo "📊 Checking git status..."
git status

# Add all changes
echo "➕ Staging all changes..."
git add .

# Commit with descriptive message
echo "💾 Committing changes..."
git commit -m "Add Cloudflare Turnstile, GitHub Actions CI/CD, and fix TypeScript errors

- Add CloudflareTurnstile React component for email protection
- Integrate Turnstile into contact page email component
- Add server-side token verification API route
- Replace simple checkbox with Turnstile bot protection
- Add GitHub Actions workflows for CI/CD (test, lint, build, type-check)
- Fix all TypeScript errors (KeyTextField null handling, RichTextField type guards)
- Add id property to all Prismic document types
- Fix Prismic content type assertions
- Add comprehensive TypeScript error prevention guide
- Update package.json with new scripts (lint:fix, type-check, test:ci)
- Add setup documentation for Turnstile and GitHub Actions"

# Check if remote exists
if ! git remote | grep -q "^origin$"; then
    echo "⚠️  No remote 'origin' found."
    echo "Please add your GitHub remote first:"
    echo "  git remote add origin https://github.com/yourusername/your-repo-name.git"
    exit 1
fi

# Show remote info
echo "🔗 Remote repository:"
git remote -v

# Push to GitHub
echo "📤 Pushing to GitHub..."
BRANCH=$(git branch --show-current)
echo "Pushing to branch: $BRANCH"

if git push -u origin "$BRANCH"; then
    echo "✅ Successfully pushed to GitHub!"
else
    echo "❌ Failed to push. Please check your remote configuration and try again."
    exit 1
fi

echo "✨ Done!"

