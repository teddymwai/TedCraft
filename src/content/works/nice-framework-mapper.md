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

## Overview

Cyber drills and workforce assessments must prove measurable skill progression aligned with industry frameworks. Manually categorizing hundreds of hands-on simulation questions and challenges against the comprehensive NIST NICE framework was slow and prone to subjective inconsistencies.

## Implementation

The **Automated NIST NICE Mapping Engine** correlates scenario taxonomy, questions, and participant actions to standardized NIST NICE Work Roles and Task/Knowledge/Skill statements.

- **Dynamic Tag Ingestion**: Ingests scenario exports and question metadata JSON payloads.
- **Rule-Based KSA Resolution**: Matches observed player milestones to concrete KSAs (e.g., Incident Response, Network Defense, Threat Hunting).
- **Executive Skills Heatmap**: Outputs executive competence matrices that leadership can use to identify skill gaps across their security teams.
