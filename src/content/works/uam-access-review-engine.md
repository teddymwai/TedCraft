---
title: "Automated User Access Management (UAM) Review Engine"
tagline: "Python governance automation tool that compressed quarterly access reviews from 17 days to 13 business hours"
description: "An automated audit reconciliation engine that parses identity directories, cross-references active client engagements, detects orphan accounts, and monitors privilege revocation latency."
date: 2024-04-12
featured: true
category: "Security Governance & Automation"
tags: ["Python", "RBAC", "Access Governance", "SIEM", "Audit Automation", "REST APIs"]
github: "https://github.com/teddymwai/uam-review-engine"
stats:
  - label: "Review Turnaround"
    value: "17 Days → 13 Hrs"
  - label: "Revenue Protected"
    value: "$400K - $450K"
  - label: "Audit Accuracy"
    value: "100% Passed"
---

## The Problem

Quarterly User Access Management (UAM) reviews were historically a grueling manual process: security analysts had to export user rosters from Active Directory, LDAP, cloud consoles, and internal portals, manually cross-referencing each record against HR rosters and client project manifests.

This manual process:
- Consumed **17 business days** per quarter, pulling senior SOC personnel away from threat hunting.
- Introduced significant lag between account deprovisioning requests and actual access removal.

## The Solution

I engineered a modular Python automation tool that directly connects to identity providers, extracts authorization tables, and reconciles user privileges against current engagement contracts and HR status:

1. **Automated Role Reconciliation**: Identifies over-privileged accounts, inactive consultants, and mismatched group memberships within seconds.
2. **Revocation Latency Tracking**: Introduced privilege revocation latency as an executive metric. This revealed delayed revocations carrying an estimated **$400,000 to $450,000** in business exposure, successfully driving revocation turnaround from days down to hours.
3. **Audit-Ready Evidence Bundles**: Automatically outputs timestamped, cryptographically signed PDF and CSV audit registers compliant with ISO 27001 and SOC standards.
