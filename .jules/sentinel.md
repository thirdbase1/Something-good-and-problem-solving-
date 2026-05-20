## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-20 - Denial of Service (DoS) via Unbounded Execution
**Vulnerability:** Agent operations lacked strict boundaries. Shell executions via `ShellTool` did not enforce timeouts or memory limits, and `AgentConnector` network requests lacked connection timeouts. This exposed the system to DoS and resource exhaustion attacks via hanging processes, massive output buffers, or stalled API endpoints.
**Learning:** Autonomous systems interacting with external environments (shell, network) are susceptible to resource exhaustion if execution contexts are unbounded.
**Prevention:** Always enforce strict boundaries (e.g., 30s timeouts, 1MB output buffer limits) on shell command executions and external API client instances.
