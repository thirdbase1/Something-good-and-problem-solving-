"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentConnector = void 0;
const axios_1 = __importDefault(require("axios"));
const https = __importStar(require("https"));
class AgentConnector {
    constructor(core, config = {}) {
        this.core = core;
        this.config = config;
        // Optimize repeated API calls by enabling keep-alive for HTTP/HTTPS connections.
        // This avoids expensive TCP/TLS handshakes (~100-200ms per request) on consecutive LLM calls.
        this.client = axios_1.default.create({
            httpsAgent: new https.Agent({ keepAlive: true }),
            timeout: 30000 // Security: Enforce strict boundaries to prevent DoS via hung network requests
        });
    }
    /**
     * Standard protocol to expose oneshotsx tools to any LLM
     */
    getToolDefinitions() {
        return [
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
    }
    async chat(message) {
        this.core.log(`Agent received message: ${message}`);
        // This is where OpenRouter / OpenAI integration would happen
        if (!this.config.apiKey) {
            return "Agent running in simulation mode. No API key provided.";
        }
        try {
            const response = await this.client.post('https://openrouter.ai/api/v1/chat/completions', {
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
