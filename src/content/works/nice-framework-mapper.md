---
title: "Automated NIST NICE Framework Mapping Engine"
tagline: "Correlating scenario telemetry and assessment artifacts directly to NIST NICE cybersecurity work roles"
description: "An automated analytics tool that maps scenario tags, participant answers, and platform telemetry to the National Initiative for Cybersecurity Education (NICE) Knowledge, Skills, and Abilities (KSA) taxonomy."
date: 2025-09-25
featured: false
category: "Cybersecurity & Analytics"
tags: ["Python", "NIST NICE", "Analytics", "KSA Taxonomy", "Excel Automation"]
github: "https://github.com/teddymwai/nice-framework-mapper"
stats:
  - label: "KSA Coverage"
    value: "100+ Work Roles"
  - label: "Mapping Velocity"
    value: "< 2s / Scenario"
---

## Problem

Cyber drills and workforce assessments must demonstrate measurable skill progression aligned with industry standards. Manually categorizing hundreds of hands-on simulation questions and telemetry artifacts against the NIST NICE Knowledge, Skills, and Abilities (KSA) taxonomy was slow and produced inconsistent mappings across authors.

## Constraints

- **Taxonomy Granularity**: The NIST NICE framework spans 100+ work roles and hundreds of granular Task/Knowledge/Skill statements, where keyword-only matching creates false positives.
- **Deterministic Outputs**: Training leads and enterprise clients required repeatable, auditable Excel/JSON competence matrices without external SaaS dependencies.

## My Contribution

I designed and built the Python mapping engine, authored the weighted taxonomy rule resolver, and created the automated competence heatmap exporter.

## Architecture

1. **Dynamic Tag Ingestion**: Parses scenario metadata, challenge tags, and participant scoring telemetry JSON exports.
2. **Weighted KSA Rule Resolution**: Resolves observed challenge milestones against normalized NIST NICE work-role and TKS dictionaries using domain + action weighting.
3. **Executive Skills Heatmap**: Generates multi-sheet Excel competence matrices highlighting team coverage and skill gaps.

### Sample Input & Mapped Output

Input scenario artifact:

```json
{
  "scenario_id": "soc-triage-04",
  "tags": ["siem", "pcap-analysis", "lateral-movement"],
  "milestones": ["identify-c2-beacon", "isolate-compromised-host"]
}
```

Resolved NICE mapping output:

```json
{
  "scenario_id": "soc-triage-04",
  "work_roles": ["PR-CDA-001 (Cyber Defense Analyst)", "IN-FOR-002 (Cyber Defense Forensics Analyst)"],
  "mapped_ksas": ["K0046 (Network traffic analysis)", "S0057 (Detecting host/network intrusions)"],
  "confidence": "high"
}
```

## Verification

- Cross-checked automated role and KSA assignments against human-curated reference mappings across representative blue-team and forensics scenarios to tune keyword/action weights and eliminate ambiguous overlaps.
- Benchmarked ingestion and Excel export pipeline at **under 2 seconds per scenario** across multi-challenge datasets.

## Results

- Automated alignment across **100+ NIST NICE work roles** with repeatable JSON and Excel heatmap outputs.
- Eliminated manual spreadsheet categorization bottlenecks for scenario authors and assessment leads.

## Evidence

- **Source Repository**: [nice-framework-mapper on GitHub](https://github.com/teddymwai/nice-framework-mapper)
