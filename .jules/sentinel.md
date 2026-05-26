## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-26 - Unbounded Agent Execution DoS
**Vulnerability:** Shell and network operations executed by the autonomous agent (`ShellTool` and `AgentConnector`) had no timeouts or buffer limits.
**Learning:** Agentic operations are highly susceptible to Denial of Service (DoS) and resource exhaustion if underlying OS commands or network requests hang indefinitely or return massive payloads.
**Prevention:** Always enforce strict boundaries (e.g., max execution time of 30s, max output buffers) on all external operations performed on behalf of an agent to prevent host system exhaustion.
