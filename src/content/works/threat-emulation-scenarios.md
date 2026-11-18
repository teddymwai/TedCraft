---
title: "Critical Infrastructure Threat-eX Simulation Scenarios"
tagline: "High-fidelity industrial control (SCADA/ICS) and ransomware attack scenarios for CYBER RANGES"
description: "Architected complex simulation environments including Silverthorn Power Plant (multi-tier SOC simulation against ICS/SCADA infrastructure) and Wizard Spider (ransomware campaign emulation)."
date: 2026-02-15
featured: true
category: "Threat Emulation & CYBER RANGES"
tags: ["SCADA / ICS", "Ransomware", "Threat-eX", "CYBER RANGES", "Red Teaming", "Blue Teaming"]
github: "https://github.com/teddymwai"
stats:
  - label: "Simulation Tiers"
    value: "SOC L1, L2, L3"
  - label: "Infrastructure"
    value: "Power Plant ICS"
---

## Overview

High-fidelity CYBER RANGES simulation environments require realistic multi-tiered target networks that emulate real-world adversary playbooks. 

### Silverthorn Power Plant Threat-eX

Designed and implemented complex scenario blueprints and baseline infrastructure modeling an electric power generation plant:
- **Multi-Level SOC Tiers**: Segregated into Tier 1 (Triage), Tier 2 (Deep Investigation), and Tier 3 (Forensics and Incident Containment).
- **Industrial Control System (ICS) Integration**: Simulates attacks targeting programmable logic controllers (PLCs), human-machine interfaces (HMIs), and substation telemetry.
- **Realistic Adversary TTPs**: Emulates lateral movement, credential dumping, and SCADA command injection based on real-world threat actors.

### Wizard Spider Threat-eX

A complete threat emulation package modeling Wizard Spider (the cybercriminal syndicate behind Ryuk and Conti ransomware):
- Emulates initial access, Cobalt Strike beaconing, Active Directory enumeration, and automated volume shadow copy deletion.
