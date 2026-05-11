## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-04-28 - Unbounded Operations Leading to Denial of Service (DoS)
**Vulnerability:** Shell command execution (`ShellTool.run`) and external API calls (`AgentConnector.chat`) lacked execution boundaries (timeouts and buffer limits), allowing them to potentially run indefinitely or consume excessive memory, leading to resource exhaustion (DoS).
**Learning:** Agentic operations inherently interface with untrusted or unpredictable environments (e.g., shell outputs, third-party APIs). Without strict limits, a single hanging process or infinite stream can halt the entire self-healing engine.
**Prevention:** Always enforce strict execution boundaries: implement timeouts (e.g., 30s) for all network requests and apply `maxBuffer` limits to child processes executing shell commands.
