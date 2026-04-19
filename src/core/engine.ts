export interface ExecutionResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    logs: string[];
}

export class CoreEngine {
    private logs: string[] = [];

    async execute<T>(action: () => Promise<T>, options: { retries?: number } = {}): Promise<ExecutionResult<T>> {
        const retries = options.retries ?? 2;
        let attempt = 0;

        while (attempt <= retries) {
            try {
                const data = await action();
                return { success: true, data, logs: this.logs };
            } catch (err: any) {
                attempt++;
                this.log(`Attempt ${attempt} failed: ${err.message}`);

                if (attempt > retries) {
                    return { success: false, error: err.message, logs: this.logs };
                }

                // Self-healing: In a real implementation, we could analyze the error here
                this.log(`Analyzing error for self-healing...`);
                await new Promise(resolve => setTimeout(resolve, 500)); // Cool down
            }
        }

        return { success: false, error: "Unknown error", logs: this.logs };
    }

    log(message: string) {
        const entry = `[${new Date().toISOString()}] ${message}`;
        console.log(entry);
        this.logs.push(entry);
    }

    getLogs() {
        return this.logs;
    }
}
