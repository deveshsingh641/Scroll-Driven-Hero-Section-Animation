# Scroll-Driven Hero Section Animation

Recreation of a scroll-driven hero animation (pinned hero + scroll-scrubbed transform motion) using:

- Next.js (App Router)
- Tailwind CSS
- GSAP + ScrollTrigger

## Requirements checklist

- Hero is above the fold (`100vh`)
- Letter-spaced headline: **W E L C O M E I T Z F I Z Z**
- Impact metrics animate in on load
- Main visual animation is tied to scroll progress (scrubbed), using transforms

## Local dev

```bash
cd scroll-hero
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow that builds a static export and deploys it to GitHub Pages.

1. Push this folder to a GitHub repo (default branch: `main`).
2. In GitHub: **Settings → Pages**
	- Source: **GitHub Actions**
3. Push to `main` and wait for **Actions** to finish.

Notes:
- Static export is enabled in `next.config.ts` (`output: "export"`).
- `basePath` / `assetPrefix` are auto-derived from the repo name when running in GitHub Actions.

## Submission links

- Live webpage: **TODO** (paste your GitHub Pages URL here)
- GitHub repository: **TODO** (paste your repo URL here)
