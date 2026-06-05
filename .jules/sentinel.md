## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-06-05 - Denial of Service (DoS) via Shell Command Exhaustion
**Vulnerability:** The `ShellTool.run()` function used `execAsync` without any timeout or buffer limits. This allowed arbitrary shell commands to run indefinitely or output excessive data, leading to resource exhaustion (DoS).
**Learning:** External process execution in an agentic context is a prime vector for resource exhaustion. By default, `exec` has a limited buffer but no timeout, which can cause the process to hang forever or crash if limits are uncapped.
**Prevention:** Always enforce strict boundaries on shell command executions and external network requests, such as adding an explicit `timeout` (e.g., 30s) and `maxBuffer` to prevent infinite hangs and memory exhaustion.
