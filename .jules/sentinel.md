## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-06-03 - Resource Exhaustion (DoS) in Shell and Network Tools
**Vulnerability:** External operations like shell commands (`execAsync`) and network requests (`axios.post`) did not have enforced timeouts or buffer limits, creating a Denial of Service (DoS) vulnerability. Malicious input or hung processes could consume infinite memory or block execution indefinitely.
**Learning:** Whenever wrapping unconstrained external calls (e.g., shell, network), explicit limits must be set to enforce strict boundaries.
**Prevention:** Always supply `timeout` and `maxBuffer` constraints to `exec`/`execAsync` and `timeout` constraints to network requests (e.g. `axios`, `fetch`) to fail securely on resource exhaustion.
