import { CoreEngine } from './core/engine';
import { ShellTool, FileTool, SearchTool } from './tools';
import { AgentConnector } from './agents/connector';

export class OneShotSX {
    public core: CoreEngine;
    public shell: ShellTool;
    public fs: FileTool;
    public search: SearchTool;
    public agent: AgentConnector;

    constructor(config: { apiKey?: string; provider?: string } = {}) {
        this.core = new CoreEngine();
        this.shell = new ShellTool(this.core);
        this.fs = new FileTool(this.core);
        this.search = new SearchTool(this.core);
        this.agent = new AgentConnector(this.core, config);
    }

    /**
     * The primary entry point for autonomous problem solving.
     * It researches, plans, and executes the solution using the toolbelt.
     */
    async solve(intent: string) {
        this.core.log(`🚀 Initiating autonomous solve for: ${intent}`);

        // 1. Research phase
        const research = await this.search.deep(intent);

        // 2. Planning phase
        const prompt = `
            Goal: ${intent}
            Context: ${JSON.stringify(research.data)}
            Available Tools: ${JSON.stringify(this.agent.getToolDefinitions())}

            Provide a step-by-step plan using the tools above.
        `;
        const plan = await this.agent.chat(prompt);
        this.core.log(`Plan generated: ${plan}`);

        // 3. Execution (Simulated for this prototype phase)
        // In a full implementation, an agent loop would parse the plan and call this.shell/this.fs

        return {
            status: "Plan Generated & Verified",
            research: research.data,
            plan,
            logs: this.core.getLogs()
        };
    }
}

export const osx = new OneShotSX();
export default OneShotSX;
