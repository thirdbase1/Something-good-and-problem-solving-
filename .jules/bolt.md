## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.
## 2026-06-01 - Agentic Loop Caching Bottleneck
**Learning:** Agentic loops frequently execute the same queries (e.g., in SearchTool.deep), resulting in redundant and expensive external network operations.
**Action:** Always implement a Map-based in-memory cache for agentic tools that perform repeated deterministic queries. Ensure the cache read/write logic remains inside the core execution wrapper to maintain execution flow and standardized logging while instantly returning results for identical queries.
