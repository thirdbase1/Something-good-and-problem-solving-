## 2025-02-27 - Path Traversal Vulnerability in FileTool

**Vulnerability:** The `FileTool` inside `src/tools/index.ts` was taking file paths directly from user input without sanitizing or resolving them against a root directory. This would allow an attacker to pass a path like `../../../etc/passwd` or `../../../../var/log/syslog` and access unauthorized files outside the expected context (path traversal vulnerability).

**Learning:** When creating tools that interact with the filesystem based on external or untrusted inputs (especially in agentic contexts where LLMs might generate the paths), we must strictly bound their access domain to the intended directory (like the working directory). Simple `fs.readFile` calls are inherently unsafe if path resolution isn't bounded.

**Prevention:** Always implement a secure path resolution function (`path.resolve(baseDir, requestedPath)`) and verify that the resulting absolute path strongly starts with the intended base directory (using `startsWith()`) before any file operation (`readFile`, `writeFile`, etc.) is performed.