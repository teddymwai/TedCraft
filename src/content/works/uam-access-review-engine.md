---
title: "Automated User Access Management (UAM) Review Engine"
tagline: "Python governance automation tool that compressed quarterly access reviews from 17 days to 13 business hours"
description: "An automated audit reconciliation engine that parses identity directories, cross-references active client engagements, detects orphan accounts, and monitors privilege revocation latency."
date: 2024-04-12
featured: true
featuredOrder: 2
category: "Security Governance & Automation"
tags: ["Python", "RBAC", "Access Governance", "SIEM", "Audit Automation", "REST APIs"]
github: "https://github.com/teddymwai/uam-review-engine"
stats:
  - label: "Review Turnaround"
    value: "17 Days → 13 Hrs"
  - label: "Exposure Identified"
    value: "$400K–$450K est."
  - label: "Reconciled Scope"
    value: "150+ Internal / 1,000+ Client"
---

## Problem

Quarterly User Access Management (UAM) reviews were a manual bottleneck: security analysts exported user rosters from Active Directory, LDAP, cloud consoles, and internal portals, then cross-referenced each record against HR rosters and client project manifests by hand. This consumed **17 business days** per quarter and masked lag between offboarding events and actual privilege revocation.

## Constraints

- **Heterogeneous Identity Sources**: Identity data spanned directory services, cloud IAM tables, and engagement manifests with inconsistent identifier formats.
- **Audit Traceability**: Every reconciliation decision needed deterministic, timestamped evidence suitable for ISO 27001 and SOC review.
- **Zero-Trust Perimeter**: Stale contractor and consultant privileges across 50+ environments created unmeasured compliance and operational risk.

## My Contribution

I designed and implemented the Python reconciliation engine, defined privilege revocation latency as an executive governance metric, and built the automated PDF/CSV audit register generator in collaboration with security operations stakeholders.

## Architecture

1. **Identity & Manifest Ingestion**: Normalizes exports from identity providers, authorization tables, and active HR/client engagement manifests.
2. **Automated Role Reconciliation**: Flags over-privileged accounts, inactive consultants, and mismatched group memberships deterministically.
3. **Revocation Latency Tracking**: Measures elapsed hours between HR/engagement offboarding timestamps and identity-provider deprovisioning.
4. **Audit-Ready Evidence Bundles**: Generates timestamped, cryptographically signed PDF and CSV audit registers.

## Verification

- Reconciled **100% of active user records** across **150+ internal accounts and 1,000+ client operator accounts** in 50+ environments against HR offboarding manifests prior to sign-off.
- Validated generated exception lists against manual spot-check baselines across quarterly audit cycles, achieving **0 unauthorized access or privilege escalation incidents over 18 months**.

## Results

- **Turnaround Compression**: Reduced quarterly access review cycles from **17 business days to 13 business hours**.
- **Exposure & Latency Improvement**: Identified an estimated **$400K–$450K annual business exposure** associated with delayed privilege revocation, and helped reduce revocation turnaround from **days to under 2 hours** through automated access governance.

## Evidence

- **Source Repository**: [uam-review-engine on GitHub](https://github.com/teddymwai/uam-review-engine)
- **Related Post-Mortem**: [The $450K Blindspot: Privilege Revocation Latency Gap](/learning-curves/privilege-revocation-latency-gap)
