## 2026-04-26 - Prevent Path Traversal in FileTool
**Vulnerability:** The FileTool was susceptible to path traversal attacks because it used the raw `inputPath` without sanitization or validation, allowing reads/writes to files outside the current working directory via paths like `../../../etc/passwd`.
**Learning:** File system abstractions used by autonomous tools must restrict their operational scope to their dedicated workspace explicitly, rather than relying on relative paths naturally remaining within it.
**Prevention:** Implement a standard `sanitizePath` utility that resolves user paths against `process.cwd()` and verifies that the resulting absolute path begins with `process.cwd() + path.sep`, throwing a security error on violation.
