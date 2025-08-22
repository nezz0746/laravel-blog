# Railway Deployment Guide - Next.js Web App

This Next.js application is configured for deployment on Railway with React Query and GraphQL integration.

## 🚀 Quick Deploy

1. **Connect to Railway:**

   ```bash
   # Install Railway CLI
   npm install -g @railway/cli

   # Login to Railway
   railway login

   # Deploy from this directory
   cd apps/web
   railway deploy
   ```

2. **Set Environment Variables:**
   In Railway dashboard, set these variables:
   ```
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-api.railway.app/graphql
   NODE_ENV=production
   ```

## 📁 Files Added for Railway

- **`railway.json`**: Railway-specific deployment configuration
- **`nixpacks.toml`**: Build configuration for Railway's Nixpacks
- **`next.config.ts`**: Updated with production optimizations

## 🔧 Configuration Details

### Build Process

1. Install dependencies with pnpm (workspace support)
2. Build Next.js application with optimizations
3. Generate standalone output for better performance

### Runtime

- Serves on port provided by Railway
- Uses standalone output for faster cold starts
- Optimized bundle with package imports

### Dependencies

- Automatically resolves workspace dependencies (`@graphql-monorepo/react-sdk`, `@graphql-monorepo/sdk`)
- Installs all production dependencies
- Uses pnpm for faster installs

## 🌐 Environment Variables

### Required

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-api.railway.app/graphql
```

### Optional

```env
NODE_ENV=production
```

## 🔗 API Integration

The web app is configured to connect to your GraphQL API. Make sure to:

1. **Deploy the API first** (`apps/api`)
2. **Get the API URL** from Railway dashboard
3. **Set NEXT_PUBLIC_GRAPHQL_ENDPOINT** to your API URL + `/graphql`

Example:

```
API URL: https://myapi-production.railway.app
GraphQL Endpoint: https://myapi-production.railway.app/graphql
```

## 🎯 Deployment Flow

### Option 1: Separate Services (Recommended)

Deploy API and web app as separate Railway services:

```bash
# Deploy API
cd apps/api
railway deploy

# Deploy Web App
cd ../web
railway deploy
```

### Option 2: Monorepo Setup

Deploy from root with Railway's monorepo support:

```bash
# From project root
railway deploy --service api --path apps/api
railway deploy --service web --path apps/web
```

## 🔍 Troubleshooting

### Common Issues

1. **GraphQL Connection Errors**:

   - Verify `NEXT_PUBLIC_GRAPHQL_ENDPOINT` is correct
   - Check API is deployed and accessible
   - Ensure CORS is configured on API

2. **Build Failures**:

   - Check workspace dependencies are available
   - Verify pnpm lockfile is up to date
   - Check for TypeScript errors

3. **Runtime Errors**:
   - Check browser console for client-side errors
   - Verify React Query setup in layout
   - Check GraphQL queries are valid

### Logs

```bash
# View deployment logs
railway logs

# View build logs
railway logs --build
```

## 🚨 Important Notes

### Workspace Dependencies

The app uses workspace dependencies (`@graphql-monorepo/react-sdk`, `@graphql-monorepo/sdk`). Railway will:

- Install the entire monorepo
- Build workspace packages
- Bundle everything together

### API Endpoint Configuration

- Set `NEXT_PUBLIC_GRAPHQL_ENDPOINT` in Railway environment variables
- This must be a public URL (starts with `NEXT_PUBLIC_`)
- Points to your deployed API's `/graphql` endpoint

### Performance Optimizations

- `output: 'standalone'` for faster cold starts
- Package import optimization for smaller bundles
- Turbopack enabled for faster builds (dev)

## 🌟 Features

- **React Query Integration**: Automatic caching and background updates
- **GraphQL Code Generation**: Type-safe API calls
- **Tailwind CSS**: Modern styling
- **TypeScript**: Full type safety
- **Workspace Support**: Monorepo-aware deployment

## 💡 Tips

1. **Deploy API first** - Web app needs API URL
2. **Use environment variables** - Don't hardcode API URLs
3. **Check logs** - Use `railway logs` for debugging
4. **Test locally** - Ensure everything works before deploying
5. **CORS setup** - Make sure API allows requests from web app domain

## 🔗 Endpoints

After deployment:

- **Web App**: `https://your-web-app.railway.app`
- **Health Check**: `https://your-web-app.railway.app` (Next.js default)

## 🎨 Customization

### Custom Domain

Add custom domain in Railway dashboard after deployment.

### Environment-specific Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT:
      process.env.NODE_ENV === "production"
        ? "https://your-api.railway.app/graphql"
        : "http://localhost:8000/graphql",
  },
};
```

Your Next.js app is now ready for Railway deployment! 🚀
