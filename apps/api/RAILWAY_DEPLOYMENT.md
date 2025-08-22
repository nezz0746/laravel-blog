# Railway Deployment Guide

This Laravel GraphQL API is configured for deployment on Railway.

## 🚀 Quick Deploy

1. **Connect to Railway:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Deploy from this directory
   cd apps/api
   railway deploy
   ```

2. **Set Environment Variables:**
   In Railway dashboard, set these variables:
   ```
   APP_KEY=base64:YOUR_32_CHAR_KEY_HERE
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-app.railway.app
   DB_CONNECTION=sqlite
   DB_DATABASE=/app/database/database.sqlite
   ```

3. **Generate APP_KEY:**
   ```bash
   # Run locally to generate key
   php artisan key:generate --show
   # Copy the output to Railway's APP_KEY variable
   ```

## 📁 Files Added for Railway

- **`Procfile`**: Defines the web process
- **`nixpacks.toml`**: Build configuration for Railway's Nixpacks
- **`railway.json`**: Railway-specific deployment config
- **`composer.json`**: Added Railway build/deploy scripts

## 🔧 Configuration Details

### Build Process
1. Install PHP dependencies (production only)
2. Cache Laravel config, routes, and views
3. Create SQLite database file
4. Run migrations and seeders

### Runtime
- Serves on `0.0.0.0:$PORT` (Railway provides PORT)
- Uses SQLite database (persistent across deployments)
- GraphiQL available at `/graphiql`
- GraphQL API at `/graphql`

### CORS Setup
CORS is configured to allow all origins in production. Update `config/cors.php` for specific domains if needed.

## 🌐 Endpoints

After deployment:
- **GraphQL API**: `https://your-app.railway.app/graphql`
- **GraphiQL Interface**: `https://your-app.railway.app/graphiql`
- **Health Check**: `https://your-app.railway.app/graphiql`

## 🔍 Troubleshooting

### Common Issues

1. **APP_KEY Missing**:
   ```bash
   php artisan key:generate --show
   # Set the output in Railway environment variables
   ```

2. **Database Issues**:
   - SQLite file is created automatically
   - Migrations run on each deployment
   - Check logs: `railway logs`

3. **CORS Issues**:
   - Update `CORS_ALLOWED_ORIGINS` in Railway environment
   - Default is `*` (all origins)

### Logs
```bash
# View deployment logs
railway logs

# View build logs
railway logs --build
```

## 🎯 Frontend Integration

Update your frontend's GraphQL endpoint:

```typescript
// For production
const GRAPHQL_ENDPOINT = 'https://your-app.railway.app/graphql';

// For development (update with your Railway URL)
const GRAPHQL_ENDPOINT = process.env.NODE_ENV === 'production' 
  ? 'https://your-app.railway.app/graphql'
  : 'http://localhost:8000/graphql';
```

## 📊 Database

- **Type**: SQLite (file-based)
- **Location**: `/app/database/database.sqlite`
- **Persistence**: Survives deployments
- **Seeding**: Automatic on deploy

### Reset Database
```bash
# Connect to Railway shell
railway shell

# Reset database
php artisan migrate:fresh --seed --force
```

## 🔐 Security Notes

- `APP_DEBUG=false` in production
- `APP_ENV=production` 
- Generate unique `APP_KEY`
- Consider restricting CORS origins for production
- SQLite file permissions handled by Railway

## 💡 Tips

1. **Environment Variables**: Set in Railway dashboard, not in code
2. **Logs**: Use `railway logs` for debugging
3. **Database**: SQLite is perfect for small to medium apps
4. **Scaling**: Railway handles scaling automatically
5. **Custom Domain**: Add in Railway dashboard

## 🚨 Important Notes

- The SQLite database file persists across deployments
- Migrations and seeders run automatically on deploy
- GraphiQL interface is available for API testing
- CORS is configured for frontend integration
