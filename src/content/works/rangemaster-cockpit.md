---
title: "RangeMaster Cockpit (CYBER RANGES Operator Panel)"
tagline: "High-assurance QA verification, wire contract enforcement, and CloudTemplate provisioning harness"
description: "A production QA platform built with Python, Playwright, and asynchronous network tooling driving automated regression testing across 50+ enterprise and staging environments for CYBER RANGES."
date: 2025-11-10
featured: true
featuredOrder: 1
category: "Security & Test Infrastructure"
tags: ["Python", "Playwright", "OpenStack", "OpenVPN", "HAR Wire Capture", "RBAC", "Docker"]
github: "https://github.com/teddymwai/RangeMaster-Cockpit"
demo: "/demo/rangemaster-cockpit/"
stats:
  - label: "Client Tenants"
    value: "50+ Envs"
  - label: "Prod Regressions"
    value: "0 Critical / 5 Releases"
  - label: "API Anomalies"
    value: "-40% (6-Mo Window)"
---

## Problem

At **CYBER RANGES**, the platform supports 200+ client organizations conducting high-stakes cyber drills, red/blue team exercises, and workforce competence evaluations. Manual QA could not keep pace with multi-tenant variations, CloudTemplate network plumbing, and continuous feature delivery, while DOM-only UI assertions missed silent backend contract drifts.

## Constraints

- **Multi-Tenant Isolation**: Verification runs had to execute safely against 50+ staging and client-mirrored environments without leaking state or mutating production data.
- **Infrastructure Coupling**: Portal workflows trigger real OpenStack Heat stack provisioning and OpenVPN tunnel orchestration, so UI-only checks masked backend lock contention and teardown failures.
- **Confidentiality**: Publicly demonstrating the harness required abstracting internal service names, tenant identifiers, and network keys into synthetic equivalents.

## My Contribution

As **Software QA Lead** at CYBER RANGES, I architected the verification strategy, led the Playwright + HAR wire-contract framework design, authored the mutation-guard and CloudTemplate L3/L4 reachability harnesses, and established the release-gating criteria across QA and engineering teams.

## Architecture

```
  [ Live Browser Interactions / CI Runners ]
                     │
                     ▼
       [ HAR Wire Capture Engine ]
                     │
       ┌─────────────┴─────────────┐
       ▼                           ▼
[ Wire Contract Guard ]   [ Safety Mutation Guard ]
(OpenAPI Spec Check)       (Prevents Production Leaks)
       │                           │
       └─────────────┬─────────────┘
                     ▼
      [ CloudTemplate Stack Provisioner ]
   (OpenStack API + OpenVPN L3/L4 Verification)
```

1. **HAR Wire Validation & Mutation Guards**: Records browser API traffic as HTTP Archive (HAR) captures, validates payloads against OpenAPI wire contracts, and blocks state-mutating HTTP methods (`POST`, `PUT`, `PATCH`, `DELETE`) unless explicit staging flags are active.
2. **CloudTemplate Provisioning Engine (CT-01)**: Provisions multi-node OpenStack stacks, establishes OpenVPN tunnels, verifies Layer 3/Layer 4 reachability into isolated exercise networks, and confirms clean teardown.
3. **Multi-Actor Lifecycle Isolation**: Validates multi-actor team hierarchies, captaincy transfers, PvP/TvT lobby creation, and role-based access control (RBAC) across 3 simultaneous isolated actors.

## Verification

- **Synthetic HAR Contract Validation**: Compares live response payloads against certified Golden Baselines. Example sanitized contract-check output:

```text
[HAR-GUARD] GET /api/v1/sessions/sim-1042 -> 200 OK (schema: SessionDetailV2)
[HAR-GUARD] POST /api/v1/infrastructure/stacks -> BLOCKED by MutationGuard (env=prod-mirror)
[HAR-GUARD] Contract drift detected on /api/v1/catalog: field "difficultyLevel" != enum("easy","medium","hard")
```

- **Teardown & Lock Verification**: Correlates Playwright step timestamps with OpenStack Heat state transitions to ensure zero orphaned stacks or `409 Conflict` lock deadlocks.

## Results

- **Zero Critical Production Regressions**: Zero critical regressions reached production across 5 consecutive major platform releases.
- **40% Reduction in Production API Anomalies**: Comparing the 6-month post-rollout window against the prior 6-month release baseline across managed range environments, wire-contract gating caught payload and schema drifts in staging before release tags were cut.
- **Root-Cause Isolation**: Eliminated intermittent teardown hangs by isolating OpenStack stack lock contention and API argument type mismatches.

## Evidence

- **Interactive Mock Operator Panel**: [Sanitized Public Demonstration Edition](/demo/rangemaster-cockpit/) using synthetic RFC routes (`/api/v1/catalog`, `/api/v1/sessions`, `/api/v1/teams`, `/api/v1/infrastructure/stacks`), scrubbed HAR captures, and simulated Step Matrix playback.
- **Source Repository**: [RangeMaster-Cockpit on GitHub](https://github.com/teddymwai/RangeMaster-Cockpit)
