import { Worker } from "worker_threads";
import { ModelConsoleController } from "./controllers/modelControllers/ModelConsoleController";
import { SingletonModelRepository } from "./ioc";
const modelConsoleController = new ModelConsoleController(
  SingletonModelRepository.getInstance()
);

function consoleService() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./console.js", {
      workerData: {
        path: "./console.ts",
        modelConsoleController,
      },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

function graphQLService() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./graphql.js", {
      workerData: { path: "./graphql.ts", modelConsoleController },
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

async function runConsoleService() {
  const result = await consoleService();
  console.log(result);
}

async function runGraphQLService() {
  const result = await graphQLService();
  console.log(result);
}

runConsoleService().catch((err) => console.error(err));
runGraphQLService().catch((err) => console.error(err));
