import { parentPort, workerData } from "node:worker_threads";

for (let i = 0; i < workerData; i++) {}

parentPort.postMessage({
  type: "done",
  message: `done looping over ${workerData}`,
});
