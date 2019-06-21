const fs = require('fs');
const fast = require('fast-xml-parser');

const iterationCount = Number(process.env.ITERATION_COUNT);
const xmlRawPayload = fs.readFileSync(`${__dirname}/../payload.xml`).toString('utf8');

for (let i = 0; i < iterationCount; i++) {
    (() => {
        fast.parse(xmlRawPayload);
    })();
}
