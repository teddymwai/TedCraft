---
title: "Cybersecurity Practitioner & Agentic AI Curriculum (43 Standalone Repositories)"
tagline: "The Learned Fellow curriculum: Systems programming, wire-protocol analysis, and autonomous Hackbot / Defense Agent integration across 43 public GitLab projects"
description: "A comprehensive 4-tier cybersecurity and systems engineering curriculum spanning 43 standalone public repositories on GitLab. Covers low-level packet craft, binary exploitation, eBPF telemetry, and defensive hardening across C++20, Rust, Go, Zig, and Python, with standardized Model Context Protocol (MCP) tool integration for autonomous offensive and defensive AI agents."
date: 2026-11-06
featured: true
category: "Cybersecurity & Systems"
tags: ["GitLab CI/CD", "C++20", "Rust", "Go", "Python", "eBPF", "Zig", "Haskell", "MCP", "AI Agents", "CYBER RANGES"]
gitlab: "https://gitlab.com/teddymwai"
stats:
  - label: "Standalone Repos"
    value: "43 Public Projects"
  - label: "Curriculum Tiers"
    value: "4 Progressive Tiers"
  - label: "Systems Stacks"
    value: "C++20, Rust, Go, Zig"
  - label: "Agent Integration"
    value: "100% MCP Conforming"
---

## Executive Vision: The Hybrid Paradigm

Traditional academic curricula divide cybersecurity concepts into disconnected silos:

- **Networking & Systems Tooling** is isolated to legacy C codebases and theoretical socket tutorials.
- **Machine Learning & Data Science** is restricted to synthetic Python notebooks and generic tabular datasets.
- **Autonomous Agents & LLMs** are treated as ungrounded chatbots without operational security bounds.

This 43-repository curriculum shatters those silos by establishing the **Hybrid Systems + Security + Agentic AI Architecture**. Developed for the **CYBER RANGES** curriculum and hosted as 43 independent public GitLab repositories under the `teddymwai` namespace, each course teaches students how to:

1. **Develop from First Principles:** Build systems-level network tools, security analyzers, and cryptographic utilities from scratch in modern compiled and typed languages (C++20, Rust, Go, Zig, Python, V, Haskell).
2. **Operate Safely in the Threat Landscape:** Dissect real-world adversary attack surfaces, defense-in-depth boundaries, and safe lab testing methodologies.
3. **Integrate with Autonomous AI-Agents:** Configure an offensive **Hackbot** (for Red Team tools) or a defensive **Defense AI-Agent** (for Blue Team tools) using structured Model Context Protocol (MCP) tool schemas and deterministic JSON outputs.

---

## Educational Philosophy: The "Learned Fellow"

The curriculum explicitly rejects the passive "tool operator" paradigm—simply running pre-packaged scripts or memorizing CLI flags without understanding underlying mechanics. Instead, the practitioner is treated as a **learned fellow**—a software and security engineer conversant with:

- **Kernel & Memory Layouts:** Virtual memory addressing, stack frame layouts, buffer allocations, and user-to-kernel context switches.
- **Wire Protocols & Packet Mechanics:** Byte-level offsets, TCP flag sequences, TLS `ClientHello` extensions, and RFC state machines.
- **Concurrency & Non-Blocking I/O:** POSIX signals, mutex lock contention, epoll/kqueue event loops, and AF_XDP zero-copy packet rings.
- **Cryptographic Primitives:** Key schedules, block cipher modes (GCM, CBC), message authentication codes (HMAC), and entropy metrics.

---

## Master 4-Tier Curriculum Matrix

The curriculum organizes 43 standalone repositories across four progressive difficulty tiers:

### Tier 1: Foundations (3 Projects)
Pre-beginner fundamentals for systems programming, cryptographic hash identification, and protocol inspection.

- **`hash-identifier` (Python):** Cryptographic hash pattern decomposition and entropy analysis.
- **`http-headers-scanner` (Python):** Defensive audit of modern HTTP security headers (`Content-Security-Policy`, `Strict-Transport-Security`).
- **`password-manager` (Python):** Encrypted local credential storage utilizing Argon2id key derivation and AES-GCM.

### Tier 2: Beginner (17 Projects)
Core networking, reconnaissance, systems auditing, and baseline offense/defense engineering.

