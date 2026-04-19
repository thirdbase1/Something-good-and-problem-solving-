# oneshotsx 🚀
> The Agentic Standard Library. A lightweight, autonomous SDK for developers and agents.

`oneshotsx` provides the "One-Shot" primitives required to build autonomous systems, automate complex repo tasks, and bridge the gap between AI brains and real-world actions.

## 📦 Features
- **osx.core**: Self-healing execution engine with automatic retries and deep logging.
- **osx.shell**: Secure, captured terminal execution with error analysis.
- **osx.fs**: Intelligent file system operations (Search, Patch, Write).
- **osx.search**: Multi-platform deep research orchestrator.
- **osx.agent**: Universal connector to expose tools to LLMs (OpenRouter, OpenAI, etc.).

## 🚀 Installation
```bash
npm install oneshotsx
```

## 📖 Usage

### As an Autonomous Toolbelt
```typescript
import { osx } from 'oneshotsx';

async function fixBug() {
  // One-shot shell execution
  const res = await osx.shell.run('npm test');

  if (!res.success) {
    // Perform deep research on the error
    const research = await osx.search.deep(res.error);

    // Patch the file autonomously
    await osx.fs.patch('src/index.ts', 'oldBuggyCode', 'newFixedCode');
  }
}
```

### Powering an AI Agent
```typescript
import { OneShotSX } from 'oneshotsx';

const osx = new OneShotSX({ apiKey: 'YOUR_OPENROUTER_KEY' });

// Get standard tool definitions for your LLM
const tools = osx.agent.getToolDefinitions();

// Let the agent solve a problem in one shot
const result = await osx.solve("Fix the memory leak in the dashboard");
```

## 📱 Mobile & Lightweight
Designed to run anywhere Node.js runs—including Termux on Android, CI/CD runners, and edge workers.

## 📄 License
MIT
