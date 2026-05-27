## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-04-26 - In-Memory Caching for Agentic Loops
**Learning:** Agentic loops frequently query the same context (like SearchTool.deep) during planning and execution, creating significant performance bottlenecks if these redundant and expensive queries are not cached.
**Action:** Implement in-memory caching (e.g., using a Map) for tools that might be repeatedly invoked with the same arguments within the same agentic session to return results instantly and avoid bottlenecks.
