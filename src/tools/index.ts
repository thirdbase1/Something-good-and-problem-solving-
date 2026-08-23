import { exec, ExecOptions } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CoreEngine, ExecutionResult } from '../core/engine';

const execAsync = promisify(exec);

export interface ShellRunOptions {
  cwd?: string;
  timeout?: number; // ms
  maxBuffer?: number;
  env?: NodeJS.ProcessEnv;
}

export class ShellTool {
  constructor(private core: CoreEngine) {}

  /**
   * Run a shell command with safety limits (timeout + buffer).
   */
  async run(
    command: string,
    options: ShellRunOptions = {}
  ): Promise<ExecutionResult<{ stdout: string; stderr: string }>> {
    this.core.log(`Executing shell: ${command}`);
    return this.core.execute(
      async () => {
        const execOpts: ExecOptions = {
          timeout: options.timeout ?? 30_000,
          maxBuffer: options.maxBuffer ?? 5 * 1024 * 1024, // 5 MB
          cwd: options.cwd,
          env: options.env ? { ...process.env, ...options.env } : process.env,
        };
        const { stdout, stderr } = await execAsync(command, execOpts);
        return { stdout: stdout.toString(), stderr: stderr.toString() };
      },
      { label: 'shell.run' }
    );
  }
}

export class FileTool {
  constructor(private core: CoreEngine) {}

  /**
   * Resolve a user-provided path and ensure it stays inside process.cwd().
   */
  private resolveAndValidatePath(unsafePath: string): string {
    const resolvedPath = path.resolve(process.cwd(), unsafePath);
    const cwd = process.cwd();
    if (resolvedPath !== cwd && !resolvedPath.startsWith(cwd + path.sep)) {
      throw new Error(`Access denied: path escapes working directory (${unsafePath})`);
    }
    return resolvedPath;
  }

  async read(unsafePath: string): Promise<ExecutionResult<string>> {
    this.core.log(`Reading file: ${unsafePath}`);
    return this.core.execute(async () => {
      const safePath = this.resolveAndValidatePath(unsafePath);
      return fs.readFile(safePath, 'utf-8');
    }, { label: 'fs.read' });
  }

  async write(unsafePath: string, content: string): Promise<ExecutionResult<void>> {
    this.core.log(`Writing file: ${unsafePath}`);
    return this.core.execute(async () => {
      const safePath = this.resolveAndValidatePath(unsafePath);
      await fs.mkdir(path.dirname(safePath), { recursive: true });
      await fs.writeFile(safePath, content, 'utf-8');
    }, { label: 'fs.write' });
  }

  /**
   * Simple string replace. Throws if search string is not found.
   */
  async patch(
    unsafePath: string,
    search: string,
    replace: string
  ): Promise<ExecutionResult<{ replacements: number }>> {
    this.core.log(`Patching file: ${unsafePath}`);
    return this.core.execute(async () => {
      const safePath = this.resolveAndValidatePath(unsafePath);
      const content = await fs.readFile(safePath, 'utf-8');
      if (!content.includes(search)) {
        throw new Error(`Search string not found in ${unsafePath}`);
      }
      // Count occurrences for feedback
      const occurrences = content.split(search).length - 1;
      const newContent = content.split(search).join(replace);
      await fs.writeFile(safePath, newContent, 'utf-8');
      return { replacements: occurrences };
    }, { label: 'fs.patch' });
  }

  async exists(unsafePath: string): Promise<ExecutionResult<boolean>> {
    return this.core.execute(async () => {
      const safePath = this.resolveAndValidatePath(unsafePath);
      try {
        await fs.access(safePath);
        return true;
      } catch {
        return false;
      }
    }, { label: 'fs.exists' });
  }

  async list(unsafePath: string = '.'): Promise<ExecutionResult<string[]>> {
    this.core.log(`Listing directory: ${unsafePath}`);
    return this.core.execute(async () => {
      const safePath = this.resolveAndValidatePath(unsafePath);
      return fs.readdir(safePath);
    }, { label: 'fs.list' });
  }

  async mkdir(unsafePath: string): Promise<ExecutionResult<void>> {
    return this.core.execute(async () => {
      const safePath = this.resolveAndValidatePath(unsafePath);
      await fs.mkdir(safePath, { recursive: true });
    }, { label: 'fs.mkdir' });
  }

  async remove(unsafePath: string): Promise<ExecutionResult<void>> {
    this.core.log(`Removing: ${unsafePath}`);
    return this.core.execute(async () => {
      const safePath = this.resolveAndValidatePath(unsafePath);
      await fs.rm(safePath, { recursive: true, force: true });
    }, { label: 'fs.remove' });
  }
}

export class SearchTool {
  private cache = new Map<string, unknown>();

  constructor(private core: CoreEngine) {}

  /**
   * Deep research helper. Currently simulated; replace the body with real
   * multi-source search (SerpAPI, Tavily, X, etc.) for production use.
   */
  async deep(query: string): Promise<ExecutionResult<{
    query: string;
    timestamp: string;
    findings: string[];
    cached: boolean;
  }>> {
    this.core.log(`Deep search: ${query}`);

    return this.core.execute(async () => {
      if (this.cache.has(query)) {
        this.core.log(`Cache hit for query: ${query}`);
        const cached = this.cache.get(query) as any;
        return { ...cached, cached: true };
      }

      // Placeholder — integrate real search providers here
      const result = {
        query,
        timestamp: new Date().toISOString(),
        findings: [
          `Best practices and patterns for: ${query}`,
          `Common pitfalls and solutions related to: ${query}`,
          `2026-relevant approaches for: ${query}`,
        ],
        cached: false,
      };

      this.cache.set(query, result);
      return result;
    }, { label: 'search.deep' });
  }

  clearCache(): void {
    this.cache.clear();
    this.core.log('Search cache cleared');
  }
}
