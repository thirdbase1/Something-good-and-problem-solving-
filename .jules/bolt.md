## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-05-20 - SearchTool Caching
**Learning:** Agentic loops often repeatedly query the same context (like deep research data) during planning and execution phases. Making redundant simulated or external API calls for identical queries creates unnecessary bottlenecks.
**Action:** Implemented a simple in-memory `Map` cache in `SearchTool` to instantly return repeated query results, avoiding redundant expensive operations.
