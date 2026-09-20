# editloft.com

The promotional website for [Editloft](https://github.com/thisismyurl/editloft), a free, open-source editorial-workflow plugin for WordPress (a maintained fork of Edit Flow).

Static HTML, no build step, deployed on Cloudflare Pages. This is also the reference template the other plugin promo sites are built from.

## Structure

```
index.html                       Home: hero, stats, features, FAQ, recent releases
features/index.html              Feature hub, including what is NOT included
features/calendar/               Editorial calendar
features/audit-trail/            Audit trail
features/status-transitions/     Role-based status rules
features/developers/             REST, WP-CLI, filters, tests
benefits/index.html              Benefits by role
compare/edit-flow/               Honest Editloft vs Edit Flow comparison
changelog/index.html             Recent releases in plain language
about/  download/  support/      Story, install, FAQ and bug reporting
terms/  privacy/  404.html
assets/
  style.css                      Design system + site layer (light and dark)
  fonts/*.woff2                  Self-hosted Fraunces, Libre Franklin, JetBrains Mono
  diagram-lineage.svg            Fork lineage diagram
  og-image.png, favicon.svg, apple-touch-icon.png
_headers, _redirects, sitemap.xml, robots.txt
```

The layout (sticky header with CTA, split hero, stat strip, icon cards, alternating feature rows, steps, FAQ accordion, closing CTA band, multi-column footer) follows the structure of the ConsultingWP Light block theme, re-skinned with the Editloft tokens in `style.css`. To reuse it for another plugin, swap the PLUGIN-SPECIFIC colour block and the copy.

Copy must match the plugin as shipped. As of 0.6263.1854 that is three modules (calendar, audit trail, status transitions) plus a settings screen. Custom statuses, editorial comments, editorial metadata, notifications, the dashboard widget and Cloud Sync are retired; do not advertise them.

No inline `style=` attributes: the CSP is `style-src 'self'`.

## Preview locally

```bash
python -m http.server 8787
# then open http://127.0.0.1:8787/
```

Serve from the project root so the root-absolute `/assets/` paths resolve.

## Deploy

Cloudflare Pages, connected to this repository. Framework preset: none. Build command: none. Output directory: `/` (root). Every push to `main` deploys; the custom domain is `editloft.com` (apex), with `www` redirecting to it.
