import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import { execute, subscribe } from "graphql";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

import typeDefs from "./schema"; // Points to index.ts in schema folder
import resolvers from "./resolvers"; // Points to index.ts in resolvers folder

async function startServer() {
  const app = express();
  const httpServer = createServer(app);

  // makeExecutableSchema is a function that takes the type definitions and resolvers and returns a schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // useServer is a function that takes the schema, execute, and subscribe functions and returns a cleanup function
  const serverCleanup = useServer({ schema, execute, subscribe }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app } as any);

  const PORT = 4001;
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`,
    );
  });
}

startServer();
