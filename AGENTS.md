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

## Iconography & Visual Invariants

- **Strictly No Emojis**: NEVER use emojis or Unicode pictographs in any UI components, layouts, badges, content collections, documentation, or CLI scripts.
- **Icon Packs Only**: Always use clean, accessible inline SVG elements (Heroicons, Lucide, or standard SVG paths) with appropriate `aria-hidden="true"`, explicit stroke/fill tokens, and semantic wrapper text.
- **Status Badges**: For status indicators (e.g., "Featured", "Verified"), use text labels paired with inline SVGs or colored dot indicators (`w-2 h-2 rounded-full bg-emerald-500`), never emoji glyphs.
