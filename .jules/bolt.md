## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-05-30 - In-Memory Caching for Agentic SearchTool
**Learning:** Agentic loops frequently query the exact same context (e.g. via `SearchTool.deep`). Repeating identical queries without caching introduces a significant performance bottleneck due to redundant network calls or computations.
**Action:** Implement in-memory caching (e.g., using a `Map`) for tools that can safely return identical results for duplicate inputs. Place the cache hit check within standard execution wrappers (like `this.core.execute()`) to retain existing retry, formatting, and logging infrastructure.
