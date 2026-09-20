# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no framework, no build step. Deployed on GitHub Pages from its own repository (`yuluod/allsessions-site`). Chosen to match the main project's dependency-free vanilla JS style and keep maintenance at zero.

## Users

Developers who run several AI coding agents (Codex, Claude Code, Gemini CLI, Pi, Kimi Code CLI, OpenCode, ZCode, Cursor, Devin, GitHub Copilot) and lose track of where their past sessions live. Their situation: sessions scattered across agent-specific directories and formats; their job: find, inspect, organize, and export past agent sessions from one place. Bilingual audience — Chinese and English.

## Product Purpose

AllSessions is a local-first Tauri 2 desktop app that discovers, normalizes, searches, and organizes local AI coding-agent sessions — a single local index over all of them. Success for this site: a visitor downloads the app.

## Positioning

The only unified, fully local session browser across twelve local sources in eleven agent ecosystems. Session discovery, parsing, trigram full-text search, and caching run in Rust on-device; no local HTTP server, no cloud service, no bundled Node runtime. Neighboring tools are single-agent viewers or cloud-backed dashboards — none can truthfully claim this combination of multi-source coverage and local-first privacy.

## Operating Context

- Distribution is via GitHub Releases: Windows `.exe`, macOS `.dmg` (ARM64/x64), Linux `.deb`; signed in-app updater.
- macOS builds are not notarized — first launch may need a Gatekeeper allow.
- Evaluated by developers inside GitHub's orbit: README, Releases, Issues.
- The app itself is bilingual (ZH/EN) with five themes and light/dark/system schemes.

## Capabilities and Constraints

- Unified session browsing across 10 sources; normalized conversations, thinking, tool calls, raw events.
- Local SQLite trigram full-text search; bounded memory windows for long sessions.
- Favorites, tags, notes, saved filters, statistics, JSON/Markdown export with optional redaction.
- Desktop integration: reveal in file manager, open terminal in working directory, resume session in the source agent (Cursor/Devin read-only).
- Strong privacy story: never modifies read-only sources; local backup before destructive ops; sanitized diagnostics.
- Independent community project — not affiliated with the supported agents' vendors. Names are used only to identify compatible data sources. This disclaimer must stay factual and visible.

## Brand Commitments

- Name: AllSessions. Tagline territory: "local-first index for AI coding-agent sessions" / 「本地 AI 会话索引」.
- App icon exists: `public/assets/allsessions-icon-v3.png` in the main repo.
- Agent SVG icons exist (lobe-icons set, license file included): claude, cursor, devin, gemini, kimi, openai, opencode, pi, zcode.
- License: Apache-2.0.
- Voice: precise, engineering-register, no hype. README tone is the reference.

## Evidence on Hand

- Real product UI exists in the main repo (Tauri app; vanilla JS frontend). No screenshots may be published — README warns real session data is sensitive. Interface imagery must be CSS-drawn mock UI with synthetic demo content.
- README feature set and supported-sources table are factual copy sources.
- No testimonials, benchmarks, press, or user counts — must not be fabricated.

## Product Principles

- Download-first: every screen has an obvious, platform-aware path to the installer.
- Prove local-first: privacy claims are concrete (what runs where, what never leaves the machine), not slogans.
- Show, don't stock-photo: interface imagery is a faithful CSS rendering of the real app, clearly synthetic.
- Developer credibility over marketing polish: precise copy, real version/asset names, honest caveats (e.g. macOS notarization).
- Bilingual parity: ZH and EN are equal citizens, not a translation afterthought.
