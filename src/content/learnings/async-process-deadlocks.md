---
title: "The Silent Deadlock: Diagnosing Node.js Child Process Buffer Starvation"
subtitle: "Why our background runner froze without logging an error, and the IPC pipeline shift that cured it"
date: 2026-10-28
topic: "Concurrency & OS Pipes"
curveLevel: "Steep"
obstacle: "Long-running automation scripts hung indefinitely when output exceeded 64KB, without emitting errors or rejection signals."
breakthrough: "Child processes stream stdout/stderr into internal OS OS pipe buffers (typically 64KB on Linux/macOS). Without explicit async drains, overflowing buffers block the child execution loop."
takeaways:
  - "Never rely on child_process.exec for processes with variable or high volume output."
  - "Always pipe or continuously drain stdout/stderr streams asynchronously when spawning subprocesses."
  - "Set explicit timeouts paired with SIGKILL escalation rather than assuming graceful termination."
tags: ["Node.js", "Operating Systems", "Debugging", "Streams"]
---

## The Situation

While orchestrating headless end-to-end test suites across hundreds of parallel Docker containers, our runners started hanging silently at 99% test completion. The CPU utilization dropped to 0%, the processes stayed alive in the process table (`ps aux`), but no new logs were ever printed.

## The Mental Model Trap

I initially assumed the problem was a deadlock in our worker thread message passing or an unhandled Promise rejection in the test harness:

```ts
// What we had: Naive execution call
const { exec } = require('child_process');

function runSuite(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve({ stdout, stderr });
    });
  });
}
```

Even after bumping `maxBuffer`, jobs with verbosely generated log traces would randomly lock up.

## The Breakthrough

The root cause wasn't the Node.js memory buffer—it was the **OS-level pipe buffer**:

1. Under the hood, POSIX operating systems allocate a fixed buffer (typically 65,536 bytes) for standard Unix pipes.
2. If the spawned child process writes to `stdout` faster than the parent drains it, the pipe buffer fills up.
3. The child process's write syscall blocks waiting for buffer space.
4. Meanwhile, the parent process was waiting for the child process to exit before resolving the data!
5. Classic circular dependency deadlock: Child waits for pipe drain, parent waits for child exit.

### The Fix

Switching to `spawn` with continuous async stream consumption:

```ts
import { spawn } from 'node:child_process';

export function runProcessSafely(command: string, args: string[]) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];

    // Continuous consumption prevents OS pipe buffer exhaustion
    child.stdout.on('data', (chunk) => stdoutChunks.push(chunk));
    child.stderr.on('data', (chunk) => stderrChunks.push(chunk));

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve(Buffer.concat(stdoutChunks).toString('utf-8'));
      } else {
        reject(new Error(`Exited with status ${code}`));
      }
    });
  });
}
```

## Takeaway & Retrospective

When an asynchronous system hangs without high CPU or errors, investigate the transport layer boundaries. Buffer saturation across process boundaries is one of the quietest bugs in systems programming.
