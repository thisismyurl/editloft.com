# editloft.com

The promotional website for [Editloft](https://github.com/thisismyurl/editloft), a free, open-source editorial-workflow plugin for WordPress (a maintained fork of Edit Flow).

Static HTML, no build step, deployed on Cloudflare Pages. This is also the reference template the other plugin promo sites are built from.

## Structure

```
index.html            Home (SEO landing)
about/index.html      The Edit Flow lineage and why Editloft exists
download/index.html   Requirements, download, install, version, license
support/index.html    FAQ, migration, bug reporting, newcomer path
terms/index.html      Terms of use (GPLv2)
privacy/index.html    Privacy policy (local-first; Cloud Sync is opt-in)
404.html              Custom not-found page
assets/
  style.css           The design system (light + dark, theme-aware)
  fonts/*.woff2        Self-hosted Fraunces, Libre Franklin, JetBrains Mono
  diagram-*.svg        The editorial-lifecycle and fork-lineage diagrams
  og-image.png         1200x630 social card
  favicon.svg, apple-touch-icon.png
_headers              Cloudflare Pages security + cache headers
_redirects            www -> apex canonical redirect
sitemap.xml, robots.txt
```

## Preview locally

```bash
python -m http.server 8787
# then open http://127.0.0.1:8787/
```

Serve from the project root so the root-absolute `/assets/` paths resolve.

## Deploy

Cloudflare Pages, connected to this repository. Framework preset: none. Build command: none. Output directory: `/` (root). Every push to `main` deploys; the custom domain is `editloft.com` (apex), with `www` redirecting to it.
