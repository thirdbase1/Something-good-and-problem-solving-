## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-19 - [Unbounded Agent Operations DoS Risk]
**Vulnerability:** The `AgentConnector` network requests (via Axios) and `ShellTool` command executions (via `execAsync`) lacked timeouts and buffer limits. A hanging API endpoint or an overly verbose/infinite loop shell command could cause the system to freeze or exhaust memory (Denial of Service).
**Learning:** Agentic systems that execute arbitrary code or connect to external LLMs must proactively apply strict boundaries (time and size limits) because they cannot assume stable responses or finite command outputs.
**Prevention:** Always enforce strict configuration boundaries (e.g., `timeout: 30000`, `maxBuffer: 1MB`) when making external network calls or executing terminal commands.
