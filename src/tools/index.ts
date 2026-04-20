import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CoreEngine, ExecutionResult } from '../core/engine';

const execAsync = promisify(exec);

export class ShellTool {
    constructor(private core: CoreEngine) {}

    async run(command: string): Promise<ExecutionResult<{ stdout: string; stderr: string }>> {
        this.core.log(`Executing shell command: ${command}`);
        return this.core.execute(async () => {
            const { stdout, stderr } = await execAsync(command);
            return { stdout, stderr };
        });
    }
}

export class FileTool {
    constructor(private core: CoreEngine) {}

    private sanitizePath(unsafePath: string): string {
        const resolvedPath = path.resolve(process.cwd(), unsafePath);
        if (resolvedPath !== process.cwd() && !resolvedPath.startsWith(process.cwd() + path.sep)) {
            throw new Error(`Security Error: Path traversal attempt blocked for ${unsafePath}`);
        }
        return resolvedPath;
    }

    async read(filePath: string): Promise<ExecutionResult<string>> {
        this.core.log(`Reading file: ${filePath}`);
        return this.core.execute(() => fs.readFile(this.sanitizePath(filePath), 'utf-8'));
    }

    async write(filePath: string, content: string): Promise<ExecutionResult<void>> {
        this.core.log(`Writing file: ${filePath}`);
        return this.core.execute(() => fs.writeFile(this.sanitizePath(filePath), content));
    }

    async patch(filePath: string, search: string, replace: string): Promise<ExecutionResult<void>> {
        this.core.log(`Patching file: ${filePath}`);
        return this.core.execute(async () => {
            const safePath = this.sanitizePath(filePath);
            const content = await fs.readFile(safePath, 'utf-8');
            const newContent = content.replace(search, replace);
            if (content === newContent) {
                throw new Error(`Search string not found in ${filePath}`);
            }
            await fs.writeFile(safePath, newContent);
        });
    }
}

export class SearchTool {
    constructor(private core: CoreEngine) {}

    async deep(query: string): Promise<ExecutionResult<any>> {
        this.core.log(`Initiating deep search for: ${query}`);
        // This is where real API calls to Google/X/Reddit would go
        return this.core.execute(async () => {
            // Simulated results for the SDK base
            return {
                query,
                timestamp: new Date().toISOString(),
                findings: [
                    "Best practices for " + query,
                    "Trending solutions in 2026"
                ]
            };
        });
    }
}
