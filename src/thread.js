const fs = require('fs');
const { toJson } = require('camaro');

const iterationCount = Number(process.env.ITERATION_COUNT);
const xmlRawPayload = fs.readFileSync(`${__dirname}/../payload.xml`).toString('utf8');

(async () => {
    for (let i = 0; i < iterationCount; i++) {
        await toJson(xmlRawPayload);
    }
})();
