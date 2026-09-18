# Design — The Session Catalog

<!-- Visual world committed 2026-09-17; chosen via impeccable direction roll (seed 0e62ff0f), user-locked pick card. -->

## World

A library card-catalog cabinet. The landing page is the cabinet and its contents: walnut structure, brass label frames, cream catalog card stock, vermilion collection stamps. The product IS a local index — the catalog metaphor is literal, not decorative.

## Color strategy

Committed paper-field: card-stock cream carries the page surface; dark walnut owns structure (top rail, cabinet frame, footer); vermilion is reserved for stamps and the single primary CTA; deep green (the app's own greenbar accent) marks source identity and links.

- `--wood`: #3a2f26 walnut (structure, footer, rail)
- `--wood-deep`: #2a221c (cabinet shadow sides)
- `--brass`: #a9824a / highlight #d9b77c (label frames, pulls)
- `--card`: #f2ead9 card stock; `--card-hi`: #faf4e6 raised card
- `--ink`: #262019 card text; `--ink-soft`: #5c5245 secondary
- `--stamp`: #b5302a vermilion (stamps + primary CTA only)
- `--source`: #2e4a3c deep green (source identity, links)
- Per-agent colors reuse the app's greenbar palette.

## Type

- Display/headings + drawer labels: **Zilla Slab** (slab serif, technical-warm; self-hosted woff2). Condensed-feeling caps, letterspaced, for brass-frame labels.
- Card content, data, paths, counts: **Courier Prime** (typewriter — what real catalog cards were typed with; self-hosted woff2).
- Chinese: system stack (PingFang SC / Noto Sans CJK) — falls back inside both faces' stacks.
- No kicker/eyebrow elements anywhere (floor ban). Drawer labels are physical hardware, not eyebrow copy.

## Signature elements

- **Brass label frame**: inset plate, two visible screw dots, engraved caps — the unit of navigation, drawer fronts, and section identity.
- **Catalog card**: cream card, typed text, 1px ruled red top line, hole-punch at bottom center; deals into view when its drawer opens.
- **Drawer**: wood front + brass pull; slides open on selection to reveal cards.
- **Stamps**: rotated vermilion bordered text — `READ-ONLY` on sealed sources, `LOCAL ONLY` on the privacy section. Rotated −6deg to −10deg, double-rule border.
- **The app mock**: a faithful CSS rendering of AllSessions' greenbar session list lives inside the opened drawer — zebra rows, source dots, mono counts. Synthetic demo content, visibly fictional.

## Motion

One authored moment: the hero drawer opens and its cards deal in (staggered translateY + settle, exponential ease-out). Drawer switching re-deals. Scroll reveals are quiet. `prefers-reduced-motion` collapses all of it.

## Layout

Single column, max ~1180px. Sequence: cabinet-rail nav → hero (pitch + cabinet with working drawers) → source index cards (10 agents, real paths/coverage, stamps) → feature drawers → local-first proof ("卡片不出柜子") → circulation desk (download cards w/ real release assets) → footer. Download CTA present in hero, sticky-ish context, and final section.

## Bilingual

ZH/EN toggle in the rail; `data-i18n` + dict; persisted; default from `navigator.language`. Both languages equal citizens — no layout assumes Latin length.

## Bans honored

No gradient text, no kickers, no icon+heading+card sameness, no emoji-as-icons, no hard offset shadows, no decorative glass. Monospace only for data/paths/code. Stamps are the only rotated element.
