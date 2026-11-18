---
title: "Unnest Studio (flatJSON2csv)"
tagline: "Privacy-first local streaming JSON to tabular CSV and Excel studio"
description: "A high-performance, zero-exfiltration JSON flattening engine and interactive web workspace that converts massive nested JSON and NDJSON files into clean tabular CSV and native Excel spreadsheets purely in-browser and via CLI, built with TedCraft UI Mantra and Apple HIG ergonomics."
date: 2026-11-15
featured: true
category: "Data Tools & Web"
tags: ["Python", "JavaScript", "Streaming Parser", "Privacy First", "Client-Side", "Apple HIG", "TedCraft UI Mantra", "Open Source"]
github: "https://github.com/teddymwai/unnest-studio"
demo: "https://teddymwai.github.io/unnest-studio/"
stats:
  - label: "Streaming Engine"
    value: "2-Pass Discovery"
  - label: "Data Exfiltration"
    value: "0 B (100% Local)"
  - label: "Memory Overhead"
    value: "O(1) Per Record"
  - label: "Export Targets"
    value: "CSV & .xlsx"
---

## Overview

Security analysts, compliance auditors, and data engineers frequently work with multi-gigabyte nested JSON and newline-delimited JSON (NDJSON) exports—ranging from CloudTrail audit trails, Identity and Access Management (IAM) permissions, to SIEM event dumps. 

Traditional online JSON converters require uploading files to third-party cloud servers, violating strict data residency and corporate non-disclosure requirements. Meanwhile, desktop spreadsheet applications crash or exhaust system RAM when opening nested records containing irregular schemas.

**Unnest Studio** (`flatJSON2csv`) was engineered to solve this privacy and scalability problem. It provides a local, streaming command-line utility and an in-browser web application that converts deeply nested JSON structures into deterministic tabular CSV and Microsoft Excel (`.xlsx`) files without sending a single byte over the network.

---

## Architectural Highlights: Two-Pass Streaming Engine

Unlike naive parsers that deserialize entire JSON payloads into memory (triggering Out-Of-Memory exceptions on large datasets), Unnest Studio operates on a deterministic, streaming two-pass model:

```
Pass 1: Schema Discovery (Streaming Ingest)
   [ JSON / NDJSON Input ] ──► [ Stream Tokenizer (ijson) ] ──► [ Unique Column Path Registry ]
                                                                             │
                                                                             ▼
Pass 2: Row Emission (Direct-to-Disk)                                 [ Sorted Headers ]
   [ JSON / NDJSON Input ] ──► [ Flatten Record ] ──► [ csv.DictWriter ] ──► [ Tabular CSV / XLSX ]
```

### 1. Pass 1 (Schema Discovery)
The parser streams the input file from start to finish, dynamically identifying every unique flattened object key across all records:
- Nested structures are flattened using period notation (e.g., `user.attributes.email`).
- Array values are indexed or string-serialized to prevent row misalignment.
- Memory consumption during this pass is strictly bounded by the size of the discovered column header set, not the volume of records.

### 2. Pass 2 (Deterministic Writing)
With the global header registry finalized, the engine streams the input file a second time:
- Each record is flattened on the fly and mapped into a pre-allocated row buffer.
- Values are written directly to disk via standard `csv.DictWriter` or appended to an Excel worksheet stream.
- Internal line breaks inside cell values are sanitized to single spaces, guaranteeing that each tabular record occupies exactly one physical line for downstream line-oriented tools (`awk`, `grep`, `cut`).

### 3. $O(1)$ Direct Streaming via `--columns`
When explicit column headers are supplied via the `--columns` parameter, the discovery pass is bypassed entirely. The engine streams records from disk to output in a single linear pass with $O(1)$ memory consumption, determined solely by the single largest JSON object.

---

## Client-Side Web Studio Architecture

Alongside the Python CLI, Unnest Studio includes a self-contained, client-side web application deployed to [GitHub Pages](https://teddymwai.github.io/unnest-studio/):

- **Zero Network Exfiltration:** All JSON tokenization, key path discovery, object flattening, and CSV generation execute entirely on the client thread using HTML5 File and Blob APIs.
- **TedCraft UI Mantra Design Standard:**
  - **Editorial Typography:** Display typography rendered in optical `Newsreader` serif paired with `Instrument Sans` body text and `JetBrains Mono` for tabular metrics and JSON path tokens.
  - **Luxury Dual-Mode Palette:** Dark Default (Brushed Champagne Gold `#d4a853` over Deep Obsidian `#0c0c0e`) and Light Reading Mode (Deep Bronze-Gold `#8c6218` over Warm Ivory Parchment `#f8f6f1`).
  - **Apple HIG Action Controls:** Standalone interactive controls adhere to 44px capsule geometry (`border-radius: 9999px`) with tactile `:active` press feedback.
- **Dual Delivery Model:** Launchable locally through the Python package via `flatJSON2csv --web` (which spins up a minimal local loopback server at `127.0.0.1:8765`) or visited directly on GitHub Pages.

---

## CLI & Packaging Features

- **Core CSV Engine:** Built with Python 3.11+ and `ijson` for rapid iterative parsing.
- **Native Excel Workbooks:** Direct export to native `.xlsx` files with automatic column width calculation using `openpyxl`.
- **Integrated JSON Beautifier:** High-speed syntax-highlighted formatter and validator for inspecting nested structures prior to conversion.
- **Automated Test Coverage:** Complete regression suite verifying deep nesting, UTF-8 character encoding, null values, and irregular sparse arrays.

```bash
# Convert nested JSON to tabular CSV
python flatJSON2csv.py input.json -o output.csv

# Export directly to Microsoft Excel
python flatJSON2csv.py input.json -o output.xlsx --sheet-name "AuditLog"

# Launch local in-browser studio
python flatJSON2csv.py --web
```
