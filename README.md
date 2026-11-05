# Data Craft Studio — website

Marketing site for Data Craft Studio (MIS & business automation). Built with React 18 + htm, with every page pre-rendered to static HTML at deploy time for fast loading and SEO, then hydrated in the browser.

| Path | Purpose |
|---|---|
| `src/app.js` | All content (`SITE`, `SERVICES`, `INDUSTRIES`, `PORTFOLIO`, `CASES`, `ARTICLES`, legal text), components, pages and route table |
| `src/styles.css` | Design tokens (light/dark) and styles |
| `scripts/prerender.mjs` | Deploy-time build: renders each route to `dist/<path>/index.html`, plus `404.html`, `sitemap.xml`, `robots.txt` |
| `public/` | Copied as-is: favicon and the Netlify Forms definition (`__forms.html`) |

## Editing contact details
Update `SITE` at the top of `src/app.js` (email, phone, address, hours and social links). Logo files live in `public/` (`logo.jpg`, `logo-mark.jpg`, `favicon.png`, `apple-touch-icon.png`).

## Enquiries
The contact form submits to Netlify Forms (form name `enquiry`) with a honeypot spam trap. View submissions and set up email notifications in the Netlify dashboard under **Forms**. If you add or rename form fields, update `public/__forms.html` to match.

## Domain
Canonical URLs, the sitemap and robots.txt use the site's primary URL automatically. Adding a custom domain in Netlify updates them on the next deploy.
