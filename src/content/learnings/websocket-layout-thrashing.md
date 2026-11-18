---
title: "Taming Real-Time Layout Thrashing in Live Telemetry Dashboards"
subtitle: "Recovering sustained 60fps rendering under 2,500 WebSocket messages/sec"
date: 2026-08-04
topic: "Browser Rendering & Performance"
curveLevel: "Moderate"
obstacle: "Our network telemetry viewer dropped from 60fps to under 18fps whenever testing high-throughput network bursts."
breakthrough: "Decoupling network ingest from DOM updates using an in-memory ring buffer with `requestAnimationFrame` render throttling."
takeaways:
  - "The network clock and the display refresh clock must never be coupled directly."
  - "Batch mutation writes and isolate DOM reads to avoid forced synchronous layout recalculations."
  - "Use TypedArrays and circular ring buffers for high-frequency time series data."
tags: ["Performance", "WebSockets", "CSS", "Browser Internals"]
---

## The Bottleneck

Our network benchmarking dashboard receives packet-level telemetry over WebSockets at rates up to 2,500 messages per second. Initially, each socket message immediately updated reactive UI state and triggered DOM writes.

During sustained throughput tests, the browser profiler looked like a mountain range of red bars: **Forced Synchronous Layout** and **Excessive Garbage Collection**.

## The Diagnosis

1. Every incoming message read an element's `.scrollTop` or `.getBoundingClientRect()` to compute whether the user had scrolled away.
2. It then immediately appended a DOM node or updated an inline SVG path.
3. This read-then-write pattern in rapid succession caused the browser to recalculate layout thousands of times per second.

## The Solution

We instituted a strict separation of concerns:

```
[ WebSocket Influx (2.5k/s) ]
            │
            ▼
 [ In-Memory Ring Buffer (Zero GC) ]
            │
  (Read on screen tick)
            ▼
 [ requestAnimationFrame (60Hz / 120Hz) ]
            │
            ▼
   [ Batched Canvas / DOM Update ]
```

### Result

Measured over a **60-second sustained 2,500 messages/sec** synthetic WebSocket stream in **Chrome 128 (macOS, Apple M2 Pro, 120Hz display)**:

- Average frame render time dropped from **48ms** (~20fps) to **2.1ms** (sustained 60fps+ within the 8.3ms/16.6ms budget).
- Zero dropped frames during sustained 60-second bursts on 120Hz ProMotion displays.
- Heap allocation churn minimized by reusing pre-allocated `Float64Array` ring-buffer slices.
