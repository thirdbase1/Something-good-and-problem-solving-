## 2026-04-22 - Optimize Agent Connector with HTTP Keep-Alive
**Learning:** Node.js HTTP/HTTPS requests (like those via Axios) do not use keep-alive connections by default. In an AI agent loop that makes many consecutive API calls to the same LLM endpoint, the overhead of repeating TCP and TLS handshakes for every request is a significant performance bottleneck (adding ~50-200ms per call).
**Action:** Always configure a shared Axios instance with `new https.Agent({ keepAlive: true })` when building components that make frequent requests to a single API host.
