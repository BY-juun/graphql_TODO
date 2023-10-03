import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { sequelizeInstance, createTables } from "../models";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "../schema";
import { json } from "body-parser";

export default async function () {
  const app = express();

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  dotenv.config();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server)
  );

  createTables();

  app.listen(3065, async () => {
    console.log("3065 port에서 서버 실행!");
    await sequelizeInstance
      .authenticate()
      .then(async () => {
        console.log("connection success");
      })
      .catch((e) => {
        console.log("TT : ", e);
      });
  });
}
