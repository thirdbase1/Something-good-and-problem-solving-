## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.
## 2024-03-24 - [In-memory Query Caching for SearchTool]
**Learning:** [Repeated agentic queries in the deep search tool created an architectural bottleneck, wasting API calls/time.]
**Action:** [Implemented an in-memory Map cache in `SearchTool.deep` nested inside the `this.core.execute` wrapper. The wrapper ensures that cache hits return valid ExecutionResults and preserves standardized logging and retry logic without redundant search execution.]