- **`simple-port-scanner` (C++20 / Asio):** Asynchronous, non-blocking TCP Connect and SYN scanner utilizing C++20 coroutines.
- **`linux-ebpf-security-tracer` (C / eBPF / Python):** Real-time kernel telemetry hooking `sys_enter_execve` to detect unauthorized process execution.
- **`c2-beacon` (Python / Go / React):** Command-and-control beacon simulation featuring jittered interval sleeps and HTTP egress tunnels.
- **`firewall-rule-engine` (V):** Custom Layer 4 packet filtering engine written in the V systems language.
- **`canary-token-generator` (Go / React):** DNS and HTTP decoy tokens triggering real-time alerting on unauthorized access.
- **`linux-cis-hardening-auditor` (Bash / ShellCheck):** Automated compliance verification against Center for Internet Security (CIS) Linux benchmarks.
- **`systemd-persistence-scanner` (Go):** Inspecting Linux daemon units and timer hooks to uncover adversary persistence.
- **`prompt-injection-firewall` (Python / FastAPI):** Reverse-proxy inspecting input prompts for jailbreak patterns and token anomalies.
- **Additional Beginner Projects:** `network-traffic-analyzer`, `hash-cracker`, `keylogger`, `simple-vulnerability-scanner`, `steganography-multi-tool`, `base64-tool`, `caesar-cipher`, `deserialization-gadget-lab`, `dns-lookup`.

### Tier 3: Intermediate (12 Projects)
Application security, identity orchestration, binary analysis, and security engineering.

- **`ja3-ja4-tls-fingerprinting` (Rust):** Wire-level passive TLS client fingerprinting directly parsing cipher suites, elliptic curves, and extension orders.
- **`secrets-scanner` (Go):** High-throughput Shannon entropy scanner detecting leaked API tokens, private keys, and passwords across code repositories.
- **`sbom-generator-vulnerability-matcher` (Go):** Ingesting Software Bill of Materials (SBOM) and cross-referencing vulnerability CVE databases.
- **`docker-security-audit` (Go):** Automated daemon inspection evaluating container privileges, capabilities, and namespace isolation.
- **`siem-dashboard` (Python / TypeScript):** High-velocity security event correlation dashboard.
- **`dlp-scanner` (Python):** Pattern-matching engine detecting sensitive exfiltration vectors across outgoing data streams.
- **Additional Intermediate Projects:** `api-security-scanner`, `binary-analysis-tool`, `chaos-engineering-tool`, `credential-enumeration`, `credential-rotation-enforcer`, `security-news-scraper`.

### Tier 4: Advanced (11 Projects)
Deep systems exploitation, hardware security, machine learning threat hunting, and honeynets.

- **`ai-threat-detection` (Python / PyTorch / React):** Machine learning classifier trained on anomalous network telemetry and process graphs.
- **`hsm-emulator` (Zig):** Hardware Security Module (HSM) software emulator implementing the PKCS#11 cryptographic token interface.
- **`zig-stateless-scanner` (Zig / AF_XDP):** High-speed stateless network scanner bypassing kernel network stacks via Linux XDP sockets.
- **`zero-day-vulnerability-scanner` (Rust / Clang / AFL++):** Coverage-guided fuzzing harness orchestrating American Fuzzy Lop (AFL++) against compiled binaries.
- **`haskell-reverse-proxy` (Haskell / WAI / Warp):** Formally typed, memory-safe reverse proxy enforcing strict request sanitation.
- **`honeypot-network` (Go / React / Docker):** Low-interaction distributed honeynet mimicking vulnerable database and SSH services.
- **`rveng` (Reverse Engineering Engine) (Python / Capstone / React):** Disassembly and control-flow-graph (CFG) analysis suite.
- **Additional Advanced Projects:** `api-rate-limiter`, `bug-bounty-platform`, `encrypted-p2p-chat`, `monitor-the-situation-dashboard`.

---

## Standardized Autonomous AI-Agent Integration

Every repository in the curriculum incorporates a dedicated autonomous AI-Agent configuration adhering to the **Model Context Protocol (MCP)**:

```
[ Security Tool CLI / Daemon ] ──► [ Structured JSON Telemetry ]
                                             │
                                             ▼
 [ Agentic Workflow ] ◄── [ MCP Tool Schema / System Prompt ]
   • Red Team: Hackbot Recon & Exploitation
   • Blue Team: Defense Agent Triage & Alert Correlation
```

- **Red Team Tools (Hackbot Configuration):** Each offensive tool includes an MCP tool definition enabling an autonomous Hackbot agent to plan reconnaissance phases, invoke scans, parse open port schemas, and orchestrate follow-up probing safely.
- **Blue Team Tools (Defense Agent Configuration):** Each defensive tool includes an MCP tool definition allowing an AI Defense Agent to ingest streaming logs, calculate anomaly scores, recommend firewall rules, and generate executive incident summaries.

---

## Live GitLab Deployment Directory

All 43 projects are deployed as individual public repositories under the `teddymwai` namespace on GitLab. Each project contains its own git history, automated GitLab CI pipeline, theory documentation, and standalone test harness:

