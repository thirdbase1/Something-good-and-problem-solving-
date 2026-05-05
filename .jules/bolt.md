## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-05-05 - Redundant Native OS Calls (process.cwd)
**Learning:** Calling `process.cwd()` repeatedly in path validation loops (like in `FileTool.resolveAndValidatePath`) incurs measurable performance overhead because it triggers a native OS call each time.
**Action:** When validating paths or performing operations that repeatedly require the current working directory, cache the result of `process.cwd()` in a local variable at the start of the function.
