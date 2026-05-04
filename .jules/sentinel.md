## 2026-04-27 - Path Traversal Vulnerability in File System Tools
**Vulnerability:** The `FileTool` operations (`read`, `write`, `patch`) allowed arbitrary file system access because user-provided paths were used directly without sanitization, exposing a path traversal risk.
**Learning:** File path inputs to SDK operations must be properly resolved and validated to prevent unauthorized access outside the intended working directory. Unrestricted access breaks the security boundaries of an agentic execution environment.
**Prevention:** Always use `path.resolve(process.cwd(), unsafePath)` and verify that the resulting absolute path begins with `process.cwd()`. Implement secure failure paths and never expose raw internal file structures on error.
## 2026-05-04 - Strict resource boundaries for autonomous tools
**Vulnerability:** External network requests and shell commands executed by autonomous agents lacked timeout and buffer limits. This exposes the system to Denial of Service (DoS) and memory exhaustion if a process hangs or produces excessive output.
**Learning:** Autonomous systems must proactively protect the host environment against non-terminating tasks or unpredictable output size. Even legitimate LLM commands or standard network APIs can fail or block indefinitely.
**Prevention:** Always define strict timeouts (e.g., `timeout: 30000` for 30s) and buffer limits (`maxBuffer` in `execAsync`) when communicating with external APIs or running shell commands.
