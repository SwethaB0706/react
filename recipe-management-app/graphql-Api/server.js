const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema/schema");
const resolvers = require("./resolvers/resolvers");

const app = express();

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, "your-secret-key");
    } catch (error) {
      throw new Error("Invalid token");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const user = getUser(token.replace("Bearer ", ""));
    return { user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
