"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTool = exports.FileTool = exports.ShellTool = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class ShellTool {
    constructor(core) {
        this.core = core;
    }
    async run(command) {
        this.core.log(`Executing shell command: ${command}`);
        return this.core.execute(async () => {
            const { stdout, stderr } = await execAsync(command);
            return { stdout, stderr };
        });
    }
}
exports.ShellTool = ShellTool;
class FileTool {
    constructor(core) {
        this.core = core;
    }
    resolveSecurePath(requestedPath) {
        const cwd = process.cwd();
        const resolvedPath = path.resolve(cwd, requestedPath);
        if (!resolvedPath.startsWith(cwd + path.sep) && resolvedPath !== cwd) {
            throw new Error(`Path traversal detected: ${requestedPath}`);
        }
        return resolvedPath;
    }
    async read(filePath) {
        this.core.log(`Reading file: ${filePath}`);
        return this.core.execute(() => {
            const securePath = this.resolveSecurePath(filePath);
            return fs.readFile(securePath, 'utf-8');
        });
    }
    async write(filePath, content) {
        this.core.log(`Writing file: ${filePath}`);
        return this.core.execute(() => {
            const securePath = this.resolveSecurePath(filePath);
            return fs.writeFile(securePath, content);
        });
    }
    async patch(filePath, search, replace) {
        this.core.log(`Patching file: ${filePath}`);
        return this.core.execute(async () => {
            const securePath = this.resolveSecurePath(filePath);
            const content = await fs.readFile(securePath, 'utf-8');
            const newContent = content.replace(search, replace);
            if (content === newContent) {
                throw new Error(`Search string not found in ${filePath}`);
            }
            await fs.writeFile(securePath, newContent);
        });
    }
}
exports.FileTool = FileTool;
class SearchTool {
    constructor(core) {
        this.core = core;
    }
    async deep(query) {
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
exports.SearchTool = SearchTool;
