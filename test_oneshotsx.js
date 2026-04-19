const { osx } = require('./oneshotsx/sdk');

async function test() {
    const result = await osx.solve({
        intent: "Build a secure landing page for a SaaS startup",
        deploy: "vercel"
    });
    console.log('Final Result:', JSON.stringify(result, null, 2));
}

test();
