# 06. Background Theming & Canvas Architecture

This document formalizes the canvas theming architecture, background image standards, and surface layering protocols across all **CYBER RANGES** HTML dashboards, control planes, operator tools, and executive presentation guides.

---

## 1. Architectural Foundations

To preserve high craft and executive immersion without compromising WCAG AAA data readability, background images are never applied bare. All dashboards employ a **dual-layer composite canvas** consisting of:

1. **Fixed Parallax Backplane:** High-resolution texture pinned to viewport coordinates (`background-attachment: fixed; background-size: cover; background-position: center top;`).
2. **Deep Obsidian Gradient Tint Overlay:** Luxury tinting (`rgba(9, 13, 11, 0.86)` to `rgba(9, 13, 11, 0.95)`) engineered to suppress high-frequency image noise while allowing underlying geometric or sculptural silhouettes to subtly ground the viewport.
3. **Elevated Frosted Glass Surfaces:** Cards, sidebars, top navigation headers, and modal surfaces leverage translucent backgrounds with hardware-accelerated backdrop blur (`rgba(21, 31, 26, 0.88)` with `backdrop-filter: blur(12px)` and delicate hairline borders `rgba(255, 255, 255, 0.08)`).

```css
:root {
  --bg-overlay: linear-gradient(180deg, rgba(9, 13, 11, 0.86) 0%, rgba(9, 13, 11, 0.94) 100%);
  --active-bg-image: url('/backgrounds/img001.jpg');
}

body {
  margin: 0;
  background-color: var(--bg);
  background-image: var(--bg-overlay), var(--active-bg-image);
  background-size: cover;
  background-position: center top;
  background-attachment: fixed;
  background-repeat: no-repeat;
  color: var(--text);
}
```

---

## 2. Canonical Standard Background Canvas

All HTML dashboards, control panels, test runners, tools, and reports standardize strictly on **Studio Curve (`img001.jpg`)**. Redundant theme options and selector dropdowns have been permanently eliminated across all operator tools to enforce quiet chrome, visual cohesion, and brand integrity.

| File Name | Resolution | Theme Codename | Dedicated Role across All Dashboards |
| :--- | :--- | :--- | :--- |
| `img001.jpg` | 3840 × 2160 | **Studio Curve (Default Standard)** | **Standard for all CYBER RANGES HTML dashboards, tools, and reports** (RangeMaster Cockpit, UI Recorder Studio, Cloud Template Boot Tester, Showcase). Sleek 3D sculptural ribbon on deep obsidian. |

Canonical background image assets remain centrally versioned under `docs/ui-mantra/assets/backgrounds/` and symlinked/served across runtime tooling endpoints (`/backgrounds/*`).

---

## 3. Tool & Dashboard Standard Deployment Mapping

Every interactive tool and guide runs with the unified **Studio Curve (`img001.jpg`)** canvas without cluttering header chrome with theme selectors:

### A. RangeMaster Cockpit (`tools/operator_panel/static/operator_panel_dashboard.html`)
- **Default Canvas:** `img001.jpg` (Studio Curve).
- **Behavior:** Applied across all target tenancies (`production`, `foundry`, `crtraining`, `afcearange`, `cis_hct`).
- **Standardized Surface:** Theme selector dropdown removed; clean operator control strip.

### B. UI Recorder Studio (`tools/recorder_studio/static/recorder_studio_dashboard.html`)
- **Default Canvas:** `img001.jpg` (Studio Curve).
- **Behavior:** High-precision creative reverse-engineering feel.
- **Standardized Surface:** Theme selector dropdown removed; quiet header chrome.

### C. Resource-Conscious Boot Tester (`tools/template_runner/mct_logserver_dashboard.html`)
- **Default Canvas:** `img001.jpg` (Studio Curve).
- **Behavior:** Sleek sculptural ribbon complementing OpenStack hypervisor telemetry.
- **Standardized Surface:** Theme selector dropdown removed; dedicated rate limiter and elapsed counters.

### D. Autonomous QA Platform Showcase (`docs/showcase/index.html`)
- **Default Canvas:** `img001.jpg` (Studio Curve).
- **Behavior:** Executive presentation backdrop for team walkthroughs.
- **Standardized Surface:** Theme toggle button removed; clean navigation bar.

---

## 4. HTTP Asset Routing & Dual Protocol Compatibility

To support seamless local offline development without origin collisions or broken assets:

1. **Local Server Route Aliasing:**
   - `tools/operator_panel/server.py`, `tools/recorder_studio/server.py`, and `tools/template_runner/boot_mct_logserver.py` intercept `GET /backgrounds/<file>` and stream assets directly with appropriate `image/jpeg` MIME headers.
2. **`file://` Protocol Fallback:**
   - JavaScript runtime helper `getBgUrl(themeKey)` detects `window.location.protocol === "file:"` and automatically computes relative filesystem paths back to `docs/ui-mantra/assets/backgrounds/`.
3. **Zero Git Bloat Guarantee:**
   - Unsplash textures are pre-downsampled to 1920px width (`sips -Z 1920`) with 80% JPEG quality, ensuring repository footprint stays lean and fast.
