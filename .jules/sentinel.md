## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-06-01 - Resource Exhaustion (DoS) Risk in Execution Tools
**Vulnerability:** Shell command execution (`ShellTool.run`) and external API requests (`AgentConnector.chat`) lacked execution limits (timeouts and buffer caps). This allowed a malicious or malfunctioning input to hang execution indefinitely or consume all available memory, leading to Denial of Service (DoS).
**Learning:** Agentic operations that bridge AI to system resources must strictly enforce boundaries to maintain control over the execution environment. Trusting external inputs or processes to complete gracefully in a distributed setup is inherently unsafe.
**Prevention:** Always define explicit timeouts (e.g., 30s) and buffer limits (`maxBuffer`) for shell processes and network requests. Never leave open-ended execution pathways.
