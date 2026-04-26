import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { CoreEngine } from '../core/engine';

export interface ToolDefinition {
    name: string;
    description: string;
    parameters: object;
}

export class AgentConnector {
    private client: AxiosInstance;

    constructor(private core: CoreEngine, private config: { provider?: string; apiKey?: string } = {}) {
        // ⚡ Bolt: Optimize consecutive API calls by enabling HTTP keep-alive.
        // Reusing TCP connections prevents repeated TLS handshakes, saving ~50-100ms per request.
        this.client = axios.create({
            httpsAgent: new https.Agent({ keepAlive: true })
        });
    }

    /**
     * Standard protocol to expose oneshotsx tools to any LLM
     */
    getToolDefinitions(): ToolDefinition[] {
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

    async chat(message: string): Promise<string> {
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
        } catch (err: any) {
            return `Agent error: ${err.message}`;
        }
    }
}
