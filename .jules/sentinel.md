## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-13 - [DoS Prevention] Enforcing Timeouts and Limits
**Vulnerability:** Agent operations (shell execution and external network requests) lacked explicit timeouts and buffer limits, exposing the SDK to DoS via resource exhaustion.
**Learning:** Default configuration for node's child_process.exec and axios client does not provide safety boundaries. Without timeouts, agents can hang indefinitely.
**Prevention:** Always specify timeout bounds (e.g. 30s) and reasonable buffer length limits (e.g. 2-5MB) for all shell commands and outbound requests to prevent unbounded memory/CPU consumption.
