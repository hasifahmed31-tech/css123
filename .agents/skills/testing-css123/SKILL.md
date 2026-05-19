---
name: testing-css123
description: Test the CSS123 Next.js portfolio site end-to-end. Use when verifying UI changes, layout fixes, image loading, social icons, or footer updates.
---

# Testing CSS123 Portfolio Site

## Dev Server Setup

1. `cd` into the repo and run `npm install` then `npm run dev`
2. The dev server runs at `http://localhost:3000` by default
3. If port 3000 is already in use, kill existing processes with `fuser -k 3000/tcp` (note: `lsof` may not be available on the VM)
4. On first run, an ESLint v9 migration dialog may appear — dismiss it with Enter and delete the auto-generated `.eslintrc.json` if created

## Build Verification

- Run `npm run build` to verify static generation
- The site generates ~30 static pages (SSG)
- Build output should show no errors

## Key Pages to Test

| Page | URL | What to check |
|------|-----|---------------|
| Homepage | `/` | Hero section, header nav centering, featured blog cards |
| Blog listing | `/blog` | All 19 blog card images load (local files in `/public/images/`), category filters |
| Blog post | `/blog/[slug]` | Featured image, share buttons (LinkedIn only), article content |
| Contact | `/contact` | Contact pills (Email + LinkedIn only), contact form, FAQ accordion |
| About | `/about` | Page loads correctly |

## Header Testing

- Desktop (≥1024px): Nav links (Home, Blog, About, Contact) should be centered between logo (left) and dark mode toggle (right) using absolute positioning
- Mobile (<1024px): Hamburger menu icon should appear; clicking opens a slide-out menu with all nav links
- The header uses `absolute left-1/2 -translate-x-1/2` for centering — verify this visually

## Footer Testing

- Should display a 4-column grid: Brand | Quick Links | Legal | Contact
- Brand column has HASIF logo + short description + LinkedIn icon only
- No Twitter, Facebook, Discord, or Email social icons should appear
- Bottom bar: copyright text + "Work with Hasif" CTA button

## Social Icons

- Only LinkedIn should appear anywhere on the site
- Check these locations: footer social icons, blog post share buttons, contact page
- Removed platforms: Twitter/X, Facebook, Discord, Email (as social icon)

## Blog Images

- All blog images are served locally from `/public/images/*.jpg`
- No Unsplash or external image URLs should be used
- Images use Next.js `<Image>` component with `priority` on featured images

## Performance Checks

- `next.config.ts` should have empty `remotePatterns: []` (no external image domains)
- `optimizePackageImports` should include `lucide-react` and `framer-motion`
- No Unsplash preconnect/dns-prefetch in `app/layout.tsx`
- CSP connect-src should not reference Unsplash

## Mobile Testing

- Resize viewport to ~375px width to test mobile layout
- Hamburger menu should appear and work
- Blog cards should stack vertically
- Footer columns should stack on mobile

## Known Issues

- Port conflicts are common — always check if port 3000 is free before starting dev server
- ESLint migration dialog might appear on fresh setups — just dismiss it
- The site uses Tailwind CSS v4 with the new `@import "tailwindcss"` syntax
