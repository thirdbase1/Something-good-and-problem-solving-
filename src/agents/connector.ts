import axios from 'axios';
import { CoreEngine } from '../core/engine';

export interface ToolDefinition {
    name: string;
    description: string;
    parameters: object;
}

export class AgentConnector {
    // ⚡ Bolt: Cache tool definitions statically to prevent recreating the array
    // and objects on every single getToolDefinitions() call, reducing memory
    // allocations and garbage collection overhead on hot paths.
    private static readonly TOOL_DEFINITIONS: ToolDefinition[] = [
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

    constructor(private core: CoreEngine, private config: { provider?: string; apiKey?: string } = {}) {}

    /**
     * Standard protocol to expose oneshotsx tools to any LLM
     */
    getToolDefinitions(): ToolDefinition[] {
        return AgentConnector.TOOL_DEFINITIONS;
    }

    async chat(message: string): Promise<string> {
        this.core.log(`Agent received message: ${message}`);
        // This is where OpenRouter / OpenAI integration would happen
        if (!this.config.apiKey) {
            return "Agent running in simulation mode. No API key provided.";
        }

        try {
            const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
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
