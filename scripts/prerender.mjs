/* Pre-renders every page of the site to static HTML in dist/.
   Each page gets its own URL, title, meta description, canonical link and
   JSON-LD in the HTML source; React then hydrates it in the browser. */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
import React from "react";
import { renderToString } from "react-dom/server";
import htm from "htm";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const out = path.resolve(process.env.OUT_DIR || path.join(root, "dist"));
// Netlify sets URL to the site's primary address (custom domain once added).
const SITE_URL = (process.env.URL || "https://professional-website-bf6a76.netlify.app").replace(/\/$/, "");

const appSrc = fs.readFileSync(path.join(root, "src/app.js"), "utf8");
const cssSrc = fs.readFileSync(path.join(root, "src/styles.css"), "utf8");

// Evaluate the browser bundle in Node with a minimal window shim.
globalThis.window = { React, ReactDOM: {}, htm, __SITE_URL__: SITE_URL };
vm.runInThisContext(appSrc, { filename: "app.js" });
const { R, Shell, html, SITE, NOT_FOUND, buildLd } = globalThis.window.DCS;

const hash = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 10);
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const write = (rel, data) => { const f = path.join(out, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, data); };

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

// Static assets (content-hashed for long-term caching)
const cssName = `assets/styles.${hash(cssSrc)}.css`;
const jsName = `assets/app.${hash(appSrc)}.js`;
write(cssName, cssSrc);
write(jsName, appSrc);
const vendor = [
  ["react", path.join(root, "node_modules/react/umd/react.production.min.js")],
  ["react-dom", path.join(root, "node_modules/react-dom/umd/react-dom.production.min.js")],
  ["htm", path.join(root, "node_modules/htm/dist/htm.umd.js")],
].map(([n, f]) => { const src = fs.readFileSync(f, "utf8"); const name = `vendor/${n}.${hash(src)}.js`; write(name, src); return name; });
for (const f of fs.readdirSync(path.join(root, "public"))) fs.copyFileSync(path.join(root, "public", f), path.join(out, f));

function page(p) {
  const full = SITE.url + p.path;
  const body = renderToString(html`<${Shell} route=${p.route}/>`);
  const ld = JSON.stringify(buildLd(p)).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<meta name="robots" content="${p.noindex ? "noindex, follow" : "index, follow"}">
${p.noindex ? "" : `<link rel="canonical" href="${esc(full)}">\n`}<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.desc)}">
<meta property="og:type" content="${p.ogType || "website"}">
<meta property="og:url" content="${esc(full)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary">
<meta property="og:image" content="${esc(SITE.url)}/logo.jpg">
<meta property="og:image:alt" content="Data Craft Studio logo">
<meta name="theme-color" content="#2E3440">
<link rel="icon" href="/favicon.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap">
<link rel="stylesheet" href="/${cssName}">
<script type="application/ld+json" data-dcs-ld>${ld}</script>
</head>
<body>
<div id="root">${body}</div>
<script>window.__SITE_URL__=${JSON.stringify(SITE_URL)};</script>
${vendor.map((v) => `<script src="/${v}" defer></script>`).join("\n")}
<script src="/${jsName}" defer></script>
</body>
</html>
`;
}

const routes = Object.values(R);
for (const p of routes) write(p.path === "/" ? "index.html" : path.join(p.path, "index.html"), page(p));
write("404.html", page(NOT_FOUND));

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((p) => `  <url><loc>${SITE.url}${p.path}</loc></url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /__forms.html\n\nSitemap: ${SITE.url}/sitemap.xml\n`);

console.log(`Pre-rendered ${routes.length} pages + 404 to ${path.relative(root, out) || out} (${SITE.url})`);
