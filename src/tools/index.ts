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

    private getSafePath(targetPath: string): string {
        const rootDir = process.cwd();
        const resolvedPath = path.resolve(rootDir, targetPath);

        // Ensure path stays within rootDir exactly or inside a child directory
        if (resolvedPath !== rootDir && !resolvedPath.startsWith(rootDir + path.sep)) {
            throw new Error(`Security Error: Path traversal detected. Access to ${targetPath} is forbidden.`);
        }
        return resolvedPath;
    }

    async read(targetPath: string): Promise<ExecutionResult<string>> {
        this.core.log(`Reading file: ${targetPath}`);
        return this.core.execute(() => {
            const safePath = this.getSafePath(targetPath);
            return fs.readFile(safePath, 'utf-8');
        });
    }

    async write(targetPath: string, content: string): Promise<ExecutionResult<void>> {
        this.core.log(`Writing file: ${targetPath}`);
        return this.core.execute(() => {
            const safePath = this.getSafePath(targetPath);
            return fs.writeFile(safePath, content);
        });
    }

    async patch(targetPath: string, search: string, replace: string): Promise<ExecutionResult<void>> {
        this.core.log(`Patching file: ${targetPath}`);
        return this.core.execute(async () => {
            const safePath = this.getSafePath(targetPath);
            const content = await fs.readFile(safePath, 'utf-8');
            const newContent = content.replace(search, replace);
            if (content === newContent) {
                throw new Error(`Search string not found in ${targetPath}`);
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
