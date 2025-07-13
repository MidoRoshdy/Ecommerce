# 🚀 Deployment Guide

This guide will help you deploy your E-Store project to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- GitHub account (for GitHub Pages)
- Vercel/Netlify account (optional)

## 🎯 GitHub Pages Deployment

### Step 1: Prepare Your Repository

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "Initial commit - E-Store project"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click "Save"

### Step 2: Manual Deployment

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **The build output will be in the `out` folder**

3. **Deploy to GitHub Pages:**
   - The GitHub Actions workflow will automatically deploy when you push to main
   - Or manually upload the `out` folder contents to the gh-pages branch

## 🌐 Vercel Deployment

### Step 1: Connect to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login with your GitHub account**
3. **Click "New Project"**
4. **Import your GitHub repository**

### Step 2: Configure Build Settings

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `out`
- **Install Command:** `npm install`

### Step 3: Deploy

1. **Click "Deploy"**
2. **Your site will be live in minutes!**

## 🎨 Netlify Deployment

### Step 1: Connect to Netlify

1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up/Login with your GitHub account**
3. **Click "New site from Git"**
4. **Choose your repository**

### Step 2: Configure Build Settings

- **Build command:** `npm run build`
- **Publish directory:** `out`
- **Base directory:** (leave empty)

### Step 3: Deploy

1. **Click "Deploy site"**
2. **Your site will be live!**

## 🔧 Environment Variables

If you need to set environment variables:

### GitHub Pages

- No environment variables needed (static site)

### Vercel

- Go to Project Settings → Environment Variables
- Add any required variables

### Netlify

- Go to Site Settings → Environment Variables
- Add any required variables

## 📱 Custom Domain

### GitHub Pages

1. Go to repository Settings → Pages
2. Add your custom domain
3. Update DNS settings with your domain provider

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

### Netlify

1. Go to Site Settings → Domain Management
2. Add your custom domain
3. Configure DNS settings

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails:**

   - Check Node.js version (should be 18+)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

2. **Images Not Loading:**

   - Ensure images are in the `public` folder
   - Check image paths in your components

3. **API Calls Failing:**

   - Verify API endpoints are accessible
   - Check CORS settings if needed

4. **Routing Issues:**
   - Ensure all routes are properly configured
   - Check for 404 errors in browser console

### Performance Optimization

1. **Image Optimization:**

   - Use Next.js Image component
   - Optimize image sizes
   - Use WebP format when possible

2. **Code Splitting:**

   - Next.js automatically handles code splitting
   - Keep components small and focused

3. **Caching:**
   - Set appropriate cache headers
   - Use CDN for static assets

## 📊 Analytics

### Google Analytics

1. Create a Google Analytics account
2. Add your tracking ID to the project
3. Implement tracking code in your app

### Vercel Analytics

- Automatically available for Vercel deployments
- No additional setup required

## 🔒 Security

1. **Environment Variables:**

   - Never commit sensitive data
   - Use environment variables for API keys

2. **HTTPS:**

   - All modern platforms provide HTTPS by default
   - Ensure your site uses HTTPS

3. **Content Security Policy:**
   - Consider adding CSP headers
   - Test thoroughly after implementation

## 📈 Monitoring

1. **Error Tracking:**

   - Consider adding Sentry or similar
   - Monitor for JavaScript errors

2. **Performance Monitoring:**
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals

## 🎉 Success!

Once deployed, your E-Store will be live and accessible to users worldwide!

### Quick Links

- [GitHub Pages](https://pages.github.com/)
- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Need help?** Check the [Next.js documentation](https://nextjs.org/docs) or create an issue in your repository.
