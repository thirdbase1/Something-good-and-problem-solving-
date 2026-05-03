## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-03 - Denial of Service (DoS) Vulnerability in Unbounded Operations
**Vulnerability:** External shell command executions (`execAsync`) and network requests (`axios`) were performed without timeouts or output size limits, making the agent susceptible to DoS attacks via hanging processes, massive outputs, or unresponsive APIs.
**Learning:** Agentic operations must operate within strictly enforced resource boundaries. Allowing unbounded time or memory for any sub-operation can result in process starvation, bringing down the entire self-healing engine.
**Prevention:** Always specify `timeout` and `maxBuffer` limits for shell executions, and `timeout` limits for network clients. Enforce a defense-in-depth approach where no single operation can block the core engine indefinitely.
