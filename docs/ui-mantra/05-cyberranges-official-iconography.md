# 05. CYBER RANGES Official Iconography & Automation Reporting

> **Platform Ground Truth & Test Warehouse Iconography Integration**  
> Extracted from official wire captures (`*.cyberranges.com.har`) and `cyberrange-icons.ttf`.

---

## 1. Architectural Mandate

Whenever test suites, automation harnesses, executive reports, or generative UI components produce outputs related to **CYBER RANGES**, they must prominently feature the **exact iconography of the respective domain** as depicted in `*.cyberranges.com`.

For example:
- A report or UI about **Playlists** (`PL-01` to `PL-05`) must embed the **Playlists iconography** (`.icon-playlist` / `U+E944` / Material Symbol `playlist_play`).
- A report or UI about **Scenarios** (`SL-01` to `SL-09`, `SP-01`) must embed the **Scenarios iconography** (`.icon-scenarios` / `U+E915`).
- A report or UI about **Teams** (`TM-01` to `TM-04`) must embed the **Captain & Team iconography** (`.icon-captain` / `U+E92B`, `.icon-account-group` / `U+E954`).
- A report or UI about **Multiplayer & Lobbies** (`MP-01`, `MP-02`, `LO-01` to `LO-08`) must embed the **PVP / Flag iconography** (`.icon-flag-checkered` / `U+E9A5`, `.icon-trophy` / `U+E957`).
- A report or UI about **Cloud Virtualization** (`CT-01`, `RE-01`) must embed the **Cloud Template & Stack iconography** (`.icon-cloud-template` / `U+E91E`, `.icon-cloud-stack` / `U+E91D`).
- A report or UI about **VPN & Connectivity** (`VPN-01` to `VPN-07`) must embed the **VPN iconography** (`.icon-vpn` / `U+E900`, `.icon-ethernet` / `U+E926`).
- A report or UI about **Goals & Profile** (`G-01`, `G-02`, `UM-08`) must embed the **Assessment & Goals iconography** (`.icon-assessment` / `U+E90C`, `.icon-account` / `U+E955`).

---

## 2. Core Domain Mapping Matrix

| Domain Code | Test Suite Scope | CYBER RANGES Font Class | Font Unicode | Material Symbol Fallback | Canonical Meaning |
|---|---|---|:---:|---|---|
| **`PL`** | Playlists (`PL-01`..`PL-05`) | `.icon-playlist` | `U+E944` (`\ue944`) | `playlist_play` | Public & private scenario playlist catalog |
| **`SL`** / **`SP`** | Scenarios (`SL-01`..`SL-09`, `SP-01`) | `.icon-scenarios` | `U+E915` (`\ue915`) | `sports_esports` | Single-player & active scenario runtimes |
| **`TM`** | Teams (`TM-01`..`TM-04`) | `.icon-captain` / `.icon-account-group` | `U+E92B` / `U+E954` | `groups` | Team lifecycle, roles (Captain, Officer, Recruit) |
| **`MP`** / **`LO`** | Multiplayer & Lobbies (`LO-01`..`LO-08`, `MP-01`..`02`) | `.icon-flag-checkered` / `.icon-trophy` | `U+E9A5` / `U+E957` | `sports_kabaddi` | PvP / TvT battleground lobby matchmaking |
| **`CT`** / **`RE`** | Cloud Virtualization (`CT-01`, `RE-01`) | `.icon-cloud-template` / `.icon-cloud-stack` | `U+E91E` / `U+E91D` | `cloud_circle` | Scenario Composer OpenStack Heat stacks & VMs |
| **`VPN`** | Connectivity (`VPN-01`..`VPN-07`) | `.icon-vpn` / `.icon-ethernet` | `U+E900` / `U+E926` | `vpn_key` | Wire & certificate TAP/TUN client attachments |
| **`G`** / **`UM`** | Goals & Profiles (`G-01`, `G-02`, `UM-01`..`08`) | `.icon-assessment` / `.icon-account` | `U+E90C` / `U+E955` | `track_changes` | Skill KSAs, user credentials & identity |
| **`SB`** | Leaderboard (`SB-01`, `SB-02`) | `.icon-trophy` / `.icon-chart-line` | `U+E957` / `U+E9AB` | `leaderboard` | Live score engine & challenge rankings |
| **`R`** | Reporting (`R-01`..`R-03`) | `.icon-chart-bar` / `.icon-file-multiple` | `U+E9AC` / `U+E98A` | `summarize` | Executive compliance and lobby telemetry |
| **`CDN`** | Asset CDN (`CDN-01`) | `.icon-cloud-sync` | `U+E99D` (`\ue99d`) | `cloud_sync` | Asset delivery verification |

---

## 3. Font Asset Invariants

The official webfont extracted from `7-attach-vpn-scenariocomposer.cyberranges.com.har` is versioned at:
`docs/ui-mantra/assets/fonts/cyberrange-icons.ttf`

### CSS Inclusion
```css
@font-face {
  font-family: 'cyberrange-icons';
  src: url('/assets/fonts/cyberrange-icons.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
  font-family: 'cyberrange-icons' !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-playlist:before { content: "\e944"; }
.icon-scenarios:before { content: "\e915"; }
.icon-captain:before { content: "\e92b"; }
.icon-officer:before { content: "\e932"; }
.icon-recruit:before { content: "\e934"; }
.icon-cloud-template:before { content: "\e91e"; }
.icon-cloud-stack:before { content: "\e91d"; }
.icon-vpn:before { content: "\e900"; }
.icon-flag-checkered:before { content: "\e9a5"; }
.icon-trophy:before { content: "\e957"; }
.icon-dashboard:before { content: "\e936"; }
.icon-assessment:before { content: "\e90c"; }
.icon-node-router:before { content: "\e927"; }
.icon-node-subnet:before { content: "\e928"; }
.icon-node-server-linux:before { content: "\e922"; }
.icon-node-server-windows:before { content: "\e924"; }
```

---

## 4. Markdown & Multi-Renderer Inline Badge Pattern

To ensure consistent high-craft rendering across GitHub, IDE Markdown previews, and Antigravity chat, reports embed an accessible, styled badge that marries the Google Material Symbol with the domain identity:

```html
<span class="cr-icon-badge" style="display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:9999px;background:rgba(14,63,42,0.35);border:1px solid rgba(14,63,42,0.7);color:#f0f6f2;">
  <span class="material-symbols-outlined" style="font-size:18px;color:#2ea043;vertical-align:middle;">playlist_play</span>
  <span style="font-size:12px;font-weight:700;letter-spacing:0.04em;color:#9bb1a4;text-transform:uppercase;">PLAYLISTS</span>
</span>
```

---

## 5. Complete 197-Glyph Inventory

A complete index of all 197 glyphs decoded from `cyberrange-icons.ttf` is maintained in `lib/framework/reporting.py` under `CYBER_RANGES_GLYPH_TABLE`.

