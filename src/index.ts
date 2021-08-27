import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import dotenv from "dotenv";
import database from "../database";
import { UserResolver } from "./resolvers/User";
import { PostResolver } from "./resolvers/Post";

dotenv.config();
const main = async () => {
  try {
    const server = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver,PostResolver],
        validate: false,
         authChecker:({context:{req}}) => {
          if(req.session.userId){
            return true
          } 
          return false
         }
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    // The `listen` method launches a web server.
    await server.listen(4000, async () => {
      database.authenticate();
      console.log(
        `Database ${process.env.DB_NAME} is connected and Server ready at http://localhost:4000`
      );
    });
    server.applyMiddleware();
  } catch (error) {
    console.log(error);
  }
};

try {
  main();
} catch (error) {
  console.log(error);
}
