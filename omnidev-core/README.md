# OmniDev Core Prototype

This is the initial module for OmniDev 2026.

## Getting Started

1.  Navigate to `omnidev-core`.
2.  Install dependencies: `npm install`.
3.  Start the core: `npm start`.
4.  Send an intent via POST to `/intent`:
    ```bash
    curl -X POST http://localhost:3000/intent \
    -H "Content-Type: application/json" \
    -d '{"intent": "Create a secure express backend for a todo app"}'
    ```

## Project Structure
- `src/index.js`: The API entry point.
- `src/supervisor.js`: The brain that orchestrates agents.
- `src/agent_orchestrator.js`: (Future) Handles spawning sub-agents.
