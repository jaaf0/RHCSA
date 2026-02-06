# Red Hat Certification Cheat Sheet - Local Setup Guide

This is a complete Red Hat certification cheat sheet web application for RH124, RH134, and RH254 courses. It features deep command explanations, visual terminal demonstrations, and an interactive search interface.

## Project Overview

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Build Tool**: Vite
- **Server**: Express.js (Node.js)
- **Package Manager**: pnpm

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install via: `npm install -g pnpm`
- **Git** (optional, for version control)

## Installation Steps

### 1. Extract the Project

```bash
tar -xzf redhat-cheatsheet-web-complete.tar.gz
cd redhat-cheatsheet-web
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all required packages including React, Tailwind CSS, Vite, and shadcn/ui components.

### 3. Development Server

To run the development server with hot module replacement:

```bash
pnpm dev
```

The application will be available at:
- **Local**: `http://localhost:3000`
- **Network**: `http://<your-ip>:3000`

The dev server will automatically reload when you make changes to the code.

## Project Structure

```
redhat-cheatsheet-web/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   └── __manus__/              # Debug utilities
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.tsx            # Main cheat sheet page
│   │   │   └── NotFound.tsx        # 404 page
│   │   ├── data/
│   │   │   └── cheatsheetData.ts   # All cheat sheet content
│   │   ├── contexts/                # React contexts
│   │   │   └── ThemeContext.tsx    # Dark/light theme
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── lib/                     # Utility functions
│   │   ├── App.tsx                  # Main app component with routing
│   │   ├── main.tsx                 # React entry point
│   │   └── index.css                # Global styles & Tailwind config
│   └── index.html                   # HTML template
├── server/                          # Express.js backend
│   └── index.ts                     # Server entry point
├── shared/                          # Shared types and constants
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
└── tailwind.config.ts               # Tailwind CSS configuration
```

## Available Scripts

### Development

```bash
# Start development server with hot reload
pnpm dev

# Check TypeScript types
pnpm check

# Format code with Prettier
pnpm format
```

### Production Build

```bash
# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Start production server
pnpm start
```

## Features

### 1. **Three Certification Courses**
- **RH124**: System Administration I (File Management, Users, Permissions, Networking)
- **RH134**: System Administration II (LVM, SELinux, Task Scheduling, Firewall)
- **RH254**: System Administration III (Bash Scripting, DNS, Web Services, Databases)

### 2. **Deep Command Reference**
Each command includes:
- Command syntax and options
- Detailed explanation of what it does
- Real-world usage examples
- Common errors and troubleshooting
- Related commands for cross-reference
- Visual terminal demonstrations

### 3. **Interactive Features**
- **Tab Navigation**: Switch between RH124, RH134, and RH254
- **Real-time Search**: Filter commands across all courses
- **Expandable Details**: Click "Show Deep Explanation & Demo" to reveal detailed information
- **Copy to Clipboard**: One-click command copying
- **Visual Demonstrations**: Terminal screenshots showing actual command execution and results

### 4. **Professional Design**
- Dark theme optimized for extended study sessions
- Red Hat branding with technical aesthetic
- Responsive layout for desktop and tablet devices
- Terminal-inspired hero section
- Smooth animations and transitions

## Customization

### Adding More Commands

Edit `/client/src/data/cheatsheetData.ts` to add new commands:

```typescript
{
  command: "your-command",
  syntax: "your-command [OPTIONS] [ARGUMENTS]",
  description: "What this command does",
  example: "your-command example",
  deepExplanation: "Detailed explanation...",
  commonErrors: ["Error 1", "Error 2"],
  relatedCommands: ["related1", "related2"],
  demoImage: "https://your-image-url.png" // Optional
}
```

### Changing the Theme

Edit `/client/src/index.css` to modify:
- Color palette (using OKLCH format)
- Typography
- Spacing and sizing
- Dark/light theme values

### Adding New Pages

1. Create a new component in `/client/src/pages/`
2. Add a route in `/client/src/App.tsx`
3. Update navigation as needed

## Building for Production

### 1. Create Production Build

```bash
pnpm build
```

This generates:
- Optimized frontend bundle in `dist/public`
- Compiled server code in `dist/index.js`

### 2. Deploy to Server

The built application can be deployed to:
- **Vercel** (recommended for static sites)
- **Netlify**
- **AWS S3 + CloudFront**
- **Self-hosted VPS** (using Node.js)
- **Docker** (create a Dockerfile)

### 3. Environment Variables (if needed)

Create a `.env` file in the root directory:

```
VITE_API_URL=https://your-api.com
NODE_ENV=production
PORT=3000
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Change port in vite.config.ts
# Or use environment variable
PORT=3001 pnpm dev
```

### Dependencies Issues

Clear cache and reinstall:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Errors

Check TypeScript errors:

```bash
pnpm check
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

The application includes:
- Code splitting with Vite
- Lazy loading for routes
- Image optimization
- CSS purging with Tailwind
- Production minification

## Security Notes

- All data is stored locally in the browser
- No external API calls for cheat sheet content
- Safe to use on any network
- No tracking or analytics by default

## License

This project is provided as-is for educational purposes.

## Support & Customization

For issues or customization needs:

1. Check the troubleshooting section above
2. Review the code comments in key files
3. Consult the Vite, React, and Tailwind documentation
4. Check the shadcn/ui component documentation

## Next Steps

After setup, consider:

1. **Add More Commands**: Expand the cheat sheet with additional commands
2. **Create Practice Scenarios**: Build mini-labs combining multiple commands
3. **Add Difficulty Levels**: Tag commands by difficulty for targeted study
4. **Export Feature**: Add PDF export functionality for offline study
5. **Dark/Light Theme Toggle**: Implement theme switching in the UI

## Quick Start Summary

```bash
# Extract and navigate
tar -xzf redhat-cheatsheet-web-complete.tar.gz
cd redhat-cheatsheet-web

# Install and run
pnpm install
pnpm dev

# Open browser to http://localhost:3000
```

Enjoy your Red Hat certification study tool!
