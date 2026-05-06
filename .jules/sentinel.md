## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-06 - Missing Resource Boundaries in Execution and Network Requests
**Vulnerability:** The SDK's `ShellTool` execution and `AgentConnector` network requests lacked timeouts and buffer boundaries. This exposes the application to resource exhaustion (DoS) risks where a hanging process or external API could freeze the application indefinitely or memory leak via large stdout buffers.
**Learning:** External interactions, whether shell processes or network calls, should never be trusted to return promptly or within expected sizes. Strict timeouts and bounds are required.
**Prevention:** Always enforce a timeout (e.g., 30s) and a `maxBuffer` on `execAsync` for shell commands, and configure client timeouts (e.g., `timeout: 30000`) for outgoing HTTP requests.
