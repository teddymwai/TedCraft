## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## UI Mantra, Apple HIG & Unslop Architecture

All UI components, pages, and content entries must adhere to the imported design system and skills:

- **Base Rule**: `.agents/rules/ui-mantra-architecture.md` and `docs/ui-mantra/`
- **Unslop Methodology**: `.agents/skills/unslop-ui/SKILL.md` + `docs/ui-mantra/03-ui-unslop-methodology.md` (9-pass redline order, `4px` grid rhythm, `Newsreader` display serif + `Instrument Sans` UI/body + `JetBrains Mono` `tabular-nums`, sentence-case labels, quiet chrome, one focal bright element per view, and `DOC-CR //` dossier index stamps).
- **Apple HIG Components**: `.agents/skills/apple-hig-components/SKILL.md` (`44x44px` minimum hit targets via `.hig-btn` and `.hig-filter-pill`, capsule geometry, `:active` tactile scale `0.975`, and sanitized `.hig-select` dropdowns with `42px` right chevron reservation).
- **Luxury Dual-Mode Palette & Studio Curve Canvas**:
  - Dark Default: Champagne Gold (`#d4a853`) on Deep Obsidian (`#0c0c0e` canvas, `#151518` cards, `#efe9de` primary text).
  - Light Reading Mode: Deep Bronze-Gold (`#8c6218`) on Warm Ivory Parchment (`#f8f6f1` canvas, `#fdfbf7` cards, `#1f1b16` primary text).
  - Both modes layer over `/backgrounds/img001.jpg` (*Studio Curve*) with theme-adaptive wash overlays.
- **Strictly No Emojis & Hybrid Domain Iconography**:
  - NEVER use emojis or Unicode pictographs anywhere in UI components, layouts, badges, content collections, documentation, or CLI scripts.
  - Use `<DomainBadge />` combining wire-extracted `CYBER RANGES` glyphs (`/fonts/cyberrange-icons.ttf`) for platform domains and **Google Fonts Material Symbols Outlined** for general UI controls and broader security/engineering entries.
