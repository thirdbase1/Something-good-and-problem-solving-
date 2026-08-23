export interface ExecutionResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  logs: string[];
  attempts: number;
}

export interface CoreEngineOptions {
  /** Default number of retries for failed actions (default: 2) */
  defaultRetries?: number;
  /** Prefix for log messages */
  logPrefix?: string;
}

export class CoreEngine {
  private logs: string[] = [];
  private readonly defaultRetries: number;
  private readonly logPrefix: string;

  constructor(options: CoreEngineOptions = {}) {
    this.defaultRetries = options.defaultRetries ?? 2;
    this.logPrefix = options.logPrefix ?? '[osx]';
  }

  /**
   * Execute an async action with automatic retries and structured result.
   */
  async execute<T>(
    action: () => Promise<T>,
    options: { retries?: number; label?: string } = {}
  ): Promise<ExecutionResult<T>> {
    const retries = options.retries ?? this.defaultRetries;
    const label = options.label ?? 'action';
    let attempt = 0;

    while (attempt <= retries) {
      try {
        const data = await action();
        return {
          success: true,
          data,
          logs: [...this.logs],
          attempts: attempt + 1,
        };
      } catch (err: unknown) {
        attempt++;
        const message = err instanceof Error ? err.message : String(err);
        this.log(`${label} attempt ${attempt} failed: ${message}`);

        if (attempt > retries) {
          return {
            success: false,
            error: message,
            logs: [...this.logs],
            attempts: attempt,
          };
        }

        // Brief cool-down before retry (self-healing window)
        this.log(`Self-healing analysis for ${label}...`);
        await new Promise((resolve) => setTimeout(resolve, 300 * attempt));
      }
    }

    return {
      success: false,
      error: 'Unknown error after retries',
      logs: [...this.logs],
      attempts: attempt,
    };
  }

  log(message: string): void {
    const entry = `${this.logPrefix} [${new Date().toISOString()}] ${message}`;
    // Keep console output for interactive use; suppress in pure library mode if needed
    if (process.env.OSX_SILENT !== '1') {
      console.log(entry);
    }
    this.logs.push(entry);
  }

  getLogs(): string[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}
