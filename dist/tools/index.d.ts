import { CoreEngine, ExecutionResult } from '../core/engine';
export declare class ShellTool {
    private core;
    constructor(core: CoreEngine);
    run(command: string): Promise<ExecutionResult<{
        stdout: string;
        stderr: string;
    }>>;
}
export declare class FileTool {
    private core;
    constructor(core: CoreEngine);
    read(path: string): Promise<ExecutionResult<string>>;
    write(path: string, content: string): Promise<ExecutionResult<void>>;
    patch(path: string, search: string, replace: string): Promise<ExecutionResult<void>>;
}
export declare class SearchTool {
    private core;
    constructor(core: CoreEngine);
    deep(query: string): Promise<ExecutionResult<any>>;
}
