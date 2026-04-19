const { IntentEngine } = require('./intent');
const { SearchOrchestrator } = require('./search');
const { Synthesizer } = require('./synth');
const { UniversalDeployer } = require('./deploy');

class OneShotSX {
    constructor(config = {}) {
        this.config = {
            apiKey: process.env.ONESHOTSX_API_KEY,
            model: config.model || 'llama-3.1-70b',
            ...config
        };
        this.intentEngine = new IntentEngine(this.config);
        this.searchOrchestrator = new SearchOrchestrator(this.config);
        this.synthesizer = new Synthesizer(this.config);
        this.deployer = new UniversalDeployer(this.config);
    }

    async solve({ intent, platform = 'nextjs', deploy = 'none' }) {
        if (!this.config.apiKey) {
            console.warn('⚠️ Warning: ONESHOTSX_API_KEY not set. Running in demo/mock mode.');
        }

        console.log(`🚀 oneshotsx starting: ${intent}`);
        const context = await this.searchOrchestrator.research(intent);
        const plan = await this.intentEngine.plan(intent, context);
        const solution = await this.synthesizer.build(plan, platform);

        if (deploy !== 'none') {
            const deployResult = await this.deployer.deploy(solution, deploy);
            return { solution, deployResult };
        }

        return { solution };
    }
}

const osx = new OneShotSX();
module.exports = { OneShotSX, osx };
