---
description: how to deploy the portfolio application
---

# Deployment Guide

Since this is a Next.js application, I highly recommend using **Vercel** for the smoothest experience, but you can also use other platforms.

## Option 1: Vercel (Recommended)
Vercel is the creator of Next.js and provides the best support for all its features.

1. **Push your code to GitHub/GitLab/Bitbucket**:
   Ensure all your changes are committed and pushed to a remote repository.
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in.
   - Click "Add New" -> "Project".
   - Import your repository.
3. **Configure Framework**:
   Vercel will automatically detect Next.js.
4. **Environment Variables**:
   If you have any sensitive information (e.g., API keys), add them in the "Environment Variables" section.
5. **Deploy**:
   Click "Deploy". Vercel will build and host your site.

## Option 2: Custom Server (VPS)
If you prefer hosting it yourself using Node.js:

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Start the production server**:
   ```bash
   npm run start
   ```
   *Note: Use a process manager like `pm2` to keep it running.*

## Option 3: Static Export (Optional)
If you want to host it on static platforms like Netlify or GitHub Pages without a Node.js server:

1. **Update `next.config.ts`**:
   Add `output: 'export'` inside `nextConfig`.
2. **Build**:
   ```bash
   npm run build
   ```
3. **Deploy the `out` folder**:
   Upload the generated `out` directory to your hosting provider.

> [!IMPORTANT]
> Since we use `next-intl` with the `as-needed` locale prefix, ensure your hosting provider handles the routing correctly if you choose Option 3.
