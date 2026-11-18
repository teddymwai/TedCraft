#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const contentDir = path.join(rootDir, 'src', 'content');
const distDir = path.join(rootDir, 'dist');

const TEMPLATE_PHRASES = [
  'Short summary of the bug',
  'The wall hit: What broke or failed unexpectedly?',
  'The turning point: What specific mental model shift',
  'Describe the background situation',
  'Paste representative error logs',
  'Correct, robust remediation code',
  'Rule 1: Always verify assumptions about X',
];

const PLACEHOLDER_URL_RE = /https?:\/\/[^\s"'<>]*(?:\.example\.com|github\.com\/example\/|github\.com\/your-username\/)/gi;
const DUPLICATE_WORD_RE = /\b(OS)\s+\1\b/g;

const errors = [];
const draftSlugs = [];

function walk(dir, extFilter) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full, extFilter));
    } else if (!extFilter || extFilter(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function isDraftEntry(raw) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return false;
  return /^draft:\s*true\s*$/m.test(fmMatch[1]);
}

// 1. Validate source content files
for (const collection of ['works', 'learnings', 'posts']) {
  const files = walk(path.join(contentDir, collection), (n) => n.endsWith('.md') || n.endsWith('.mdx'));
  for (const file of files) {
    const rel = path.relative(rootDir, file);
    const raw = fs.readFileSync(file, 'utf-8');
    const slug = path.basename(file, path.extname(file));

    if (isDraftEntry(raw)) {
      draftSlugs.push({ collection, slug });
      continue;
    }

    for (const phrase of TEMPLATE_PHRASES) {
      if (raw.includes(phrase)) {
        errors.push(`[CONTENT] Template phrase "${phrase}" found in published entry: ${rel}`);
      }
    }

    const urlMatches = raw.match(PLACEHOLDER_URL_RE);
    if (urlMatches) {
      errors.push(`[CONTENT] Placeholder URL(s) ${urlMatches.join(', ')} found in published entry: ${rel}`);
    }

    const dupMatches = raw.match(DUPLICATE_WORD_RE);
    if (dupMatches) {
      errors.push(`[CONTENT] Duplicated word "${dupMatches[0]}" found in: ${rel}`);
    }
  }
}

// 2. Validate built ./dist output if present
if (fs.existsSync(distDir)) {
  const basePath = (process.env.BASE_PATH || '/').replace(/\/$/, '');

  // Ensure draft entries are not emitted in dist
  for (const { collection, slug } of draftSlugs) {
    const routeFolder = collection === 'learnings' ? 'learning-curves' : collection === 'posts' ? 'blog' : collection;
    const emittedDir = path.join(distDir, routeFolder, slug);
    if (fs.existsSync(emittedDir)) {
      errors.push(`[DIST] Draft entry ${collection}/${slug} was emitted to ${path.relative(rootDir, emittedDir)}`);
    }
  }

  const rssFile = path.join(distDir, 'rss.xml');
  if (fs.existsSync(rssFile)) {
    const rss = fs.readFileSync(rssFile, 'utf-8');
    for (const { slug } of draftSlugs) {
      if (rss.includes(slug)) {
        errors.push(`[DIST] Draft slug "${slug}" leaked into dist/rss.xml`);
      }
    }
  }

  const htmlFiles = walk(distDir, (n) => n.endsWith('.html'));
  for (const htmlFile of htmlFiles) {
    const rel = path.relative(rootDir, htmlFile);
    const html = fs.readFileSync(htmlFile, 'utf-8');

    const placeholderHits = html.match(PLACEHOLDER_URL_RE);
    if (placeholderHits) {
      errors.push(`[DIST] Placeholder URL(s) ${placeholderHits.join(', ')} in ${rel}`);
    }

    // Check internal href="/..." links resolve in dist
    const hrefRe = /href="(\/[^"#?]*)/g;
    let match;
    while ((match = hrefRe.exec(html)) !== null) {
      let targetPath = match[1];
      if (basePath && targetPath.startsWith(basePath)) {
        targetPath = targetPath.slice(basePath.length) || '/';
      }
      if (targetPath === '/') continue;
      const clean = targetPath.replace(/^\/|\/$/g, '');
      const candidateFile = path.join(distDir, clean);
      const candidateIndex = path.join(distDir, clean, 'index.html');
      if (!fs.existsSync(candidateFile) && !fs.existsSync(candidateIndex)) {
        errors.push(`[LINK] Broken internal link "${match[1]}" in ${rel}`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`\n[FAIL] Content & build validation failed with ${errors.length} error(s):\n`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(`[PASS] Content & build validation passed (${draftSlugs.length} draft(s) excluded).`);
