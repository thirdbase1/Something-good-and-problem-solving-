## 2024-04-21 - Memory allocation overhead in getter methods
**Learning:** Returning fresh array or object instances from frequently accessed getter methods (like `getToolDefinitions` in agent connectors) causes noticeable memory allocation and garbage collection overhead on hot paths, affecting performance when the SDK is heavily used in a simulation or loops.
**Action:** Always cache immutable, static configurations (such as tool definitions) in a `static readonly` class property instead of constructing them dynamically per method call.
