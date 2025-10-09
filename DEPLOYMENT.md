# Deployment Guide

## Netlify Deployment

This project is configured for easy deployment to Netlify with the following setup:

### Files Included
- `netlify.toml` - Netlify configuration with SPA redirects
- `dist/` - Production build folder ready for deployment

### Deployment Options

#### Option 1: Drag & Drop (Easiest)
1. Go to [Netlify](https://netlify.com)
2. Sign in to your account
3. Drag and drop the `dist` folder to the deploy area
4. Your site will be live instantly!

#### Option 2: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Netlify will automatically build and deploy using the `netlify.toml` configuration

#### Option 3: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from dist folder
netlify deploy --dir=dist --prod
```

### Build Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18

### Features Included
- ✅ SPA routing support (all routes redirect to index.html)
- ✅ Optimized caching headers for static assets
- ✅ Security headers
- ✅ Custom brand colors (bg-brand-600, text-ink, etc.)
- ✅ Urbanist font family
- ✅ Tailwind CSS with custom utilities

### Custom Domain
After deployment, you can:
1. Go to Site Settings > Domain Management
2. Add your custom domain
3. Configure DNS settings as instructed by Netlify

### Environment Variables
If you need environment variables:
1. Go to Site Settings > Environment Variables
2. Add your variables
3. Redeploy the site

The site is now ready for production deployment!
