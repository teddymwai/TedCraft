# Ted's Developer Showcase & Learning Curves Blog

A fast, content-driven developer portfolio and technical blog built with **Astro 5+**, **Tailwind CSS**, and **MDX**.

This setup is purposefully architected around **dual storytelling**:
1. **Showcase Production Works:** Highlights your production systems, developer tools, metrics, GitHub links, and live demos.
2. **The "Learning Curves" Ledger:** Public post-mortems and candid engineering field notes detailing the obstacles ("The Wall"), turning points ("The Breakthrough"), and permanent heuristics learned from complex bugs and architectural shifts.

---

## Quick Start

From the project root:

```bash
# 1. Install dependencies (if not already installed)
npm install

# 2. Start the local development server (with live reload)
npm run dev

# 3. Build for production (outputs to ./dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

The site will be available at `http://localhost:4321`.

---

## Content Architecture

All content is managed through Astro Content Collections with strict TypeScript schema validation (`src/content.config.ts`).

### 1. Adding a New Project (`src/content/works/`)

Create a Markdown (`.md`) or MDX (`.mdx`) file in `src/content/works/my-project.md`:

```yaml
---
title: "Distributed Task Orchestrator"
tagline: "High-throughput asynchronous job engine with automated failure recovery"
description: "A fault-tolerant task queue engineered to process thousands of automation pipelines with zero message loss."
date: 2026-11-15
featured: true
category: "Systems & Infrastructure"
tags: ["Node.js", "Redis", "TypeScript", "Distributed Systems"]
github: "https://github.com/your-username/my-project"
demo: "https://demo.example.com"
stats:
  - label: "Throughput"
    value: "10k jobs/min"
  - label: "Recovery Rate"
    value: "99.98%"
---

## Overview
Write your project case study here in standard Markdown or MDX...
```

### 2. Adding a New "Learning Curve" (`src/content/learnings/`)

Create a Markdown file in `src/content/learnings/my-tough-bug.md`:

```yaml
---
title: "Diagnosing POSIX Pipe Buffer Deadlocks in Node.js Subprocesses"
subtitle: "Why our runner hung silently without errors, and the async stream drain that cured it"
date: 2026-10-28
topic: "Concurrency & OS Pipes"
curveLevel: "Steep" # Options: 'Steep' | 'Moderate' | 'Smooth'
obstacle: "Subprocesses hung indefinitely whenever stdout exceeded 64KB, with zero error logs."
breakthrough: "Internal OS pipe buffers filled up, blocking the child write syscall while the parent waited for exit."
takeaways:
  - "Never use child_process.exec for processes with streaming or high-volume output."
  - "Always drain stdout/stderr continuously using event listeners on child.spawn."
tags: ["Node.js", "Operating Systems", "Debugging"]
---

## The Situation
Detail the backstory and initial symptoms...

## The Breakthrough
Share the code snippet, RFC, or mental model shift that cracked the problem...
```

### 3. Adding a New Blog Post (`src/content/posts/`)

Create a Markdown file in `src/content/posts/my-post.md`:

```yaml
---
title: "Why I Publicly Document My Learning Curves"
description: "Why chronicling the steep climbs creates sharper engineering instincts than only showing polished artifacts."
pubDate: 2026-11-01
tags: ["Philosophy", "Career", "Engineering"]
readTime: "4 min read"
---

Your article content goes here...
```

---

## Design & Web Standards

- **Theme & Dark Mode:** Implements the modern web platform pattern (`light-dark()`, `<meta name="color-scheme">` state syncing, and inline anti-FOUC script) with zero layout flash.
- **Accessible & Keyboard Friendly:** Standard focus rings, semantic HTML landmarks (`<main>`, `<header>`, `<footer>`, `<nav>`, `<article>`), and high-contrast color tokens.
- **Zero-JS Content:** Reading blog posts and case studies incurs near-zero client-side JavaScript, ensuring instantaneous page loads.

---

## 1-Click Deployment

Because Astro outputs standard static HTML, CSS, and JS into `./dist`, you can deploy to:
- **Vercel / Netlify:** Connect your GitHub repository; framework detection auto-selects Astro.
- **GitHub Pages:** Add an Astro GitHub Actions workflow (`astro.build/en/guides/deploy/github/`).
- **Cloudflare Pages:** Build command `npm run build`, output directory `dist`.
