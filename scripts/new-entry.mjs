#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const [type, ...titleParts] = process.argv.slice(2);
const title = titleParts.join(' ').trim();

if (!type || !['learning', 'work', 'post'].includes(type) || !title) {
  console.log(`
Usage:
  npm run new:learning "Title of your learning curve / post-mortem"
  npm run new:work "Title of your project / work"
  npm run new:post "Title of your blog post / essay"

Examples:
  npm run new:learning "Handling TCP Socket Timeouts in High-Throughput Scrapers"
  npm run new:work "Distributed Task Orchestrator V2"
  npm run new:post "Why We Ban Artificial Sleep Delays in Test Suites"
`);
  process.exit(1);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const slug = slugify(title);
const today = new Date().toISOString().split('T')[0];

let targetDir = '';
let content = '';

if (type === 'learning') {
  targetDir = path.join(rootDir, 'src', 'content', 'learnings');
  content = `---
title: "${title}"
subtitle: "Short summary of the bug, challenge, or architectural puzzle"
date: ${today}
draft: true
topic: "Architecture & Systems" # e.g. "Concurrency", "Performance", "QA Automation", "Networking"
curveLevel: "Moderate" # Options: "Steep" | "Moderate" | "Smooth"
obstacle: "The wall hit: What broke or failed unexpectedly? What was the confusing symptom?"
breakthrough: "The turning point: What specific mental model shift, RFC, or source code inspection solved it?"
takeaways:
  - "Rule 1: Always verify assumptions about X before modifying Y"
  - "Rule 2: Avoid naive polling when reactive events or signals are available"
tags: ["Debugging", "Architecture", "Systems"]
---

## 1. The Symptom & Operational Context

Describe the background situation, where this issue was observed, and what failure mode occurred.

\`\`\`
// Paste representative error logs or broken behavior here
\`\`\`

## 2. False Assumptions (What Failed Initially)

Detail the initial hypotheses you tested and why standard or intuitive fixes did not work.

\`\`\`ts
// Example of naive code or initial approach that failed
\`\`\`

## 3. The Turning Point & Remediation

What led to the actual solution? Was it an OS-level abstraction, a timing issue, or a race condition?

\`\`\`ts
// Correct, robust remediation code
\`\`\`

## 4. Permanent Engineering Heuristics

Summarize the durable rules or checks to apply across future codebases so this failure never reoccurs.
`;
} else if (type === 'work') {
  targetDir = path.join(rootDir, 'src', 'content', 'works');
  content = `---
title: "${title}"
tagline: "One-sentence high-impact value proposition"
description: "A detailed summary of the problem this tool solves and how it functions."
date: ${today}
featured: false
draft: true
category: "Developer Tools" # e.g. "Systems & Infrastructure", "Web & Developer Tools", "Security & QA"
tags: ["TypeScript", "Architecture", "Tooling"]
github: "https://github.com/teddymwai/${slug}"
stats:
  - label: "Throughput"
    value: "1,000 req/s"
  - label: "Latency P99"
    value: "15ms"
---

## Overview & Motivation

Why was this project created? What pain point in existing workflows did it address?

## Architecture & Design Decisions

Explain the technical design, data flows, and trade-offs made during development.

\`\`\`
[ Client ] ──► [ Ingestion Service ] ──► [ Storage / Worker ]
\`\`\`

## Key Capabilities & Production Impact

- **Capability 1:** Description of feature and technical mechanics.
- **Capability 2:** Reliability safeguards and error handling.
`;
} else if (type === 'post') {
  targetDir = path.join(rootDir, 'src', 'content', 'posts');
  content = `---
title: "${title}"
description: "A concise overview of the essay or article topic."
pubDate: ${today}
tags: ["Engineering", "Philosophy", "Best Practices"]
readTime: "5 min read"
draft: true
---

Introduction setting up the context and thesis of this article...

## Key Insights

Your thoughts, arguments, and practical examples...

## Conclusion & Recommendations

Final wrap-up and takeaways for fellow developers...
`;
}

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const filePath = path.join(targetDir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`Error: File already exists at ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n[SUCCESS] Created new ${type} entry:`);
console.log(`  File: ${filePath}`);
console.log(`  Title: ${title}\n`);
