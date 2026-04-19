"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe('OneShotSX SDK', () => {
    let osx;
    beforeEach(() => {
        osx = new index_1.OneShotSX();
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
});
