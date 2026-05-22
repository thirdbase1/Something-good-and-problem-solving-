## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-05-22 - Cache Identical Search Queries in Agentic Loops
**Learning:** Agentic loops often repeat the same expensive queries during planning phases, causing significant bottlenecks.
**Action:** Implemented in-memory caching (e.g., using a Map) for tools that repeatedly query the same context (like `SearchTool.deep`) to instantly return identical results, preventing redundant API calls and improving execution speed.
