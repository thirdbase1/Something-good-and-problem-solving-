## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-06-01 - DoS / Resource Exhaustion in Shell & Network Operations
**Vulnerability:** Shell tool executions (`execAsync`) lacked boundaries, allowing infinite loops and memory overconsumption. Additionally, external agent connector requests using `axios` lacked timeouts, allowing network requests to hang indefinitely. Both vectors could be exploited for Denial of Service (DoS) attacks.
**Learning:** All system boundaries (I/O, network, shell execution) must enforce strict operational constraints to prevent resource starvation in agentic operations.
**Prevention:** Hardcode sane defaults like a 30s timeout and memory buffer limits (`maxBuffer: 1024 * 1024`) on all shell executions, and apply timeouts directly to all Axios client instances.
