## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-18 - Enforce Strict Execution Boundaries (Timeout & Buffer)
**Vulnerability:** Shell commands (via `ShellTool`) and external network calls (via `AgentConnector`) lacked timeouts and buffer limits, making the agent susceptible to Denial of Service (DoS) and resource exhaustion attacks (e.g., from an LLM hallucinating an infinite loop or attempting to read a massive file).
**Learning:** Autonomous agents inherently execute untrusted or unpredictable instructions. Without strict execution boundaries, a single erratic command or stalled API response can permanently hang the entire process.
**Prevention:** Always enforce strict boundaries on external actions. Applied a 30s timeout and a 10MB buffer limit to all shell command executions, and a 30s timeout to external API requests.
