import { GraphQLServer } from "graphql-yoga";
import { ModelGraphQLController } from "./controllers/modelControllers/ModelGraphQLController";
import { ModelRepository } from "./dataProviders/model/modelRepository";

const modelRepository = new ModelRepository();

const modelGraphQLController = new ModelGraphQLController(modelRepository);

// Mockup
modelGraphQLController.createModel(undefined, {
  name: "Yaris",
  brand: "Toyota",
});
modelGraphQLController.createModel(undefined, {
  name: "Mustang",
  brand: "Ford",
});
// -------

// -------------------------------------------------- GraphQL

export const graphQLServer = new GraphQLServer({
  typeDefs: modelGraphQLController.typeDefs,
  resolvers: modelGraphQLController.resolvers,
});

graphQLServer.start(() =>
  console.log("Server is running on http://locahost:4000")
);
