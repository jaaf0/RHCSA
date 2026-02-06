# Red Hat Cheat Sheet - Quick Reference Guide

## 🚀 Getting Started (Choose One)

### Development Mode (Recommended for Customization)
```bash
tar -xzf redhat-cheatsheet-web-complete-final.tar.gz
cd redhat-cheatsheet-web
pnpm install
pnpm dev
# Visit http://localhost:3000
```

### Docker Mode (Recommended for Deployment)
```bash
tar -xzf redhat-cheatsheet-web-complete-final.tar.gz
cd redhat-cheatsheet-web
docker build -f Dockerfile -t redhat-cheatsheet:latest .
docker run -p 3000:3000 redhat-cheatsheet:latest
# Visit http://localhost:3000
```

### Docker Compose Mode (Easiest)
```bash
tar -xzf redhat-cheatsheet-web-complete-final.tar.gz
cd ..
docker-compose up -d
# Visit http://localhost:3000
```

---

## 📁 File Guide

| File | Purpose | Read When |
|------|---------|-----------|
| `README.md` | Overview and quick start | First |
| `SETUP_INSTRUCTIONS.md` | Detailed local setup | Setting up locally |
| `DEPLOYMENT_GUIDE.md` | Production deployment | Ready to deploy |
| `QUICK_REFERENCE.md` | This file - common tasks | Need quick help |

---

## 🛠️ Common Development Tasks

### Start Development Server
```bash
cd redhat-cheatsheet-web
pnpm dev
```

### Build for Production
```bash
cd redhat-cheatsheet-web
pnpm build
```

### Check for Errors
```bash
cd redhat-cheatsheet-web
pnpm check
```

### Format Code
```bash
cd redhat-cheatsheet-web
pnpm format
```

### Add a New Command
Edit `client/src/data/cheatsheetData.ts`:
```typescript
{
  command: "new-command",
  syntax: "new-command [OPTIONS]",
  description: "What it does",
  example: "new-command example",
  deepExplanation: "Detailed explanation",
  commonErrors: ["Error 1", "Error 2"],
  relatedCommands: ["related1", "related2"],
  demoImage: "https://image-url.png" // Optional
}
```

### Change Theme Color
Edit `client/src/index.css` and modify the `:root` section:
```css
:root {
  --primary: oklch(0.7 0.2 0);  /* Change this */
  /* ... other colors ... */
}
```

---

## 🐳 Docker Commands

### Build Image
```bash
docker build -f Dockerfile -t redhat-cheatsheet:latest .
```

### Run Container
```bash
docker run -p 3000:3000 redhat-cheatsheet:latest
```

### Run with Docker Compose
```bash
docker-compose up -d
```

### Stop Container
```bash
docker stop <container-id>
```

### View Logs
```bash
docker logs <container-id>
```

### Push to Docker Hub
```bash
docker tag redhat-cheatsheet:latest your-username/redhat-cheatsheet:latest
docker login
docker push your-username/redhat-cheatsheet:latest
```

---

## 🌐 Deployment Quick Links

### Easiest (5 minutes)
- **Vercel**: Push to GitHub → Connect to Vercel → Done
- **Netlify**: Push to GitHub → Connect to Netlify → Done

### Medium (15 minutes)
- **Railway**: `railway login` → `railway init` → `railway up`
- **Render**: Connect GitHub → Configure → Deploy

### Advanced (30+ minutes)
- **AWS EC2**: SSH → Install Node → Clone → Run
- **VPS**: SSH → Install Node → Clone → Setup Nginx → Run

See `DEPLOYMENT_GUIDE.md` for detailed steps.

---

## 🔧 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 pnpm dev

# Or kill process using port 3000
lsof -i :3000
kill -9 <PID>
```

### Dependencies Won't Install
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Fails
```bash
pnpm check  # See errors
pnpm format # Fix formatting
pnpm build  # Try again
```

### Docker Build Fails
```bash
docker system prune  # Clean up
docker build --no-cache -f Dockerfile -t redhat-cheatsheet:latest .
```

### Application Won't Start
```bash
# Check Node version
node --version  # Should be v18+

# Check pnpm version
pnpm --version  # Should be v8+

# Try reinstalling
rm -rf node_modules
pnpm install
```

---

## 📊 Project Structure Quick Reference

```
redhat-cheatsheet-web/
├── client/src/
│   ├── data/cheatsheetData.ts    ← Edit: Add/modify commands
│   ├── pages/Home.tsx             ← Edit: Main page layout
│   ├── index.css                  ← Edit: Colors, fonts, styles
│   ├── App.tsx                    ← Edit: Routes, navigation
│   └── components/                ← Edit: Reusable components
├── server/index.ts                ← Backend (usually don't edit)
├── package.json                   ← Dependencies
├── Dockerfile                     ← Docker config
└── vite.config.ts                 ← Build config
```

---

## 🎯 Feature Checklist

- [x] Three certification courses (RH124, RH134, RH254)
- [x] 40+ commands with deep explanations
- [x] Real-time search functionality
- [x] Visual terminal demonstrations
- [x] Copy-to-clipboard feature
- [x] Expandable command details
- [x] Professional dark theme
- [x] Responsive design
- [x] Production-ready build
- [x] Docker support

---

## 📚 Learning Resources

### Included
- 40+ Linux commands with detailed explanations
- Terminal screenshots showing actual execution
- Real-world usage examples
- Common errors and troubleshooting

### External
- [Red Hat Learning](https://www.redhat.com/en/services/training)
- [Linux Man Pages](https://man7.org/)
- [Linux Academy](https://linuxacademy.com/)

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] `pnpm build` succeeds
- [ ] No TypeScript errors: `pnpm check`
- [ ] Code formatted: `pnpm format`
- [ ] Tested locally: `pnpm dev`
- [ ] All links work
- [ ] Search functionality works
- [ ] Theme displays correctly
- [ ] Mobile responsive

---

## 💡 Pro Tips

1. **Use pnpm**: Faster than npm, uses less disk space
2. **Keep dependencies updated**: `pnpm update`
3. **Monitor bundle size**: Check `dist/` after build
4. **Use TypeScript**: Catch errors before runtime
5. **Test on mobile**: Use Chrome DevTools device emulation
6. **Optimize images**: Use appropriate formats and sizes
7. **Cache busting**: Add hash to image filenames when updating
8. **Monitor performance**: Use Lighthouse in Chrome DevTools

---

## 📞 Support Resources

### Documentation Files
- `README.md` - Project overview
- `SETUP_INSTRUCTIONS.md` - Detailed setup
- `DEPLOYMENT_GUIDE.md` - Deployment options
- `QUICK_REFERENCE.md` - This file

### External Resources
- [Node.js Docs](https://nodejs.org/docs/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind Docs](https://tailwindcss.com/)
- [Docker Docs](https://docs.docker.com/)

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Extract and setup | 5 min |
| First run | 2 min |
| Add 10 commands | 15 min |
| Change theme | 10 min |
| Build for production | 1 min |
| Deploy to Vercel | 5 min |
| Deploy to Docker | 10 min |
| Deploy to VPS | 30 min |

---

## 🎓 Next Steps

1. **Extract and run locally** - Get familiar with the app
2. **Customize commands** - Add your own content
3. **Change theme** - Make it your own
4. **Deploy** - Choose your platform
5. **Share** - Help others study

---

**Happy studying! 📚**

For detailed information, see the other documentation files.
