export interface ExecutionResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    logs: string[];
}
export declare class CoreEngine {
    private logs;
    execute<T>(action: () => Promise<T>, options?: {
        retries?: number;
    }): Promise<ExecutionResult<T>>;
    log(message: string): void;
    getLogs(): string[];
}
