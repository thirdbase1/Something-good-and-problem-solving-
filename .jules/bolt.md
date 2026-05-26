## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-05-26 - In-Memory Caching for Agentic Search Tools
**Learning:** Agentic tools that repeatedly query the same context (e.g., `SearchTool.deep`) can cause bottlenecks in the planning and execution loops due to redundant API calls.
**Action:** Implemented in-memory caching using a `Map` within `SearchTool.deep` to instantly return identical query results, significantly reducing latency during agent loops without sacrificing code readability.
