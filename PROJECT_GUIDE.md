## Bridan Design Build – Project Guide

This single guide consolidates deployment, performance, accessibility, SEO, and maintenance instructions for the website.

### Tech Stack
- Static HTML/CSS/JS + WordPress theme assets exported
- Hosted on Vercel (static hosting)

### Repository Structure (key items)
- `index.html` and section pages under root and subfolders (`about-us/`, `projects/`, `what-we-do/`, etc.)
- `wp-content/` theme/plugin assets, `wp-includes/js/` (selected runtime scripts)
- `vercel.json` for redirects/headers
- `sitemap.xml`, `robots.txt`, `favicon/`, `site.webmanifest`

---
## Deployment (Vercel + GitHub)

1) Connect GitHub
- In Vercel, import this repo and select production branch (main/master).
- Framework Preset: Other. Build Command: none. Output Directory: root (`/`).

2) Domains
- Add custom domain(s) in Vercel (e.g., `buildwithbridan.com`, optional `www.buildwithbridan.com`).
- Point DNS: apex to Vercel A/ALIAS, `www` CNAME to Vercel.

3) Redirects/Headers
- Controlled via `vercel.json`:
  - Force `www` → apex
  - `/index.html` → `/`
  - Long-term caching for `css|js|jpg|jpeg|png|webp|avif|gif|svg|ico|woff2|woff`

4) Do NOT use `.htaccess`
- Vercel ignores `.htaccess`. Use only `vercel.json`.

5) Triggering Deploys
- Push to the connected branch in GitHub. Vercel builds and deploys automatically.
- Manual redeploy: Vercel → Project → Deployments → Redeploy.

6) Rollbacks
- Vercel → Deployments → Promote previous successful deployment.

Troubleshooting
- 403 on FA kit or duplicate CSS: remove third-party kits and duplicates; rely on theme-provided FA.
- 404 on deep links: ensure files exist at paths; add redirect rules to `vercel.json` if needed.

---
## Performance Policy (applies site‑wide)

Critical Actions Implemented
- Removed duplicate Font Awesome includes and FA kit; rely on local/theme FA.
- Added `preconnect` for Google Fonts; converted large CSS (e.g., WPBakery) to `preload` + onload stylesheet.
- Ensured jQuery loads before RevSlider scripts to avoid runtime errors.
- Marked scroll listeners as `{ passive: true }`.
- Set explicit `width`/`height` on client logos to reduce CLS.

Images
- Use modern formats (prefer WebP/AVIF) for new assets.
- Appropriately size images for display: avoid inserting full-size originals where thumbnails or sized variants exist.
- Lazy-load offscreen images: `loading="lazy" decoding="async"`.
- Mark the single LCP visual with `fetchpriority="high"` (only one per page).

CSS/JS
- Keep above-the-fold CSS minimal; defer non-critical CSS with `preload`+onload and noscript fallback.
- Avoid long critical request chains: remove unused libraries, especially when not needed on a page.

Fonts
- Use `display=swap` for Google Fonts and add `preconnect` for `fonts.googleapis.com` and `fonts.gstatic.com`.

Network
- Leverage immutable cache headers for static assets (configured in `vercel.json`).

---
## Accessibility Policy (WCAG‑oriented)

Contrast
- Ensure text/icons over images/video or colored backgrounds meet contrast (recommend ≥ 4.5:1). Prefer darker text on light backgrounds.

Headings
- Maintain sequential order: H1 → H2 → H3 … Avoid skipping levels.
- Use headings for structure, not styling.

Lists
- `<ul>`/`<ol>` must contain only `<li>`/script/template. Remove stray `<br>` inside lists.

Links/Buttons
- Descriptive link text (“View Twiva Office Renovation”) instead of generic “Learn More”.
- Touch targets (tap areas) ≥ 44×44 px including spacing.
- External links: include `rel="noopener noreferrer"`.

Images
- Provide meaningful `alt` text for content images; decorative images use empty `alt`.
- Always include `width` and `height` to prevent layout shifts.

Keyboard
- Ensure focusable controls are reachable by Tab and have visible focus states.

Motion/Animation
- Prefer transform/opacity animations (composited). Avoid layout-affecting animations.

---
## SEO Policy

Content
- Unique title/description per page. Keep titles ≤ 60 chars; descriptions 150–160 chars.
- Use descriptive heading hierarchy and semantic HTML.

Links
- Ensure image wrappers (`<a>`) have valid `href` so crawlers can follow.
- Use descriptive anchor text.

Technical
- `sitemap.xml` kept up to date (add new pages).
- `robots.txt` allows crawling of required paths.
- Canonical `<link rel="canonical" href="...">` on primary pages.

Images
- Use responsive `srcset`/`sizes` where available; ensure the default `src` isn’t oversized.

---
## Page QA Checklist (Desktop & Mobile)

Per Page Quick Pass
1) Performance
   - LCP element loads ≤ 2.5s (desktop) and ≤ 4s (mobile simulated).
   - No render-blocking CSS/JS beyond critical needs; no duplicate libraries.
   - Images: modern format if possible, appropriate size, lazy where offscreen.

2) Accessibility
   - Contrast OK for texts/buttons.
   - Headings sequential; lists valid.
   - Links descriptive; tap targets ≥ 44×44 on mobile.
   - Images have `alt` and set dimensions.

3) SEO
   - Unique title/description.
   - Crawlable links (no anchor without `href`).
   - Canonical present if needed.

4) Visual/CLS
   - No major layout shifts on load; hero/menus/logo dimensions fixed.
   - Sticky header/menu does not overlap content.

---
## Common Fix Patterns (Examples)

Lazy-load image
```html
<img src="/img/photo.webp" alt="Kitchen renovation" width="800" height="533" loading="lazy" decoding="async">
```

Mark LCP image or key hero asset
```html
<img src="/img/hero.webp" alt="Hero" width="1600" height="900" fetchpriority="high">
```

Defer non-critical CSS
```html
<link rel="preload" as="style" href="/css/large.css" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/large.css"></noscript>
```

Passive scroll listener
```js
window.addEventListener('scroll', onScroll, { passive: true });
```

Descriptive link
```html
<a href="/projects/twiva-media-office-renovation/">View Twiva Media Office Renovation project</a>
```

---
## Maintenance

- When adding a new page:
  - Provide unique `<title>`, `<meta name="description">`.
  - Validate heading order and list structure.
  - Use sized and optimized images; lazy-load offscreen images.
  - Add to `sitemap.xml` and link from relevant pages.

- When changing assets:
  - Keep file names stable to leverage caching; or version via filename if content changes.

---
## Open Follow-ups

- Convert heavy JPG/PNG hero and gallery images to WebP/AVIF.
- Replace any remaining oversized images with appropriately sized variants.
- Review all image wrapper anchors to ensure valid `href`.


