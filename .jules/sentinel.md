## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-06-04 - Denial of Service (DoS) via Unbounded Execution
**Vulnerability:** Agentic execution components (`ShellTool` and `AgentConnector`) lacked explicit execution boundaries, making the system vulnerable to memory exhaustion via massive shell outputs or hanging external API calls.
**Learning:** In autonomous "agent" systems, failure to bound shell executions and network calls can easily cause infinite loops or resource starvation, crashing the parent process or generating massive costs.
**Prevention:** Always define explicit resource limits (`timeout` and `maxBuffer`) for native OS operations and outbound network requests (e.g., `axios` defaults) in agentic systems to ensure deterministic termination.
