import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
import { expressMiddleware } from "@as-integrations/express4";
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers.js";
import { resolverContext } from "./utils/resolver.utils.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", {
  encoding: "utf-8",
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

await apolloServer.start();

app.use(
  "/graphql",
  expressMiddleware(apolloServer, { context: resolverContext }),
);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
