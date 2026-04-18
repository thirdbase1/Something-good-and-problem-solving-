const express = require('express');
const { Supervisor } = require('./supervisor');
const app = express();
const port = 3000;

app.use(express.json());

const supervisor = new Supervisor();

app.post('/intent', async (req, res) => {
    const { intent } = req.body;
    if (!intent) {
        return res.status(400).send({ error: 'Intent is required' });
    }

    console.log(`Received intent: ${intent}`);
    try {
        const result = await supervisor.processIntent(intent);
        res.send({ status: 'Intent queued', result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/status', (req, res) => {
    res.send({
        status: 'OmniDev Core Running',
        activeAgents: supervisor.getActiveAgents(),
        uptime: process.uptime()
    });
});

app.listen(port, () => {
    console.log(`OmniDev Core listening at http://localhost:${port}`);
});
