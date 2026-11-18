# Form Controls & Select Sanitization: Apple HIG & Overflow Architecture

This specification defines the foundational rules for styling, sizing, and sanitizing form controls—specifically dropdown menus (`<select>`), text inputs, and search fields—across all **CYBER RANGES** applications, control panels, and operator dashboards.

---

## 1. Core Mandates

1. **Cross-Browser Appearance Reset**: All `<select>` elements must explicitly strip native operating system chrome:
   ```css
   appearance: none;
   -webkit-appearance: none;
   -moz-appearance: none;
   ```
2. **Apple HIG 44px Hit Target**: Touch and click bounds must provide a minimum physical height of **44px** (`height: 44px; min-height: 44px; line-height: 42px;`).
3. **Capsule & Rounded Geometry**:
   - Standalone settings, filters, and toolbar selectors: **Capsule** (`border-radius: 9999px`).
   - Stacked card forms and modal drawers: **Rounded Rectangle** (`border-radius: 8px`–`12px`).
4. **Reserved Chevron Spacing**: Dedicate at least **36px–42px** right padding (`padding: 0 42px 0 16px;`) so option labels never collide with or render beneath the chevron icon.
5. **Text Truncation & Overflow Containment**: Prevent long tenant slugs, multi-tier FQDNs, or descriptive tags (e.g. `cis_hct (cis.hct.cyberranges.com) [READ-ONLY]`) from spilling past the right border:
   ```css
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
   ```
6. **Material Symbols SVG Chevrons**: Use subtle secondary-tinted (`#9bb1a4`) SVG chevrons anchored at `calc(100% - 14px) center`.

---

## 2. Standard CSS Implementation

```css
/* Standard CYBER RANGES Capsule Select */
select {
  background-color: var(--surface2, #151f1a);
  color: var(--text, #f0f6f2);
  border: 1px solid var(--surface-border, rgba(255, 255, 255, 0.08));
  border-radius: 9999px;
  padding: 0 42px 0 16px;
  height: 44px;
  min-height: 44px;
  line-height: 42px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 -960 960 960' width='20' fill='%239bb1a4'%3E%3Cpath d='M480-360 280-560h400L480-360Z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: calc(100% - 14px) center;
  background-size: 18px;
  cursor: pointer;
  vertical-align: middle;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

select:focus {
  border-color: var(--brand-active, #1b5e3f);
  box-shadow: 0 0 0 1px var(--brand-active, #1b5e3f);
}

select option {
  background: var(--surface, #0d1310);
  color: var(--text, #f0f6f2);
  padding: 8px 12px;
}
```

---

## 3. Control Surface & Dashboard Nomenclature Invariant

All web control surfaces, HTML dashboards, and operator interfaces in `tools/<tool_name>/static/` (or `tools/<tool_name>/`) must strictly follow:
```text
tools/<tool_name>/static/<tool_name>_dashboard.html
```

* **Prohibited**: Generic or naked `index.html`.
* **Reasoning**: Eliminates multi-tab editor ambiguity, preserves AST/grep index clarity, and enforces self-describing file identities across operational tools.

