# Cloudflare Turnstile Setup Guide

This guide explains how to set up Cloudflare Turnstile for the email protection component on the Contact page.

## Benefits of Cloudflare Turnstile

- **Free**: No cost for basic usage
- **Privacy-focused**: GDPR compliant, no tracking cookies
- **Better UX**: Invisible to most users (no CAPTCHA puzzles)
- **Effective**: Advanced bot detection using behavioral analysis
- **Lightweight**: Minimal performance impact

## Setup Steps

### 1. Get Your Turnstile Site Key

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** in the sidebar
3. Click **Add Site**
4. Configure your site:
   - **Site name**: Your portfolio site name
   - **Domain**: Your domain (e.g., `litorja.com`)
   - **Widget mode**: Choose "Managed" (invisible) or "Non-interactive" (visible widget)
5. Copy your **Site Key** (public key)

### 2. Add Environment Variable

Add the site key to your `.env.local` file:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key_here
```

### 3. (Optional) Server-Side Verification

For enhanced security, verify tokens server-side. The component currently verifies client-side, but you can add server-side verification by:

1. Get your **Secret Key** from Cloudflare Turnstile dashboard
2. Add it to `.env.local`:

```bash
TURNSTILE_SECRET_KEY=your_secret_key_here
```

3. The API route at `/api/verify-turnstile` can be used to verify tokens (see implementation below)

## How It Works

1. User visits the Contact page
2. Cloudflare Turnstile widget appears in the email component
3. Turnstile analyzes user behavior (invisible for most users)
4. On success, the email address is revealed
5. Token can optionally be verified server-side for additional security

## Widget Modes

- **Managed (Invisible)**: Automatically verifies most users without interaction
- **Non-interactive**: Shows a widget that verifies without user interaction
- **Interactive**: Requires user interaction (like traditional CAPTCHA)

The current implementation uses "auto" theme which adapts to user's system theme.

## Testing

To test Turnstile:

1. Use the test keys provided by Cloudflare:
   - **Site Key**: `1x00000000000000000000AA`
   - **Secret Key**: `1x0000000000000000000000000000000AA`
2. These always pass verification in test mode
3. Replace with your real keys for production

## Troubleshooting

- **Widget not appearing**: Check that `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set correctly
- **Verification failing**: Ensure your domain is added in Cloudflare dashboard
- **Script loading issues**: Check browser console for errors

## Additional Resources

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile API Reference](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

