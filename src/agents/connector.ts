import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { CoreEngine } from '../core/engine';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
}

export interface AgentConfig {
  provider?: 'openrouter' | 'openai' | 'custom';
  apiKey?: string;
  model?: string;
  baseURL?: string;
  timeout?: number;
}

export class AgentConnector {
  private client: AxiosInstance;
  private config: Required<Pick<AgentConfig, 'provider' | 'model' | 'timeout'>> &
    AgentConfig;

  constructor(
    private core: CoreEngine,
    config: AgentConfig = {}
  ) {
    this.config = {
      provider: config.provider ?? 'openrouter',
      apiKey: config.apiKey,
      model: config.model ?? 'meta-llama/llama-3.1-70b-instruct',
      baseURL: config.baseURL,
      timeout: config.timeout ?? 45_000,
    };

    // Keep-alive to avoid repeated TCP/TLS handshakes in agentic loops
    this.client = axios.create({
      httpsAgent: new https.Agent({ keepAlive: true }),
      timeout: this.config.timeout,
    });
  }

  /**
   * Standard tool definitions exposed to any LLM that supports function calling.
   */
  getToolDefinitions(): ToolDefinition[] {
    return [
      {
        name: 'osx_shell_run',
        description: 'Run a secure shell command and capture stdout/stderr',
        parameters: {
          type: 'object',
          properties: {
            command: { type: 'string', description: 'Shell command to execute' },
            cwd: { type: 'string', description: 'Optional working directory' },
          },
          required: ['command'],
        },
      },
      {
        name: 'osx_fs_read',
        description: 'Read the contents of a file',
        parameters: {
          type: 'object',
          properties: {
            path: { type: 'string' },
          },
          required: ['path'],
        },
      },
      {
        name: 'osx_fs_write',
        description: 'Write content to a file (creates parent dirs if needed)',
        parameters: {
          type: 'object',
          properties: {
            path: { type: 'string' },
            content: { type: 'string' },
          },
          required: ['path', 'content'],
        },
      },
      {
        name: 'osx_fs_patch',
        description: 'Replace all occurrences of a search string in a file',
        parameters: {
          type: 'object',
          properties: {
            path: { type: 'string' },
            search: { type: 'string' },
            replace: { type: 'string' },
          },
          required: ['path', 'search', 'replace'],
        },
      },
      {
        name: 'osx_fs_list',
        description: 'List files and directories at a path',
        parameters: {
          type: 'object',
          properties: {
            path: { type: 'string', default: '.' },
          },
        },
      },
      {
        name: 'osx_search_deep',
        description: 'Perform deep multi-source research on a topic',
        parameters: {
          type: 'object',
          properties: {
            query: { type: 'string' },
          },
          required: ['query'],
        },
      },
    ];
  }

  /**
   * Simple chat completion. Returns the assistant message content.
   */
  async chat(message: string, system?: string): Promise<string> {
    this.core.log(`Agent chat (${this.config.provider}): ${message.slice(0, 80)}...`);

    if (!this.config.apiKey) {
      return (
        '[simulation] Agent running without API key. ' +
        'Provide apiKey in OneShotSX constructor for live LLM calls.\n\n' +
        `Received: ${message.slice(0, 200)}`
      );
    }

    const baseURL =
      this.config.baseURL ??
      (this.config.provider === 'openai'
        ? 'https://api.openai.com/v1'
        : 'https://openrouter.ai/api/v1');

    try {
      const response = await this.client.post(
        `${baseURL}/chat/completions`,
        {
          model: this.config.model,
          messages: [
            ...(system ? [{ role: 'system', content: system }] : []),
            { role: 'user', content: message },
          ],
          temperature: 0.2,
        },
        {
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            ...(this.config.provider === 'openrouter'
              ? { 'HTTP-Referer': 'https://github.com/thirdbase1/Something-good-and-problem-solving-' }
              : {}),
          },
        }
      );

      return response.data.choices?.[0]?.message?.content ?? '';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      this.core.log(`Agent error: ${msg}`);
      return `Agent error: ${msg}`;
    }
  }
}
