import { CoreEngine } from './core/engine';
import { ShellTool, FileTool, SearchTool } from './tools';
import { AgentConnector } from './agents/connector';
export declare class OneShotSX {
    core: CoreEngine;
    shell: ShellTool;
    fs: FileTool;
    search: SearchTool;
    agent: AgentConnector;
    constructor(config?: {
        apiKey?: string;
        provider?: string;
    });
    /**
     * The primary entry point for autonomous problem solving.
     * It researches, plans, and executes the solution using the toolbelt.
     */
    solve(intent: string): Promise<{
        status: string;
        research: any;
        plan: string;
        logs: string[];
    }>;
}
export declare const osx: OneShotSX;
export default OneShotSX;
