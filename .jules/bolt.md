## 2024-04-26 - Axios HTTP Keep-Alive
**Learning:** Node.js HTTP/HTTPS requests (via libraries like Axios) do not use Keep-Alive by default, which creates significant performance bottlenecks due to repeated TCP handshakes and DNS lookups when making consecutive API requests to external LLM providers.
**Action:** Always instantiate a dedicated `axios` client configured with an `https.Agent({ keepAlive: true })` for services that perform frequent, repeated outbound network requests.
