## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-07 - Resource Exhaustion (DoS) in Agent Operations
**Vulnerability:** External network requests (`axios`) and shell command executions (`execAsync`) did not enforce execution boundaries. This allowed for indefinite hanging or excessive memory consumption, leading to resource exhaustion (Denial of Service).
**Learning:** Agentic operations must enforce strict execution boundaries to prevent external dependencies or malicious inputs from exhausting system resources.
**Prevention:** Always define explicit timeouts (e.g., 30s) and buffer limits (`maxBuffer`) for network requests and shell operations to ensure they fail securely and predictably when limits are exceeded.
