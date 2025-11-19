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
git commit -m "Fix all TypeScript build errors and linting issues

- Fix TypeScript type casting errors in gallery/photos/page.tsx
- Fix non-existent property access (galleryImage, imageCaption)
- Fix null handling for item.uid (add fallback to empty string)
- Fix all ESLint errors (27 errors fixed: any types, React hooks, unused vars)
- Fix HTML entity escaping (apostrophes)
- Fix React hooks setState in effect warnings
- Fix all TypeScript build errors for production build
- Update gallery photos page to use correct GalleryDocument properties
- Add proper type guards and null handling throughout codebase
- All TypeScript and ESLint errors resolved"

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

