import { CoreEngine } from '../core/engine';
export interface ToolDefinition {
    name: string;
    description: string;
    parameters: object;
}
export declare class AgentConnector {
    private core;
    private config;
    private client;
    constructor(core: CoreEngine, config?: {
        provider?: string;
        apiKey?: string;
    });
    /**
     * Standard protocol to expose oneshotsx tools to any LLM
     */
    getToolDefinitions(): ToolDefinition[];
    chat(message: string): Promise<string>;
}
