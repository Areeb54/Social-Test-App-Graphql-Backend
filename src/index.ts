const { ApolloServer, gql } = require("apollo-server");
import database from "../database";

const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    password: String
  }
  type Query {
    user: [User]
  }
  type Post {
    id: String
    userId: Float
    description: String
    imageUrl: String
  }
  type Query {
    post: [Post]
  }
  type Comment {
    id: String
    userId: Float
    name: String
    postId: Float
    text: String
  }
  type Query {
    comment: [Comment]
  }
`;

const user = [
  {
    id: "55555555",
    name: "The Awakening",
    email: "Kate Chopin",
    password: 1234567,
  },
  {
    id: "555555554",
    name: "City of Glass",
    email: "Paul Auster",
    password: 1234567,
  },
];

const post = [
  {
    id: "55555555",
    userId: "",
    email: "KateChopin@gmail.com",
    password: 1234567,
  },
  {
    id: "555555554",
    userId: "",
    email: "PaulAuster@gmail.com",
    password: 1234567,
  },
];

const comment = [
  {
    id: "",
    userId: "",
    name: "kate",
    postId: "",
    text: "heya",
  },
  {
    id: "",
    userId: "",
    name: "mate",
    postId: "",
    text: "hiiii",
  },
];

const resolvers = {
  Query: {
    user: () => user,
    post: () => post,
    comment: () => comment,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
database
  .sync({ alter: true })
  .then(() => {
    server.listen().then(({ url }: any) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  })
  .catch((e) => {
    console.log(e);
  }); // when force: true, there would be all data in all tables deleted
