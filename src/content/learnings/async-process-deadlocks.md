---
title: "The Silent Deadlock: Diagnosing Node.js Child Process Buffer Starvation"
subtitle: "Why our background runner froze without logging an error, and how separating spawn() stream consumption from exec() cured it"
date: 2026-10-28
topic: "Concurrency & OS Pipes"
curveLevel: "Steep"
obstacle: "Long-running automation runners spawned with piped stdio hung indefinitely when high-volume output went unconsumed or descendant processes kept inherited pipe descriptors open."
breakthrough: "Distinguishing spawn() unmanaged pipe backpressure from exec() maxBuffer termination—and consuming stdout/stderr asynchronously on spawn() with detached stdio boundaries—eliminated the silent hang."
takeaways:
  - "Do not confuse exec() maxBuffer termination with spawn() pipe backpressure: exec() buffers up to maxBuffer and terminates the child on overflow, whereas spawn() with unconsumed piped stdio blocks the child once the OS pipe buffer fills."
  - "Always attach data/stream consumers to child.stdout and child.stderr immediately when using spawn() with piped stdio."
  - "Close or isolate inherited file descriptors for descendant processes and pair explicit timeouts with SIGKILL escalation."
tags: ["Node.js", "Operating Systems", "Debugging", "Streams"]
---

## The Situation

While orchestrating headless end-to-end test suites across parallel Docker containers, our runner scripts started hanging silently near test completion. CPU utilization dropped to 0%, processes remained visible in the process table (`ps aux`), and no error or exit code was emitted.

## The Mental Model Trap

Our runner initially used `child_process.exec()` for short commands and `child_process.spawn()` with `stdio: 'pipe'` for verbose suites, without consistently distinguishing how Node.js handles their output streams:

- **`child_process.exec(cmd, { maxBuffer })`**: Node.js actively consumes `stdout` and `stderr` into memory and invokes the callback on exit. If output exceeds `maxBuffer` (default 1 MB), Node.js **terminates the child process** with `ERR_CHILD_PROCESS_STDIO_MAXBUFFER` and truncates output—it does not silently hang waiting for `maxBuffer` to drain.
- **`child_process.spawn(cmd, args, { stdio: 'pipe' })`**: Node.js exposes `Readable` streams (`child.stdout`, `child.stderr`). If the parent does not attach a consumer (`'data'` listener or `.pipe()`), or pauses consumption while awaiting another condition, the OS pipe buffer fills up and the child's `write()` syscall blocks indefinitely.
- **Inherited pipe descriptors**: Even after the direct child exits, if a spawned background helper or container wrapper inherits open `stdout`/`stderr` file descriptors, Node.js waits for all pipe writers to close before emitting `'close'`.

Because some runners awaited an external readiness promise before reading `child.stdout`, and others spawned descendants that inherited stdio, bumping `maxBuffer` on `exec()` calls had no effect on the hangs.

## Minimal Reproducible Experiment

Observed on **Node.js v22.x (Linux x86_64 & macOS arm64)**. Note that POSIX pipe capacity is platform-specific (e.g., default 64 KB on many Linux configurations, or dynamically resized on macOS), not a universal constant:

```ts
// Reproduces pipe backpressure hang with spawn() when stdout is not consumed
import { spawn } from 'node:child_process';

const child = spawn(process.execPath, [
  '-e',
  // Write 512 KB to stdout without parent consumption
  'process.stdout.write("x".repeat(512 * 1024)); console.error("done");',
], {
  stdio: ['ignore', 'pipe', 'pipe'],
});

// Bug: waiting for 'close' without draining child.stdout / child.stderr
child.on('close', (code) => {
  console.log('Exited:', code); // Never reached once OS pipe buffer fills
});
```

By contrast, running the same 512 KB output through `exec()` with `{ maxBuffer: 256 * 1024 }` immediately fails with `RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stdout maxBuffer length exceeded` rather than hanging.

## The Breakthrough & Fix

We standardized all verbose subprocess invocations on `spawn()` with immediate, bounded stream consumption, explicit timeout escalation, and isolated `stdin`:

```ts
import { spawn } from 'node:child_process';

export function runProcessSafely(
  command: string,
  args: string[],
  timeoutMs = 120_000,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    // Attach stream consumers immediately so OS pipe buffers never stall
    child.stdout.on('data', (chunk: Buffer) => stdoutChunks.push(chunk));
    child.stderr.on('data', (chunk: Buffer) => stderrChunks.push(chunk));

    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      setTimeout(() => child.kill('SIGKILL'), 5_000).unref();
      reject(new Error(`Process timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    child.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });

    // Listen to 'exit' or ensure descendants do not hold pipe FDs open
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code === 0) {
        resolve(Buffer.concat(stdoutChunks).toString('utf-8'));
      } else {
        const stderr = Buffer.concat(stderrChunks).toString('utf-8');
        reject(new Error(`Exited with status ${code}: ${stderr.slice(0, 500)}`));
      }
    });
  });
}
```

## Takeaway & Retrospective

When an asynchronous process runner hangs at 0% CPU without errors, inspect the exact `child_process` primitive and its file-descriptor boundary. Never treat `exec()` and `spawn()` as interchangeable: `exec()` enforces a `maxBuffer` ceiling, while `spawn()` requires immediate stream consumption and clean descriptor boundaries across descendant processes.
