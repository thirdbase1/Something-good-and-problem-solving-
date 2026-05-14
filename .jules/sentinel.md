## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-14 - Missing Timeout Boundaries in External Calls
**Vulnerability:** External shell command executions (`execAsync`) and network API requests (`axios`) were missing timeout and buffer limits. A hanging shell command or an unresponsive API endpoint could lead to Denial of Service (DoS) and application resource exhaustion.
**Learning:** Agentic operations are susceptible to infinite hangs or massive payload memory exhaustion if strictly defined limits are not placed on asynchronous I/O and external processes.
**Prevention:** Always enforce strict boundaries on external actions. Specifically, define `timeout` and `maxBuffer` for `child_process.exec`, and `timeout` on external network clients like `axios`, to ensure they fail securely and promptly.
