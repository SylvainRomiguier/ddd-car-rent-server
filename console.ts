import readLineSync from "readline-sync";
import { ModelConsoleController } from "./controllers/modelControllers/ModelConsoleController";
import { ModelRepository } from "./dataProviders/model/modelRepository";

const modelRepository = new ModelRepository();
const modelConsoleController = new ModelConsoleController(modelRepository);

export const startConsole = async () => {
  let userResponse;
  // Mockup
  await modelConsoleController.createModel("Megane", "Renault");
  await modelConsoleController.createModel("Mustang", "Ford");
  // ------
  while (userResponse !== "Q") {
    console.log("\x1b[0m", "Main Menu");
    console.log("M - Model");
    console.log("Q - Quit the application");
    userResponse = readLineSync.question("Command => ");
    switch (userResponse) {
      case "M":
        await model();
        break;
      case "Q":
        console.log("Exiting ...");
        break;
      default:
        console.error("\x1b[31m", "Unknown command.");
    }
  }
};

const model = async () => {
  let modelUserResponse;
  while (modelUserResponse !== "Q") {
    console.log("\x1b[0m", "MODEL");
    console.log("C - Create");
    console.log("A - Get All");
    console.log("B - Back to main menu.");
    modelUserResponse = readLineSync.question("Model command => ");
    switch (modelUserResponse) {
      case "C":
        const name = readLineSync.question("Name ? ");
        const brand = readLineSync.question("Brand ? ");
        await modelConsoleController.createModel(name, brand);
        break;
      case "A":
        await modelConsoleController.getAll();
        break;
      case "B":
        return;
      default:
        console.error("\x1b[31m", "Unknown command.");
    }
  }
};

startConsole();
