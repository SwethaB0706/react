const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Recipe {
    id: ID!
    title: String!
    ingredients: [String!]!
    instructions: [String!]!
    category: String!
    date: String!
    userId: ID!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getRecipes: [Recipe!]!
    getRecipe(id: ID!): Recipe
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    addRecipe(title: String!, ingredients: [String!]!, instructions: [String!]!, category: String!, date: String!): Recipe!
    updateRecipe(id: ID!, title: String, ingredients: [String!], instructions: [String!], category: String, date: String): Recipe!
    deleteRecipe(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;