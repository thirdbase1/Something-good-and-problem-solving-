## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-23 - Resource Exhaustion/DoS Vulnerability in Agent Tools
**Vulnerability:** Shell execution tools and external API connectors lacked explicit resource constraints (timeouts, max buffer limits). This could allow malicious or runaway processes to consume excessive CPU, memory, or network connections, leading to a Denial of Service (DoS) of the agent's environment.
**Learning:** In autonomous environments, it's critical to assume external processes or network calls can hang indefinitely or produce enormous output. Failing to bound these operations creates a severe reliability and security risk.
**Prevention:** Enforce strict resource boundaries on all unbounded operations. Specifically, add `timeout` and `maxBuffer` limits to shell execution commands, and enforce explicit `timeout` limits on HTTP/HTTPS network requests.
