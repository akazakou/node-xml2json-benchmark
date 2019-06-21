const iterationCount = Number(process.env.ITERATION_COUNT);
const threadCount = Number(process.env.THREAD_COUNT);
const { Worker } = require('worker_threads');

const startTime = new Date();

console.info(`Started at ${startTime.toISOString()}`);
console.info(`Each thread will run ${iterationCount} iterations for test...`);
console.info(`Starting ${threadCount} threads for test...`);

let workersCount = 0;
for (let i = 0; i < threadCount; i++) {
    (() => (new Worker(`${__dirname}/thread.js`)).on('online', () => workersCount++).on('exit', () => {
        workersCount--;

        if (workersCount <= 0) {
            const endTime = new Date();

            console.info(`Completed in ${(endTime.getTime() - startTime.getTime()) / 1000} seconds.`);
            console.info(`Finished at ${endTime.toISOString()}.`);

            process.exit(0);
        }
    }))();
}

console.info('Waiting for all threads to finish...');
