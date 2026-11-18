# TedCraft UI Mantra & Design System

This directory houses the foundational design principles, component specifications, brand palette guidelines, and iconography standards for all **CYBER RANGES** user interfaces, applications, dashboards, and agent-generated web components.

---

## 1. Pillars of the UI Mantra

1. **[01. Brand Identity & Palette](01-brand-identity-and-palette.md)**
   - Grounded in **`rgba(14, 63, 42, 1.00)`** (`#0e3f2a` / deep luxury forest green).
   - High-contrast obsidian/graphite dark surfaces (`#090d0b`, `#0d1310`, `#151f1a`).
   - WCAG AAA contrast typography (`#f0f6f2` primary copy).
   - Strict brand nomenclature: **`CYBER RANGES`** (ALL-CAPS, TWO WORDS).

2. **[02. Iconography & Zero Emojis](02-iconography-and-zero-emojis.md)**
   - Strict **ZERO EMOJIS** policy across all UI elements, labels, buttons, cards, and headers.
   - **Google Fonts Material Symbols** exclusively (standard 16px–20px sizing, muted tinting).

3. **[03. UI Unslop Methodology](03-ui-unslop-methodology.md)**
   - Quiet Chrome: Navbars, sidebars, cards, and table borders remain calm and muted.
   - One Bright Element: Reserve vibrant accents for the primary focal point or metric.
   - Strict 4px Grid: All spacing, paddings, margins, gaps, and line heights follow multiples of 4 (4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px).
   - Ban on AI-slop tells: No purple gradients, glowing borders, glossy blobs, or pulsing elements.

4. **[04. Apple HIG Component Foundation](04-apple-hig-components/buttons.md)**
   - Component geometry: **Capsule** (`border-radius: 9999px`) for standalone actions; **Rounded Rectangle** (`10px`–`12px`) for vertical stacks.
   - Ergonomics: Mandatory minimum interactive hit region of **`44x44 px`** (using `::after` targets).
   - Visual hierarchy: Differentiate importance through **Style Prominence** (`Prominent Filled`, `Tinted Glass`, `Plain`), never by mixing different button heights side by side.
   - Tactile feedback: Mandatory press state (`transform: scale(0.97)` on `:active`).
   - **Form Controls & Selects**: Cross-browser reset (`appearance: none`), 42px right chevron reservation, and text truncation (`text-overflow: ellipsis`) documented in **[select-and-inputs.md](04-apple-hig-components/select-and-inputs.md)**.

5. **[05. Official Iconography & Automation Reporting](05-cyberranges-official-iconography.md)**
   - Wire-extracted official glyphs from `*.cyberranges.com.har` and `cyberrange-icons.ttf`.
   - Domain-to-icon mapping across all test domains (Playlists, Scenarios, Teams, Virtualization, Goals, Lobbies).
   - Enforced inline badges for automation reports (`run-report.md`) and UI components.

6. **[06. Background Theming & Canvas Architecture](06-background-theming-and-canvas.md)**
   - Dual-layer composite canvas: Fixed parallax backplane + luxury obsidian gradient tint overlay.
   - Standardized canvas: `img001.jpg` (Studio Curve) standard across all CYBER RANGES *.html dashboards, tools, and reports.
   - Elimination of theme selectors for clean, unslop chrome consistency.
   - Dual-mode HTTP `/backgrounds/*` and `file://` fallback resolution.

---

## 2. Directory Structure

```text
docs/ui-mantra/
├── README.md                              # This document
├── 01-brand-identity-and-palette.md       # Color hierarchy, hex tokens, and contrast ratios
├── 02-iconography-and-zero-emojis.md      # Icon standards & strict zero-emoji mandate
├── 03-ui-unslop-methodology.md            # Quiet chrome, 4px rhythm, 9-pass execution
├── 04-apple-hig-components/               # Apple HIG Component specifications
│   ├── blueprint.md                       # 8-category modular HIG expansion roadmap
│   ├── buttons.md                         # Button tokens, capsule rules, hit targets, CSS
│   └── select-and-inputs.md               # Select menus, appearance reset, chevron overflow
├── 05-cyberranges-official-iconography.md # Wire-extracted official iconography & reporting
├── 06-background-theming-and-canvas.md    # Dual-layer canvas theming & background asset protocols
└── assets/
    ├── backgrounds/                       # Canonical background image assets & symlinks
    └── fonts/                             # Official wire icon font (cyberrange-icons.ttf)
```

---

## 3. Autonomous Agent Integration

AI coding agents running in this repository load:
- The base constitution via `.agents/rules/ui-mantra-architecture.md` (always-on rule).
- The modular Apple HIG component skill via `.agents/skills/apple-hig-components/SKILL.md` (activated on demand for UI tasks).
- The unslop redline skill via `.agents/skills/unslop-ui/SKILL.md` (9-pass execution order, audit checklist), specified in `docs/ui-mantra/03-ui-unslop-methodology.md`.
