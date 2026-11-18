# Semantic Entity & AI-SEO Playbook

This playbook provides actionable, type-safe procedures for placing and maintaining TedCraft content in Modern Semantic Search and LLM Retrieval Entity Graphs (Perplexity, ChatGPT Search, Gemini, Claude, Google SGE).

---

## 1. The Entity Graph Model

Rather than optimizing for isolated keywords, modern search algorithms extract an interconnected Knowledge Graph using Schema.org vocabulary.

```
[Person: #person]
  │
  ├── knowsAbout ────────► ["Cybersecurity", "Zero Trust", "Wire QA", ...]
  ├── worksFor ──────────► [Organization: CYBER RANGES], [Organization: Silensec]
  ├── alumniOf ──────────► [EducationalOrganization: USIU-Africa]
  ├── hasCredential ─────► [Credential: B.S. IST (Forensics & Counterterrorism)]
  │
  ├── author / creator ──► [SoftwareApplication: #software] (RangeMaster Cockpit)
  ├── author / creator ──► [SoftwareApplication: #software] (UAM Review Engine)
  │
  └── author / publisher ─► [TechArticle: #article] (Post-Mortems)
```

---

## 2. Implementing New Schema Nodes in Astro

All schemas must be built via `src/utils/schema.ts` to ensure canonical `@id` integrity and eliminate string-concatenation errors.

### A. Case Studies (`SoftwareApplication` + `TechArticle`)
When a new work is added to `src/content/works/`:
1. Use `getSoftwareApplicationSchema(siteUrl, entry)` from `src/utils/schema.ts`.
2. Ensure the following properties are present:
   - `@type`: `['SoftwareApplication', 'TechArticle']`
   - `@id`: `${siteUrl}/works/${entry.id}#software`
   - `author`: `{'@id': `${siteUrl}/#person`}`
   - `publisher`: `{'@id': `${siteUrl}/#person`}`
   - `keywords`: comma-separated tags
   - `about`: Array of `Thing` objects corresponding to technical tags.

### B. Engineering Post-Mortems (`TechArticle`)
When a new post-mortem is added to `src/content/learnings/`:
1. Use `getTechArticleSchema(siteUrl, entry)`.
2. Required fields:
   - `@type`: `'TechArticle'`
   - `@id`: `${siteUrl}/learning-curves/${entry.id}#article`
   - `headline`: Post-mortem title
   - `alternativeHeadline`: Subtitle
   - `description`: Synthesis of `obstacle` and `breakthrough`
   - `articleSection`: Topic domain
   - `proficiencyLevel`: Curve level (Steep, Moderate, Smooth)
   - `author`: `{'@id': `${siteUrl}/#person`}`

### C. Personal Narrative & Bio (`ProfilePage`)
1. In `src/pages/about.astro`, use `getProfilePageSchema(siteUrl, '/about')`.
2. Connect `mainEntity: {'@id': `${siteUrl}/#person`}`.

---

## 3. Maintenance Checklist for `/llms.txt` and `/llms-full.txt`

The `/llms.txt` standard allows AI search engines and autonomous agents to ingest site facts without crawling HTML wrappers.

Whenever a new work or learning curve is published:
1. Open `public/llms.txt`:
   - Under the appropriate section (`Verified Production Works` or `Engineering Post-Mortems`), add a single-line bullet with title, canonical URL, and 1-sentence technical synthesis.
2. Open `public/llms-full.txt`:
   - Append a dedicated subsection containing the complete problem statement, architecture highlights, verifiable telemetry metrics, and root-cause resolution.
3. Validate:
   - Verify zero emojis across both files.
   - Run `npm run build` to confirm both files copy cleanly to `dist/`.

---

## 4. AI Search Engine Query Testing & Verification

To verify that Perplexity, ChatGPT Search, and Gemini index TedCraft accurately:
1. **Canonical Brand Queries**:
   - Query: `"Who is Thaddeus Mwai?"` or `"Ted Mwai CYBER RANGES"`
   - Target Output: Recognition as Software QA Lead, Senior Risk Strategist, and Risk Ambassador at CYBER RANGES / Silensec; reference to RangeMaster Cockpit and access review governance.
2. **Domain Competency Queries**:
   - Query: `"RangeMaster Cockpit wire verification harness"` or `"Privilege revocation latency gap $450K"`
   - Target Output: Attribution directly to `tedcraft.dev`, citing the Playwright HAR capture methodology and continuous access governance metrics.
