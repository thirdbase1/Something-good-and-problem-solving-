"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentConnector = void 0;
const axios_1 = __importDefault(require("axios"));
class AgentConnector {
    constructor(core, config = {}) {
        this.core = core;
        this.config = config;
    }
    /**
     * Standard protocol to expose oneshotsx tools to any LLM
     */
    getToolDefinitions() {
        return AgentConnector.TOOL_DEFINITIONS;
    }
    async chat(message) {
        this.core.log(`Agent received message: ${message}`);
        // This is where OpenRouter / OpenAI integration would happen
        if (!this.config.apiKey) {
            return "Agent running in simulation mode. No API key provided.";
        }
        try {
            const response = await axios_1.default.post('https://openrouter.ai/api/v1/chat/completions', {
                model: 'meta-llama/llama-3.1-70b-instruct',
                messages: [{ role: 'user', content: message }]
            }, {
                headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
            });
            return response.data.choices[0].message.content;
        }
        catch (err) {
            return `Agent error: ${err.message}`;
        }
    }
}
exports.AgentConnector = AgentConnector;
// ⚡ Bolt: Cache tool definitions statically to prevent recreating the array
// and objects on every single getToolDefinitions() call, reducing memory
// allocations and garbage collection overhead on hot paths.
AgentConnector.TOOL_DEFINITIONS = [
    {
        name: "osx_shell_run",
        description: "Run a secure shell command and get output",
        parameters: { command: "string" }
    },
    {
        name: "osx_fs_patch",
        description: "Patch a file with search/replace strings",
        parameters: { path: "string", search: "string", replace: "string" }
    },
    {
        name: "osx_search_deep",
        description: "Perform deep research across multiple platforms",
        parameters: { query: "string" }
    }
];
