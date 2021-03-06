const cluster = require('cluster');
const { EventEmitter } = require('events');

const iterationCount = Number(process.env.ITERATION_COUNT);
const threadCount = Number(process.env.THREAD_COUNT);

if (cluster.isMaster) {
    const startTime = new Date();

    console.info(`Started at ${startTime.toISOString()}`);
    console.info(`Each thread will run ${iterationCount} iterations for test...`);
    console.info(`Starting ${threadCount} threads for test...`);

    let workersCount = 0;
    for (let i = 0; i < threadCount; i++) {
        workersCount++;
        cluster.fork();
    }

    console.info('Waiting for all threads to finish...');
    cluster.on('exit', (worker, code, signal) => {
        workersCount--;
        if (workersCount <= 0) {
            const endTime = new Date();

            console.info(`Completed in ${(endTime.getTime() - startTime.getTime()) / 1000} seconds.`);
            console.info(`Finished at ${endTime.toISOString()}.`);

            process.exit(0);
        }
    });
} else {
    const fs = require('fs');
    const fast = require('fast-xml-parser');

    const xmlRawPayload = fs.readFileSync(`${__dirname}/../payload.xml`).toString('utf8');
    const emitter = new EventEmitter();

    let counter = 0;
    emitter.on('done', () => {
        ++counter

        if (counter >= iterationCount) {
            process.exit(0);
        }
    });

    for (let i = 0; i < iterationCount; i++) {
        (() => {
            fast.parse(xmlRawPayload);
            emitter.emit('done');
        })();
    }
}
