# Red Hat Cheat Sheet - Deployment Guide

This guide covers multiple ways to deploy your Red Hat certification cheat sheet application to production.

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Vercel (Recommended for Static)](#vercel-recommended-for-static)
4. [Netlify](#netlify)
5. [AWS Deployment](#aws-deployment)
6. [Self-Hosted VPS](#self-hosted-vps)
7. [Railway](#railway)
8. [Render](#render)

---

## Local Development

### Prerequisites
- Node.js v18+
- pnpm v8+

### Setup

```bash
cd redhat-cheatsheet-web
pnpm install
pnpm dev
```

Visit `http://localhost:3000`

---

## Docker Deployment

### Build Docker Image

```bash
# From project root
docker build -f Dockerfile -t redhat-cheatsheet:latest ./redhat-cheatsheet-web
```

### Run Container

```bash
docker run -p 3000:3000 redhat-cheatsheet:latest
```

### Using Docker Compose

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

### Push to Docker Hub

```bash
# Tag image
docker tag redhat-cheatsheet:latest your-username/redhat-cheatsheet:latest

# Login to Docker Hub
docker login

# Push image
docker push your-username/redhat-cheatsheet:latest
```

---

## Vercel (Recommended for Static)

Vercel is ideal for this static React application with excellent performance and free tier.

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd redhat-cheatsheet-web
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Select "Other" as framework
6. Set build command: `pnpm build`
7. Set output directory: `dist`
8. Deploy

### Environment Variables (if needed)

In Vercel dashboard:
- Go to Settings → Environment Variables
- Add any required variables

### Custom Domain

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

---

## Netlify

### Option 1: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd redhat-cheatsheet-web
netlify deploy --prod --dir=dist
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect GitHub repository
5. Set build command: `pnpm build`
6. Set publish directory: `dist`
7. Deploy

### Build Settings

- **Build command**: `pnpm install && pnpm build`
- **Publish directory**: `dist`
- **Node version**: 18.x or higher

---

## AWS Deployment

### Option 1: S3 + CloudFront (Static)

```bash
# Build the project
cd redhat-cheatsheet-web
pnpm build

# Create S3 bucket
aws s3 mb s3://redhat-cheatsheet-web

# Upload files
aws s3 sync dist/public s3://redhat-cheatsheet-web --delete

# Create CloudFront distribution
# (Use AWS Console for this step)
```

### Option 2: EC2 (Full Stack)

```bash
# SSH into EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Install pnpm
npm install -g pnpm

# Clone repository
git clone your-repo-url
cd redhat-cheatsheet-web

# Install and build
pnpm install
pnpm build

# Run with PM2
npm install -g pm2
pm2 start dist/index.js --name "redhat-cheatsheet"
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo yum install nginx
# Configure nginx to proxy to localhost:3000
sudo systemctl start nginx
```

### Option 3: Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-20 redhat-cheatsheet

# Create environment
eb create redhat-cheatsheet-env

# Deploy
eb deploy
```

---

## Self-Hosted VPS

### Prerequisites
- VPS with Ubuntu 22.04 or similar
- SSH access
- Domain name (optional)

### Setup Steps

```bash
# 1. SSH into server
ssh root@your-server-ip

# 2. Update system
apt update && apt upgrade -y

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# 4. Install pnpm
npm install -g pnpm

# 5. Clone repository
git clone your-repo-url
cd redhat-cheatsheet-web

# 6. Install dependencies
pnpm install

# 7. Build application
pnpm build

# 8. Install PM2 for process management
npm install -g pm2

# 9. Start application
pm2 start dist/index.js --name "redhat-cheatsheet"
pm2 save
pm2 startup

# 10. Install Nginx
apt install -y nginx

# 11. Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

### Nginx Configuration

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable HTTPS with Let's Encrypt

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

### Restart Nginx

```bash
systemctl restart nginx
```

---

## Railway

### Deploy with Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Using Railway Dashboard

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Set environment variables if needed
5. Deploy

---

## Render

### Deploy with Render

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Set configuration:
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `node dist/index.js`
   - **Node Version**: 18
5. Deploy

### Environment Variables

Add in Render dashboard:
- Go to Environment
- Add any required variables

---

## Performance Optimization

### Before Deployment

```bash
# Check for TypeScript errors
pnpm check

# Format code
pnpm format

# Build and test
pnpm build
pnpm preview
```

### Production Checklist

- [ ] Build succeeds without errors
- [ ] No console warnings or errors
- [ ] Images are optimized
- [ ] All links work correctly
- [ ] Search functionality works
- [ ] Theme displays correctly
- [ ] Responsive design tested on mobile
- [ ] Performance tested (Lighthouse score)

### Lighthouse Testing

1. Open your deployed site
2. Press F12 to open DevTools
3. Go to Lighthouse tab
4. Click "Analyze page load"
5. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 90

---

## Monitoring & Maintenance

### Health Checks

```bash
# Test if site is running
curl https://your-domain.com

# Check response time
curl -w "@curl-format.txt" -o /dev/null -s https://your-domain.com
```

### Log Monitoring

**PM2 Logs**:
```bash
pm2 logs redhat-cheatsheet
```

**Nginx Logs**:
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Backup Strategy

```bash
# Backup database (if applicable)
# Backup configuration files
# Backup source code to GitHub

# Create automated backups
# Use cron jobs for regular backups
```

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist
pnpm install
pnpm build
```

### High Memory Usage

```bash
# Restart application
pm2 restart redhat-cheatsheet

# Check memory
pm2 monit
```

### SSL Certificate Issues

```bash
# Renew Let's Encrypt certificate
certbot renew

# Force renewal
certbot renew --force-renewal
```

---

## Cost Comparison

| Platform | Free Tier | Notes |
|----------|-----------|-------|
| Vercel | Yes (500MB) | Best for static sites |
| Netlify | Yes (300 min/month) | Good for static sites |
| Railway | $5/month | Generous free tier |
| Render | Yes (limited) | Good for Node.js apps |
| AWS S3+CF | Yes (1 year) | Pay-as-you-go after |
| VPS | $5-20/month | Full control |

---

## Recommended Deployment Path

1. **Development**: Local with `pnpm dev`
2. **Testing**: Docker locally
3. **Production**: 
   - **Option A** (Easiest): Vercel or Netlify
   - **Option B** (More Control): Railway or Render
   - **Option C** (Full Control): Self-hosted VPS

---

## Support Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Docker Documentation](https://docs.docker.com/)

---

## Next Steps After Deployment

1. **Monitor Performance**: Set up uptime monitoring
2. **Enable Analytics**: Track user engagement
3. **Setup Backups**: Automate backup procedures
4. **Plan Scaling**: Monitor growth and plan for scaling
5. **Add Features**: Implement user feedback

Happy deploying! 🚀
