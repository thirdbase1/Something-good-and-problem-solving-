import { OneShotSX } from '../src/index';

describe('OneShotSX SDK', () => {
  let osx: OneShotSX;

  beforeEach(() => {
    osx = new OneShotSX();
  });

  test('Core engine logs initialization', () => {
    const logs = osx.core.getLogs();
    expect(logs).toBeDefined();
  });

  test('Tool definitions are valid', () => {
    const definitions = osx.agent.getToolDefinitions();
    expect(definitions.length).toBeGreaterThan(0);
    expect(definitions[0]).toHaveProperty('name');
  });

  test('File tool read/write', async () => {
    const testFile = 'test.txt';
    const content = 'hello oneshotsx';
    await osx.fs.write(testFile, content);
    const readRes = await osx.fs.read(testFile);
    expect(readRes.success).toBe(true);
    expect(readRes.data).toBe(content);
  });

  test('Search tool caches repeated queries', async () => {
    const query = 'autonomous agents';

    // First call should do actual search
    const firstResult = await osx.search.deep(query);
    expect(firstResult.success).toBe(true);
    expect(firstResult.data?.query).toBe(query);

    // Second call should return from cache
    const secondResult = await osx.search.deep(query);
    expect(secondResult.success).toBe(true);
    expect(secondResult.data).toEqual(firstResult.data);

    // Check logs for cache hit
    const logs = osx.core.getLogs();
    const cacheHitLog = logs.find(log => log.includes(`Cache hit for search query: ${query}`));
    expect(cacheHitLog).toBeDefined();
  });
});
