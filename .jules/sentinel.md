## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2024-05-10 - Apply Resource Boundaries for Agent Tools
**Vulnerability:** The `ShellTool` and `AgentConnector` lacked resource limits (`timeout`, `maxBuffer`, `maxContentLength`) for executing arbitrary commands and making external network calls, which exposed the SDK to resource exhaustion and Denial of Service (DoS) attacks.
**Learning:** Agent execution tools that interface with external inputs or environment commands must defensively guard against unbounded operations, especially in an autonomous pipeline where failures might be continually retried or run indefinitely.
**Prevention:** Always set explicit bounds such as `timeout: 30000`, `maxBuffer` on child process execution, and `maxContentLength` on network clients to enforce operational constraints on external calls.
