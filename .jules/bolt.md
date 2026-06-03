## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-06-03 - Agentic Loop API Redundancy
**Learning:** Agentic loops repeatedly calling the same context via external search or APIs create significant performance bottlenecks due to redundant network queries and delayed processing.
**Action:** Implement in-memory caching (e.g., using a Map) for repetitive read-only tools like `SearchTool.deep`. Cache hits should be evaluated inside the core execution wrappers to maintain standard formatting, retry logic, and standardized logging without duplicating code.
