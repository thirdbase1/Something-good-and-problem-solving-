# oneshotsx: The All-in-One Autonomous SDK

## 1. Vision & Use Cases
`oneshotsx` is a lightweight, powerful SDK designed to bridge the gap between "Idea" and "Production" in a single shot. It is built for:
- **Vibe Coders:** Who want to build complex apps using only natural language.
- **Pro Developers:** Who need to automate deep research, technical debt refactoring, and multi-cloud deployment.
- **Mobile-Only Builders:** Optimized for low-power devices by offloading execution to an autonomous cloud kernel.

## 2. Core Architecture: The "Atomic Solution" Engine

The SDK is designed as a modular core that can be imported into any project or run via a Next.js dashboard.

### A. Modules
1.  **`IntentEngine` (The Brain):**
    - Translates natural language into a structured "Solution Plan."
    - Compatible with 200+ models (via OpenRouter/Groq/xAI).
2.  **`DeepSearch` (The Researcher):**
    - Parallel search across X, Reddit, GitHub, and Google.
    - Synthesizes findings into actionable context for the `IntentEngine`.
3.  **`Synthesizer` (The Builder):**
    - Writes code, fixes bugs, and manages dependencies.
    - Self-heals: if a build fails, it reads the error and loops until fixed.
4.  **`Validator` (The Protector):**
    - Runs security scans and formal verification.
    - Prevents "AI Technical Debt" by ensuring code quality.
5.  **`UniversalDeployer` (The Gateway):**
    - One-click deployment to Vercel, AWS, Cloudflare, or any custom VPS via SSH.

### B. "One-Shot" Workflow
```javascript
import { osx } from 'oneshotsx';

// Example: Single shot to build and deploy a whole feature
await osx.solve({
  intent: "Create a real-time analytics dashboard with Clerk auth",
  platform: "nextjs",
  deploy: "vercel"
});
```

## 3. Platform Compatibility
- **Node.js / Bun / Deno:** Core SDK.
- **Next.js:** Integrated dashboard and API routes.
- **Mobile (Browser/PWA):** Access to the `oneshotsx` cloud dashboard.
- **CLI:** Command-line interface for terminal users.

## 4. Why "oneshotsx"?
- **Lightweight:** Only the intent is processed locally; the heavy lifting happens in the autonomous cloud worker.
- **Fast:** Parallel orchestration of sub-agents.
- **Universal:** No configuration needed. Just your intent.
