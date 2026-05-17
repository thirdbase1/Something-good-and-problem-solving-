## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-17 - Denial of Service (DoS) via Unbounded Execution and Network Requests
**Vulnerability:** The SDK's `ShellTool` and `AgentConnector` did not enforce execution time limits or buffer size boundaries, allowing malicious or poorly configured agents to run commands that hang indefinitely or exhaust memory.
**Learning:** Agentic systems must enforce strict execution boundaries to prevent Denial of Service (DoS) and resource exhaustion. This applies to both local shell execution and external network requests.
**Prevention:** Always set explicit bounds, such as a timeout (e.g., 30s) and a `maxBuffer` limit for shell execution, as well as a timeout for external network requests using HTTP clients.
