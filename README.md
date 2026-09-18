# allsessions-site

Marketing site for [AllSessions](https://github.com/yuluod/AllSessions) — a local-first desktop workbench for AI coding-agent sessions.

Static HTML/CSS/JS, no build step. Deployed on GitHub Pages.

## Develop

```bash
python3 -m http.server 8642
# open http://127.0.0.1:8642
```

## Design

Visual world: **The Session Catalog** — a library card-catalog cabinet (walnut, brass label frames, typed index cards, vermilion stamps). See `DESIGN.md`; product facts in `PRODUCT.md`; copy deck in `copy.md`.

Fonts (Zilla Slab, Courier Prime) are self-hosted under `assets/fonts/` — do not substitute CDN links, they must work without external requests.

Release asset links are fetched live from the GitHub Releases API at runtime; the page degrades to static links when the API is unavailable.
