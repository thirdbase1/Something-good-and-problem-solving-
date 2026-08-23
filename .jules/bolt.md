## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.
## 2026-06-04 - In-memory caching for deep search tool
**Learning:** In agentic loops, repeatedly querying the same external context (like search results) causes an architectural bottleneck due to redundant network requests.
**Action:** Implemented an in-memory cache (using `Map`) in `SearchTool.deep` to instantly return identical query results, preventing redundant API calls while still wrapping logic within `this.core.execute()` to preserve standard formatting, logging, and retry behaviors.
