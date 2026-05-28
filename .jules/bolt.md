## 2026-04-25 - LLM API Connection Pooling
**Learning:** Making repeated API calls to external LLM providers (e.g. OpenRouter, OpenAI) without HTTP Keep-Alive results in 100-200ms of unnecessary TCP/TLS handshake overhead per request. In an agentic loop, this accumulates significantly.
**Action:** When initializing HTTP clients (like Axios) for repeated internal/external services, configure them with an `https.Agent` setting `keepAlive: true` to pool connections.

## 2026-05-28 - Agentic Loop Caching Optimization
**Learning:** In agentic tools that repeatedly query the same context (e.g., `SearchTool.deep`), making redundant operations or API calls causes significant bottlenecks. Caching within the `core.execute()` wrapper ensures standardized formatting, logging, and retry logic are maintained while eliminating the overhead.
**Action:** Use an in-memory `Map` cache for agentic tools that perform identical context queries during loops, placing cache logic inside the execution wrapper.