| # | Standalone Repository | Primary Language | Curriculum Tier | GitLab Link |
|---|---|---|---|---|
| 01 | `ai-threat-detection` | Python / PyTorch | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/ai-threat-detection) |
| 02 | `api-rate-limiter` | Python / FastAPI | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/api-rate-limiter) |
| 03 | `api-security-scanner` | Python / React | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/api-security-scanner) |
| 04 | `base64-tool` | Python | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/base64-tool) |
| 05 | `binary-analysis-tool` | Rust / React | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/binary-analysis-tool) |
| 06 | `bug-bounty-platform` | Python / Postgres | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/bug-bounty-platform) |
| 07 | `c2-beacon` | Python / Go / React | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/c2-beacon) |
| 08 | `caesar-cipher` | Python | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/caesar-cipher) |
| 09 | `canary-token-generator` | Go / React | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/canary-token-generator) |
| 10 | `chaos-engineering-tool` | Go | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/chaos-engineering-tool) |
| 11 | `credential-enumeration` | Nim | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/credential-enumeration) |
| 12 | `credential-rotation-enforcer` | Crystal | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/credential-rotation-enforcer) |
| 13 | `deserialization-gadget-lab` | Ruby | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/deserialization-gadget-lab) |
| 14 | `dlp-scanner` | Python | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/dlp-scanner) |
| 15 | `dns-lookup` | Python | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/dns-lookup) |
| 16 | `docker-security-audit` | Go | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/docker-security-audit) |
| 17 | `encrypted-p2p-chat` | Python / Cryptography | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/encrypted-p2p-chat) |
| 18 | `firewall-rule-engine` | V | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/firewall-rule-engine) |
| 19 | `hash-cracker` | C++20 | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/hash-cracker) |
| 20 | `hash-identifier` | Python | Tier 1: Foundations | [GitLab Project](https://gitlab.com/teddymwai/hash-identifier) |
| 21 | `haskell-reverse-proxy` | Haskell / WAI | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/haskell-reverse-proxy) |
| 22 | `honeypot-network` | Go / Docker | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/honeypot-network) |
| 23 | `hsm-emulator` | Zig / PKCS#11 | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/hsm-emulator) |
| 24 | `http-headers-scanner` | Python | Tier 1: Foundations | [GitLab Project](https://gitlab.com/teddymwai/http-headers-scanner) |
| 25 | `ja3-ja4-tls-fingerprinting` | Rust | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/ja3-ja4-tls-fingerprinting) |
| 26 | `keylogger` | Python / C | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/keylogger) |
| 27 | `linux-cis-hardening-auditor` | Bash / ShellCheck | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/linux-cis-hardening-auditor) |
| 28 | `linux-ebpf-security-tracer` | C / eBPF / Python | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/linux-ebpf-security-tracer) |
| 29 | `monitor-the-situation-dashboard` | Go / WebGL | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/monitor-the-situation-dashboard) |
| 30 | `network-traffic-analyzer` | C++20 / Python | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/network-traffic-analyzer) |
| 31 | `password-manager` | Python | Tier 1: Foundations | [GitLab Project](https://gitlab.com/teddymwai/password-manager) |
| 32 | `prompt-injection-firewall` | Python / FastAPI | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/prompt-injection-firewall) |
| 33 | `rveng` | Python / Capstone | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/rveng) |
| 34 | `sbom-generator-vulnerability-matcher` | Go | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/sbom-generator-vulnerability-matcher) |
| 35 | `secrets-scanner` | Go | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/secrets-scanner) |
| 36 | `security-news-scraper` | Go | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/security-news-scraper) |
| 37 | `siem-dashboard` | Python / TypeScript | Tier 3: Intermediate | [GitLab Project](https://gitlab.com/teddymwai/siem-dashboard) |
| 38 | `simple-port-scanner` | C++20 / Asio | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/simple-port-scanner) |
| 39 | `simple-vulnerability-scanner` | Go | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/simple-vulnerability-scanner) |
| 40 | `steganography-multi-tool` | Go | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/steganography-multi-tool) |
| 41 | `systemd-persistence-scanner` | Go | Tier 2: Beginner | [GitLab Project](https://gitlab.com/teddymwai/systemd-persistence-scanner) |
| 42 | `zero-day-vulnerability-scanner` | Rust / AFL++ | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/zero-day-vulnerability-scanner) |
| 43 | `zig-stateless-scanner` | Zig / AF_XDP | Tier 4: Advanced | [GitLab Project](https://gitlab.com/teddymwai/zig-stateless-scanner) |

---

## Safety & Educational Governance

All tools in the curriculum carry an enforced operational safety boundary:

> [!WARNING] Educational & Research Testing Boundary
> These tools, packet generators, and AI-agent integration patterns are designed strictly for academic study, authorized penetration testing, and defense-in-depth engineering within isolated virtual environments or private testbeds. Unauthorized execution or traffic transmission against third-party systems without prior written consent is illegal. To practice safely with pre-configured targets, attack simulations, and live-fire exercises, visit **CYBER RANGES** to access purpose-built tools and interactive lab infrastructure.
