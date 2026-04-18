# OmniDev 2026: Architecture & UI Design

## 1. System Architecture: The "Cloud-Kernel" Model

The architecture is split into three layers:

### A. The Intent Layer (Frontend)
*   **Mobile-First PWA:** A Progressive Web App that works offline for editing/queueing intents.
*   **Adaptive UI:** Switches between "Natural Language Chat" (for ideation), "Structural View" (for reviewing agent plans), and "Code View" (for surgical edits).
*   **WebSocket Bridge:** Real-time streaming of terminal output and agent thoughts.

### B. The Orchestration Layer (Mid-tier)
*   **Agent Team Coordinator:** Manages specialized sub-agents (Architect, Coder, Reviewer, Security Auditor, DevOps).
*   **State Persistence:** A graph database tracking the state of the codebase, tasks, and agent reasoning.
*   **Event Bus:** Triggers 24/7 background tasks based on repo changes or cron schedules.

### C. The Execution Layer (Infrastructure)
*   **Ephemeral Worker Nodes:** Isolated Docker/Firecracker containers where code is built and tested.
*   **Persistent File System:** Encrypted cloud storage that persists across sessions.
*   **Model Agnostic Engine:** Pluggable interface to use the best LLMs of 2026 (Claude, GPT, Gemini, Llama) based on task cost/complexity.

## 2. User Interface Approach: "Intent-Centric Design"

Since the user is often on a phone, we minimize typing:

*   **Voice-to-Intent:** Advanced STT for describing features.
*   **Action Chips:** Suggested next steps from the agent (e.g., "Deploy to staging?", "Fix security warning?").
*   **Visual diffs:** Optimized for small screens (showing changed blocks rather than full files).
*   **Proactive Notifications:** "Agent Alpha has finished the refactor. 100% tests passed. Review now?"

## 3. The 24/7 "Autonomous Heartbeat"

Unlike current IDEs that die when you close the tab:
*   **Background Cron:** Periodically checks for dependency updates.
*   **Linter/Security Scanners:** Runs continuously as a background process.
*   **Self-Healing:** If a test fails due to a change in an external API, the agent detects it and proposes a fix before the dev even opens the app.
