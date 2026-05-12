## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-12 - Resource Exhaustion (DoS) in Agent Operations
**Vulnerability:** External inputs or agent-generated actions (shell commands or API calls) could run indefinitely or output massive amounts of data, leading to resource exhaustion or denial of service because there were no strict timeouts or buffer limits configured in tools or connectors.
**Learning:** Autonomous agents inherently execute unpredictable logic. Without hard execution limits (defense-in-depth), a simple mistake in a command or an API delay could bring down the entire system processing those agentic steps.
**Prevention:** Always enforce strict boundaries. Add timeouts (e.g., `timeout: 30000`) and max memory/buffer constraints (e.g., `maxBuffer: 1024 * 1024`) to any function that interfaces with the system (like `child_process.exec`) or the network (`axios`).
