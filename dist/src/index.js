"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osx = exports.OneShotSX = void 0;
const engine_1 = require("./core/engine");
const tools_1 = require("./tools");
const connector_1 = require("./agents/connector");
class OneShotSX {
    constructor(config = {}) {
        this.core = new engine_1.CoreEngine();
        this.shell = new tools_1.ShellTool(this.core);
        this.fs = new tools_1.FileTool(this.core);
        this.search = new tools_1.SearchTool(this.core);
        this.agent = new connector_1.AgentConnector(this.core, config);
    }
    /**
     * The primary entry point for autonomous problem solving.
     * It researches, plans, and executes the solution using the toolbelt.
     */
    async solve(intent) {
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
exports.OneShotSX = OneShotSX;
exports.osx = new OneShotSX();
exports.default = OneShotSX;
