## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-06-02 - Resource Exhaustion (DoS) Risk in External Operations
**Vulnerability:** External operations, specifically `ShellTool.run` (shell command execution) and `AgentConnector.chat` (network requests via Axios), lacked strict execution boundaries (timeouts and buffer limits). This allowed for hanging commands, excessive output generation, or stalled network requests to cause resource exhaustion or Denial of Service (DoS).
**Learning:** Agentic operations are susceptible to malicious or errant long-running processes or large outputs that can consume memory or block the event loop, causing the SDK to hang indefinitely.
**Prevention:** Always set strict limits on external invocations. Use `timeout` and `maxBuffer` limits for child processes (`execAsync`), and `timeout` on external API connections (e.g., Axios).
