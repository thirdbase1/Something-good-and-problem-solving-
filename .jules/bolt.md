## 2026-04-24 - LLM API Call Connection Pooling
**Learning:** Sequential LLM API calls typically suffer ~100-300ms overhead on every single request due to repetitive TCP connection setup and TLS handshakes, which can be a significant architectural bottleneck when agents rapidly call an external provider.
**Action:** Use an `https.Agent({ keepAlive: true })` bound to a dedicated cached HTTP client instance (e.g., `axios.create()`) to maintain open connections across subsequent requests.
