# GitHub Actions CI/CD Setup

## Overview

This project uses GitHub Actions for continuous integration to ensure code quality before deployment. Since you're using Vercel (which auto-deploys), CI/CD acts as a quality gate.

## What the CI/CD Does

### 1. **Test Workflow** (`.github/workflows/ci.yml`)
- Runs on every push and pull request
- Installs dependencies
- Runs ESLint
- Runs all tests with Vitest
- Builds the project to catch build errors
- Type checks with TypeScript

### 2. **Code Quality Workflow** (`.github/workflows/code-quality.yml`)
- Separate workflow for linting
- Can be extended with additional quality checks

## Benefits

✅ **Catch errors early** - Find issues before they reach production  
✅ **Ensure builds succeed** - Verify the project builds correctly  
✅ **Maintain code quality** - Enforce linting and type checking  
✅ **Test coverage** - Run tests on every change  
✅ **Pull request checks** - See if PRs pass all checks before merging  

## Setup Time

**Initial setup: ~5 minutes** (just commit the workflow files)

**Configuration: ~10-15 minutes** (optional - setting up GitHub Secrets for better test coverage)

## GitHub Secrets (Optional)

For more realistic testing, you can add these secrets in GitHub:
1. Go to your repository → Settings → Secrets and variables → Actions
2. Add the following secrets (optional, defaults are used if not set):
   - `NEXT_PUBLIC_PRISMIC_ENVIRONMENT`
   - `PRISMIC_ACCESS_TOKEN`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `TURNSTILE_SECRET_KEY`

**Note:** The workflows use test defaults if secrets aren't set, so they'll work out of the box.

## How It Works

1. **On Push/PR**: GitHub Actions automatically runs
2. **Tests Run**: All tests execute in a clean environment
3. **Build Check**: Ensures the project builds successfully
4. **Status Badge**: Shows pass/fail status on your repository

## Viewing Results

- Go to your GitHub repository
- Click the "Actions" tab
- See all workflow runs and their status
- Click any run to see detailed logs

## Customization

### Add More Checks

You can extend the workflows to include:
- Coverage reports
- Security scanning
- Performance testing
- Visual regression testing

### Modify Triggers

Edit the `on:` section in workflow files to:
- Run on specific branches only
- Run on schedule (cron)
- Run on specific file changes

## Troubleshooting

**Workflow fails on lint:**
- Run `npm run lint:fix` locally to auto-fix issues
- Or fix linting errors manually

**Workflow fails on tests:**
- Check test output in Actions tab
- Run tests locally: `npm test`
- Ensure all tests pass before pushing

**Workflow fails on build:**
- Run `npm run build` locally
- Check for TypeScript errors: `npm run type-check`
- Fix any build errors before pushing

## Cost

GitHub Actions is **free** for public repositories with:
- 2,000 minutes/month for private repos (free tier)
- Unlimited minutes for public repos

For a portfolio site, you'll likely use <100 minutes/month.

## Next Steps

1. Commit the workflow files
2. Push to GitHub
3. Check the Actions tab to see it running
4. (Optional) Add a status badge to your README

### Add Status Badge to README

Add this to your README.md:

```markdown
![CI](https://github.com/yourusername/your-repo/actions/workflows/ci.yml/badge.svg)
```

Replace `yourusername/your-repo` with your actual GitHub username and repository name.

