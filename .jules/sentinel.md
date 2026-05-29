## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2024-05-30 - Resource Exhaustion & Denial of Service Risks
**Vulnerability:** Shell command execution and external network requests lacked explicit timeout boundaries and buffer limits, allowing potentially hanging commands or massive outputs to cause Denial of Service (DoS) through resource exhaustion.
**Learning:** Agentic platforms must actively enforce boundary limits on autonomous tool execution, as models may inadvertently generate unbounded recursive shell scripts, extremely large API calls, or long-running tasks.
**Prevention:** Always enforce strict boundaries by passing specific configuration options (e.g., `timeout: 30000` and `maxBuffer: 2 * 1024 * 1024` for node processes, and explicit timeouts for HTTP clients like Axios) on all programmatic actions outside the direct control of the main engine.
