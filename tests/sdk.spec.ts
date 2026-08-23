import { OneShotSX } from '../src/index';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('OneShotSX SDK', () => {
  let osx: OneShotSX;
  let tmpDir: string;

  beforeEach(async () => {
    osx = new OneShotSX({ silent: true });
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'osx-test-'));
    process.chdir(tmpDir);
  });

  afterEach(async () => {
    process.chdir(__dirname);
    await fs.rm(tmpDir, { recursive: true, force: true });
  });

  test('core engine exposes logs', () => {
    osx.core.log('test');
    const logs = osx.core.getLogs();
    expect(logs.length).toBeGreaterThan(0);
    expect(logs[0]).toContain('test');
  });

  test('tool definitions are complete', () => {
    const defs = osx.agent.getToolDefinitions();
    expect(defs.length).toBeGreaterThanOrEqual(5);
    const names = defs.map((d) => d.name);
    expect(names).toContain('osx_shell_run');
    expect(names).toContain('osx_fs_patch');
    expect(names).toContain('osx_search_deep');
  });

  test('file tool write + read roundtrip', async () => {
    const content = 'hello oneshotsx production';
    const writeRes = await osx.fs.write('hello.txt', content);
    expect(writeRes.success).toBe(true);

    const readRes = await osx.fs.read('hello.txt');
    expect(readRes.success).toBe(true);
    expect(readRes.data).toBe(content);
  });

  test('file tool patch works', async () => {
    await osx.fs.write('patchme.txt', 'old code here');
    const patchRes = await osx.fs.patch('patchme.txt', 'old code', 'new code');
    expect(patchRes.success).toBe(true);
    expect(patchRes.data?.replacements).toBe(1);

    const readRes = await osx.fs.read('patchme.txt');
    expect(readRes.data).toBe('new code here');
  });

  test('file tool rejects path traversal', async () => {
    const res = await osx.fs.read('../outside.txt');
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/Access denied|escapes/);
  });

  test('search deep returns structured result and caches', async () => {
    const first = await osx.search.deep('agentic sdk');
    expect(first.success).toBe(true);
    expect(first.data?.findings.length).toBeGreaterThan(0);
    expect(first.data?.cached).toBe(false);

    const second = await osx.search.deep('agentic sdk');
    expect(second.success).toBe(true);
    expect(second.data?.cached).toBe(true);
  });

  test('solve produces plan and research', async () => {
    const result = await osx.solve('Add a health check endpoint');
    expect(result.status).toMatch(/Plan Generated/);
    expect(result.intent).toBe('Add a health check endpoint');
    expect(result.plan).toBeDefined();
    expect(result.logs.length).toBeGreaterThan(0);
  });

  test('shell tool respects timeout safety', async () => {
    // A very short timeout should still return a structured result
    const res = await osx.shell.run('echo hello', { timeout: 5000 });
    expect(res.success).toBe(true);
    expect(res.data?.stdout.trim()).toBe('hello');
  });
});
