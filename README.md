# oneshotsx 🚀

> The Agentic Standard Library — a lightweight, autonomous SDK for developers and AI agents.

`oneshotsx` gives you the primitive “one-shot” tools needed to build reliable autonomous systems: secure shell execution, intelligent filesystem operations, deep research, and a clean connector that exposes everything to any LLM.

**Status: Production-ready v0.2.0** (hardened core, path safety, retries, expanded API, full test suite).

## Features

| Module | Description |
|--------|-------------|
| **osx.core** | Self-healing execution engine with configurable retries, structured results, and deep logging |
| **osx.shell** | Secure, timeout-limited terminal execution with cwd / env support |
| **osx.fs** | Path-validated read / write / patch / list / mkdir / remove |
| **osx.search** | Cached deep-research orchestrator (ready for real providers) |
| **osx.agent** | Universal LLM connector (OpenRouter, OpenAI, custom) + standard tool definitions |

## Installation

```bash
npm install oneshotsx
```

Requires Node.js ≥ 18.

## Quick Start

### As an autonomous toolbelt

```ts
import { osx } from 'oneshotsx';

async function fixBug() {
  const res = await osx.shell.run('npm test');

  if (!res.success) {
    const research = await osx.search.deep(res.error ?? 'test failure');
    await osx.fs.patch('src/index.ts', 'oldBuggyCode', 'newFixedCode');
  }
}
```

### Powering an AI agent

```ts
import { OneShotSX } from 'oneshotsx';

const osx = new OneShotSX({
  apiKey: process.env.OPENROUTER_API_KEY,
  provider: 'openrouter',
  model: 'meta-llama/llama-3.1-70b-instruct',
});

// Standard tool definitions for any function-calling LLM
const tools = osx.agent.getToolDefinitions();

// One-shot autonomous solve (research → plan)
const result = await osx.solve('Fix the memory leak in the dashboard');
console.log(result.plan);
console.log(result.logs);
```

## API Overview

```ts
const osx = new OneShotSX({
  apiKey?: string;
  provider?: 'openrouter' | 'openai' | 'custom';
  model?: string;
  retries?: number;   // default 2
  silent?: boolean;   // suppress console logs
});

// Core
osx.core.execute(action, { retries?, label? })
osx.core.log(msg) / getLogs() / clearLogs()

// Shell
osx.shell.run(command, { cwd?, timeout?, maxBuffer?, env? })

// Filesystem (all paths are validated against process.cwd())
osx.fs.read(path)
osx.fs.write(path, content)
osx.fs.patch(path, search, replace)
osx.fs.exists(path)
osx.fs.list(path?)
osx.fs.mkdir(path)
osx.fs.remove(path)

// Search
osx.search.deep(query)
osx.search.clearCache()

// Agent
osx.agent.getToolDefinitions()
osx.agent.chat(message, system?)

// High-level
osx.solve(intent) → { status, intent, research, plan, logs }
```

## Safety Guarantees

- **Path traversal protection** — every filesystem operation is resolved and checked against `process.cwd()`.
- **Resource bounds** — shell commands have hard timeouts (default 30 s) and buffer limits (5 MB).
- **Retry + self-healing window** — transient failures are retried with backoff.
- **No silent failures** — every operation returns a structured `ExecutionResult`.

## Mobile & Edge

Designed to run anywhere Node.js runs — Termux on Android, CI runners, edge workers, and cloud agents.

## Development

```bash
git clone https://github.com/thirdbase1/Something-good-and-problem-solving-.git
cd Something-good-and-problem-solving-
npm install
npm test
npm run build
```

## License

MIT © oneshotsx contributors

---

Part of the broader **OmniDev** vision: a persistent, cloud-native, 24/7 autonomous development environment that turns vibe-coding into production-grade reality.
