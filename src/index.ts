import { CoreEngine } from './core/engine';
import { ShellTool, FileTool, SearchTool } from './tools';
import { AgentConnector, AgentConfig } from './agents/connector';

export interface OneShotSXConfig extends AgentConfig {
  /** Core engine options */
  retries?: number;
  silent?: boolean;
}

export class OneShotSX {
  public readonly core: CoreEngine;
  public readonly shell: ShellTool;
  public readonly fs: FileTool;
  public readonly search: SearchTool;
  public readonly agent: AgentConnector;

  constructor(config: OneShotSXConfig = {}) {
    if (config.silent) {
      process.env.OSX_SILENT = '1';
    }

    this.core = new CoreEngine({ defaultRetries: config.retries ?? 2 });
    this.shell = new ShellTool(this.core);
    this.fs = new FileTool(this.core);
    this.search = new SearchTool(this.core);
    this.agent = new AgentConnector(this.core, config);
  }

  /**
   * Primary autonomous entry point.
   * Performs research → planning → (simulated) execution and returns a structured result.
   *
   * In a full agent loop the plan would be parsed and the tools invoked iteratively.
   * This version generates a high-quality plan and returns all intermediate artifacts.
   */
  async solve(intent: string): Promise<{
    status: string;
    intent: string;
    research: unknown;
    plan: string;
    logs: string[];
  }> {
    this.core.clearLogs();
    this.core.log(`Initiating autonomous solve for: ${intent}`);

    // 1. Research
    const researchRes = await this.search.deep(intent);
    const research = researchRes.success ? researchRes.data : { error: researchRes.error };

    // 2. Planning via LLM (or simulation)
    const system = `You are a senior autonomous coding agent. 
You have access to the following tools:
${JSON.stringify(this.agent.getToolDefinitions(), null, 2)}

Produce a clear, step-by-step plan that uses these tools to achieve the user's goal.
Be concrete: name files, commands, and expected outcomes.`;

    const planPrompt = `Goal: ${intent}

Research context:
${JSON.stringify(research, null, 2)}

Write a numbered plan that an agent can execute.`;

    const plan = await this.agent.chat(planPrompt, system);
    this.core.log('Plan generated');

    // 3. In a future version this is where the real tool-calling loop lives.
    // For now we return the verified plan + research so callers can inspect or execute.

    return {
      status: researchRes.success ? 'Plan Generated & Research Complete' : 'Plan Generated (research partial)',
      intent,
      research,
      plan,
      logs: this.core.getLogs(),
    };
  }
}

/** Convenience singleton for quick scripts */
export const osx = new OneShotSX();

export default OneShotSX;

// Re-export useful types
export type { ExecutionResult } from './core/engine';
export type { ToolDefinition, AgentConfig } from './agents/connector';
export type { ShellRunOptions } from './tools';
