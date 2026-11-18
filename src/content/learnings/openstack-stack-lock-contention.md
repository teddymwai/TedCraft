---
title: "Hunting Silent Failures Below the UI: OpenStack Stack Lock Contention & Teardown Mismatches"
subtitle: "How digging beneath frontend timeouts revealed OpenStack database lock contention and an API argument type mismatch"
date: 2025-06-14
topic: "Cloud Infrastructure & Wire Debugging"
curveLevel: "Steep"
obstacle: "Automated end-to-end test suites intermittently froze during CloudTemplate stack teardown in staging, throwing generic 60-second browser timeout errors."
breakthrough: "Correlating live browser HAR captures with platform OpenStack Heat logs revealed two hidden root causes: simultaneous teardown calls caused stack lock contention, while a payload argument type mismatch silently aborted cleanup."
takeaways:
  - "Never diagnose infrastructure-backed web application failures purely through frontend screenshots or DOM assertions."
  - "Always inspect the network wire contracts and backend orchestrator locks during asynchronous teardowns."
  - "Enforce strict schema validation on DELETE endpoints; loose typing causes silent database failures in downstream cloud APIs."
tags: ["OpenStack", "Python", "Playwright", "HAR Capture", "Cloud Infrastructure", "Debugging"]
---

## 1. The Symptom & Operational Context

In our CYBER RANGES automated verification harness, tests boot full CloudTemplate stacks (multi-node virtual machines connected via OpenVPN bridges) and tear them down after verifying Layer 3/Layer 4 reachability.

Randomly, around 8% of test runs would fail with:
`TimeoutError: Timed out waiting for element [data-testid="stack-status-deleted"] after 60000ms`

The frontend remained stuck in a "Deleting..." loading state. Rerunning the test sometimes passed, leading earlier teams to write it off as "cloud flakiness."

## 2. False Assumptions (What Failed Initially)

- **Attempt 1: Bumping the timeout from 60s to 180s.** 
  The stack still hung, and tests just took 3x longer to fail.
- **Attempt 2: Adding artificial polling delays.** 
  The issue still manifested under parallel test execution.

## 3. The Turning Point: Digging Beneath the UI

Instead of looking at the web page, I captured the exact network wire traffic using Playwright HAR recording and correlated the timestamps directly with backend OpenStack Heat orchestration logs.

Two distinct root causes emerged:

### Issue A: OpenStack Stack Lock Contention
When automated test runners triggered teardown in rapid succession, two simultaneous `DELETE` requests hit the mediator service. In OpenStack Heat, a stack acquires an exclusive database lock during state transitions. The second call received a database lock contention error (`409 Conflict`), which the API proxy swallowed and masked as an in-progress operation.

### Issue B: The Argument Type Mismatch
Looking at the wire capture of the termination payload:

```json
// What the frontend was sending:
{
  "stack_id": "8f3e21a4-9b22-4411-b851-91a92e19b882",
  "force_delete": "false"  // String instead of Boolean!
}
```

The downstream Python API handler expected a strict boolean `False`, but received the string `"false"`. In Python, any non-empty string evaluates truthy:

```python
# Downstream bug:
if payload.get("force_delete"):
    # Evaluated to True because bool("false") is True!
    trigger_unclean_hypervisor_kill()
```

This triggered an unclean hypervisor detach before OpenStack released volume locks, leaving orphaned cinder volumes and permanently locking the stack!

## 4. The Remediation

1. **State-Guarded Teardown**: Updated the harness to check stack lock state (`/instance/canrun` and `/status`) before issuing delete requests, queuing subsequent calls deterministically.
2. **Strict OpenAPI Schema Casting**: Enforced strict DTO typing in the API mediator so boolean parameters cannot be passed as strings.
3. **HAR-Based Verification**: Integrated automated network assertion checks into RangeMaster Cockpit to verify that wire payloads match the exact OpenAPI contract.

## 5. Permanent Engineering Heuristics

- When an asynchronous cloud action hangs, look at the orchestrator's state lock mechanism, not the UI spinner.
- Treat type coercion bugs at API boundaries as critical security and reliability flaws.
