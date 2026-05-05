## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2024-05-06 - Enforce Strict Resource Boundaries
**Vulnerability:** Core shell command execution (`execAsync`) and external API calls (`axios`) lacked timeout limits and buffer constraints.
**Learning:** Without these boundaries, a long-running shell process or a hanging network request can exhaust system resources, leading to Denial of Service (DoS), especially in agentic/AI tools making unpredictable external calls.
**Prevention:** Always define explicit boundaries: set `timeout: 30000` (or appropriate) and `maxBuffer` on all external executions/requests to ensure failures are handled quickly and securely.
