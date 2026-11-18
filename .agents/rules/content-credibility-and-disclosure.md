# Content Credibility, Technical Rigor & Disclosure Guardrails

All content entries (`works`, `learning-curves`, `blog`), schemas, and portfolio templates must satisfy these invariants before publication:

## 1. Publication & Draft Hygiene
- **No Unfinished Templates**: Never publish entries containing authoring prompts or placeholder text (e.g., `"Short summary of the bug"`, `"Describe the background situation"`, `"Paste representative error logs"`, `"Correct, robust remediation code"`).
- **No Placeholder Destinations**: Never use `*.example.com` or stub demo URLs. If a live demo is unavailable, link to a public repository with run instructions, a walkthrough, or omit the demo CTA.
- **Consistent Draft Filtering**: All content collections (`works`, `learning-curves`, `blog`) must support `draft: z.boolean().default(false)` and share a centralized publication filter across homepage, listing pages, RSS feeds, and related-content blocks.
- **Respect Featured Flags**: Homepage featured sections must filter by `featured === true` before sorting or slicing, rather than falling back to date order alone.

## 2. Public Disclosure & Sanitization (`CYBER RANGES` / Silensec)
- Apply the same synthetic/sanitized standard across **all** public case studies, learning curves, and articles:
  - Never expose internal microservice names, real endpoint paths or naming conventions, production vs. staging topology, real client environment details, or unredacted HAR/payload captures.
  - When discussing authentication or RBAC failures, describe the architectural pattern using synthetic routes and simulated environments rather than internal incident signatures.

## 3. Metrics & Technical Claim Precision
- **Financial Exposure vs. Realized Savings**: Distinguish estimated risk exposure from realized savings (e.g., *"identified an estimated $400K–$450K annual exposure and helped reduce revocation turnaround from days to under two hours"*). Never present exposure figures as cash recovered.
- **Regressions**: Qualify production stability claims precisely (e.g., *"zero critical regressions reaching production across five consecutive major releases"*).
- **Percentages & Benchmarks**: Every percentage (`100%`, `40%`) or throughput figure requires a stated denominator, baseline, measurement window, and test environment. Keep units consistent across subtitles and body prose.
- **Post-Mortem Accuracy**: Ground root-cause explanations in exact runtime/API semantics and reproducible behavior (e.g., in Node.js, distinguish `spawn()` unmanaged pipe backpressure from `exec()` `maxBuffer` termination and inherited-descriptor hangs; never state platform-specific pipe sizes like `64 KB` as universal constants).
