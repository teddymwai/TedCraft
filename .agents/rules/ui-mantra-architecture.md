---
name: ui-mantra-architecture
description: Base UI development, luxury Champagne Gold & Deep Obsidian / Warm Ivory Parchment dual-theme design system, iconography, brand nomenclature, and Apple HIG / Unslop architecture for Thaddeus Mwai's portfolio and engineering blog.
trigger: always_on
---

# Portfolio & Engineering Blog Base Mantra Architecture: UI, Brand, & Craft

Every agent, engineer, and UI workflow in this repository must abide by these rules:

## 1. Brand Nomenclature
- When referencing the platform or employer, always format as **`CYBER RANGES`** (ALL-CAPS, TWO WORDS, space-separated).
- Prohibited: `CyberRanges`, `Cyber Ranges`, `cyberranges`, `cyber ranges`.

## 2. Luxury Dual-Mode Color Palette (Champagne Gold & Deep Obsidian / Warm Ivory Parchment)
- **Dark Default (Deep Obsidian & Brushed Champagne Gold)**:
  - Canvas & Surfaces: Deep obsidian `#09090b`, `#0c0c0e`, elevated frosted glass cards `rgba(21, 21, 24, 0.86)` (`#151518` solid), raised controls `#1f1f23`.
  - Accent: Brushed Champagne Gold `#d4a853` (hover `#e2bc6b`, dark ink foreground `#0c0c0e`).
  - Three Text Roles (WCAG AAA): Primary warm off-white `#efe9de`, secondary `#aaa398`, muted `#8a847a`.
- **Light Reading Mode (Warm Ivory Parchment & Deep Bronze-Gold)**:
  - Canvas & Surfaces: Warm ivory parchment `#f8f6f1`, elevated cards `rgba(253, 251, 247, 0.88)` (`#fdfbf7` solid), subtle surface `#efe9df`.
  - Accent: Deep Bronze-Gold `#8c6218` (hover `#6e4c10`, light foreground `#fdfbf7`).
  - Three Text Roles: Primary espresso ink `#1f1b16`, secondary `#5e554a`, muted `#7b7266`.
- **Dual-Layer Studio Curve (`img001.jpg`) Canvas**:
  - Active across both themes via `public/backgrounds/img001.jpg`: pinned parallax backplane with an `87–95%` warm obsidian wash in dark mode and a `93–96%` warm ivory wash in light mode so a subtle sculptural silhouette grounds the viewport.

## 3. Typography & Unslop Structure (CYBER RANGES UI Mantra)
- **Editorial & Technical Precision Pairing**:
  - Display & Article Headlines: `Newsreader` (optical serif, weights `400`–`500`, tight display tracking `-0.025em`). Never use `700`–`900` weights or gradient text.
  - Interface & Body Prose: `Instrument Sans` / `Inter` (weights `400`–`500`).
  - Telemetry Figures, Domain Codes, & Code: `JetBrains Mono` with `font-variant-numeric: tabular-nums`.
- **Unslop Discipline**:
  - Quiet chrome: headers, cards, and borders remain understated (`1px` hairlines at `8–9%` opacity).
  - One bright element per view (e.g., the Champagne Gold focal telemetry metric in the Verification Telemetry Dossier).
  - Strict `4px` grid rhythm for all padding, margin, gap, and sizing dimensions.
  - Sentence-case labels everywhere; no uppercase tracked shouting labels, no trailing periods on short headlines/buttons, and no `animate-pulse` on static indicators.
  - Signature Detail: Monospace dossier index stamps (`DOC-CR // 01`, `LC // 01`, `ESSAY // 01`).

## 4. Apple HIG Component Foundation
- **Shapes & Hit Targets**: Capsule (`border-radius: 9999px`) for standalone actions, filter pills, and horizontal button rows; minimum **`44x44px`** hit target area on all interactive controls (using `::after` hit-target expansion on `36px` visual pills).
- **Equal Sizing & Prominence Hierarchy**: Sibling buttons in a row share the exact same `44px` height and rank importance via Style Prominence (`.hig-btn-primary`, `.hig-btn-tinted`, `.hig-btn-glass`, `.hig-btn-plain`), never by mixing sizes.
- **Tactile Response**: Immediate press feedback (`transform: scale(0.975)` on `:active`, guarded by `prefers-reduced-motion`).
- **Form Controls & Select Sanitization**: All `<select>` controls use `.hig-select` (`appearance: none`, `44px` height, `42px` right chevron reservation, `text-overflow: ellipsis`).

## 5. Hybrid Iconography & Strict Zero-Emoji Mandate
- **Strictly Zero Emojis**: Never use emojis anywhere in UI chrome, badges, markdown content, or CLI scripts.
- **Hybrid Domain Badges (`<DomainBadge />`)**:
  - Embed official wire-extracted `CYBER RANGES` glyphs from `/fonts/cyberrange-icons.ttf` (`.icon-dashboard`, `.icon-cloud-template`, `.icon-scenarios`, `.icon-assessment`, `.icon-node-router`, `.icon-captain`, `.icon-playlist`) for platform verification works and post-mortems.
  - Use **Google Fonts Material Symbols Outlined** (`15px–18px`, monochrome secondary/muted tint) for general UI controls and broader security/engineering entries.

## 6. Self-Owned Design System: No External Attribution
- The UI Mantra (unslop methodology, Apple HIG adaptation, palette, iconography) is an internal CYBER RANGES standard.
- Never add external author handles, personal sites, third-party repository links, or `legacy/` vendored paths to docs, rules, READMEs, UI footers, or templates. Cite internal paths only (e.g. `docs/ui-mantra/03-ui-unslop-methodology.md`).
- Permitted: functional namespace URIs (`http://www.w3.org/2000/svg`, JSON Schema `$schema`) and runtime asset imports (Google Fonts Material Symbols stylesheet).
- Third-party code retained under its own license (e.g. CC BY 4.0) keeps its license notice in place; never propagate that notice into internal docs. Prefer rewriting as an original internal artifact over vendoring.
