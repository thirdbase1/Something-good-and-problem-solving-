## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-22 - Resource Exhaustion & DoS in Agentic Operations
**Vulnerability:** Shell command execution and external API requests lacked proper boundaries (timeouts and buffer limits), exposing the agentic environment to Denial of Service (DoS) and memory exhaustion if a process hangs or produces infinite output.
**Learning:** Agentic loops are highly susceptible to resource exhaustion because they autonomously spawn system processes and make network requests. Missing limits allow unbounded resource consumption, crashing the host.
**Prevention:** Enforce strict execution boundaries on all agent operations. Always configure timeout limits (e.g., 30s) and buffer restrictions (e.g., 5MB) for shell tasks, and network timeouts for external API calls.
