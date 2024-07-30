// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const { AuthenticationError } = require('apollo-server-express');

// // // In-memory database (replace with actual database in production)
// // let users = [];
// // let recipes = [];

// // const resolvers = {
// //   Query: {
// //     getRecipes: (_, __, { user }) => {
// //       if (!user) throw new AuthenticationError('You must be logged in');
// //       return recipes.filter(recipe => recipe.userId === user.id);
// //     },
// //     getRecipe: (_, { id }, { user }) => {
// //       if (!user) throw new AuthenticationError('You must be logged in');
// //       return recipes.find(recipe => recipe.id === id && recipe.userId === user.id);
// //     },
// //   },
// //   Mutation: {
// //     register: async (_, { username, email, password }) => {
// //       const existingUser = users.find(user => user.email === email);
// //       if (existingUser) throw new Error('User already exists');

// //       const hashedPassword = await bcrypt.hash(password, 10);
// //       const newUser = { id: String(users.length + 1), username, email, password: hashedPassword };
// //       users.push(newUser);

// //       const token = jwt.sign({ id: newUser.id }, 'your-secret-key', { expiresIn: '1d' });
// //       return { token, user: newUser };
// //     },
// //     login: async (_, { email, password }) => {
// //       const user = users.find(user => user.email === email);
// //       if (!user) throw new AuthenticationError('Invalid credentials');

// //       const validPassword = await bcrypt.compare(password, user.password);
// //       if (!validPassword) throw new AuthenticationError('Invalid credentials');

// //       const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1d' });
// //       return { token, user };
// //     },
// //     addRecipe: (_, { title, ingredients, instructions, category, date }, { user }) => {
// //       if (!user) throw new AuthenticationError('You must be logged in');
// //       const newRecipe = { id: String(recipes.length + 1), title, ingredients, instructions, category, date, userId: user.id };
// //       recipes.push(newRecipe);
// //       return newRecipe;
// //     },
// //     updateRecipe: (_, { id, ...updates }, { user }) => {
// //       if (!user) throw new AuthenticationError('You must be logged in');
// //       const index = recipes.findIndex(recipe => recipe.id === id && recipe.userId === user.id);
// //       if (index === -1) throw new Error('Recipe not found');
// //       recipes[index] = { ...recipes[index], ...updates };
// //       return recipes[index];
// //     },
// //     deleteRecipe: (_, { id }, { user }) => {
// //       if (!user) throw new AuthenticationError('You must be logged in');
// //       const index = recipes.findIndex(recipe => recipe.id === id && recipe.userId === user.id);
// //       if (index === -1) throw new Error('Recipe not found');
// //       recipes.splice(index, 1);
// //       return true;
// //     },
// //   },
// // };

// // module.exports = resolvers;
// const fs = require('fs-extra');
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { AuthenticationError } = require('apollo-server-express');

// const usersFilePath = path.join(__dirname, 'data', 'users.json');
// const recipesFilePath = path.join(__dirname, 'data', 'recipes.json');

// const readJsonFile = async (filePath) => {
//   try {
//     const data = await fs.readFile(filePath, 'utf-8');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// const writeJsonFile = async (filePath, data) => {
//   await fs.writeFile(filePath, JSON.stringify(data, null, 2));
// };

// const resolvers = {
//   Query: {
//     getRecipes: async (_, __, { user }) => {
//       if (!user) throw new AuthenticationError('You must be logged in');
//       const recipes = await readJsonFile(recipesFilePath);
//       return recipes.filter(recipe => recipe.userId === user.id);
//     },
//     getRecipe: async (_, { id }, { user }) => {
//       if (!user) throw new AuthenticationError('You must be logged in');
//       const recipes = await readJsonFile(recipesFilePath);
//       return recipes.find(recipe => recipe.id === id && recipe.userId === user.id);
//     },
//   },
//   Mutation: {
//     register: async (_, { username, email, password }) => {
//       const users = await readJsonFile(usersFilePath);
//       const existingUser = users.find(user => user.email === email);
//       if (existingUser) throw new Error('User already exists');

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = { id: String(users.length + 1), username, email, password: hashedPassword };
//       users.push(newUser);
//       await writeJsonFile(usersFilePath, users);

//       const token = jwt.sign({ id: newUser.id }, 'your-secret-key', { expiresIn: '1d' });
//       return { token, user: newUser };
//     },
//     login: async (_, { email, password }) => {
//       const users = await readJsonFile(usersFilePath);
//       const user = users.find(user => user.email === email);
//       if (!user) throw new AuthenticationError('Invalid credentials');

//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) throw new AuthenticationError('Invalid credentials');

//       const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1d' });
//       return { token, user };
//     },
//     addRecipe: async (_, { title, ingredients, instructions, category, date }, { user }) => {
//       if (!user) throw new AuthenticationError('You must be logged in');
//       const recipes = await readJsonFile(recipesFilePath);
//       const newRecipe = { id: String(recipes.length + 1), title, ingredients, instructions, category, date, userId: user.id };
//       recipes.push(newRecipe);
//       await writeJsonFile(recipesFilePath, recipes);
//       return newRecipe;
//     },
//     updateRecipe: async (_, { id, ...updates }, { user }) => {
//       if (!user) throw new AuthenticationError('You must be logged in');
//       const recipes = await readJsonFile(recipesFilePath);
//       const index = recipes.findIndex(recipe => recipe.id === id && recipe.userId === user.id);
//       if (index === -1) throw new Error('Recipe not found');
//       recipes[index] = { ...recipes[index], ...updates };
//       await writeJsonFile(recipesFilePath, recipes);
//       return recipes[index];
//     },
//     deleteRecipe: async (_, { id }, { user }) => {
//       if (!user) throw new AuthenticationError('You must be logged in');
//       let recipes = await readJsonFile(recipesFilePath);
//       const index = recipes.findIndex(recipe => recipe.id === id && recipe.userId === user.id);
//       if (index === -1) throw new Error('Recipe not found');
//       recipes.splice(index, 1);
//       await writeJsonFile(recipesFilePath, recipes);
//       return true;
//     },
//   },
// };

// module.exports = resolvers;
const fs = require("fs-extra");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server-express");
const { v4: uuidv4 } = require("uuid");

const usersFilePath = path.join(__dirname, "data", "users.json");
const recipesFilePath = path.join(__dirname, "data", "recipes.json");

const readJsonFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeJsonFile = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const resolvers = {
  Query: {
    getRecipes: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const recipes = await readJsonFile(recipesFilePath);
      return recipes.filter((recipe) => recipe.userId === user.id);
    },
    getRecipe: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const recipes = await readJsonFile(recipesFilePath);
      return recipes.find(
        (recipe) => recipe.id === id && recipe.userId === user.id
      );
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const users = await readJsonFile(usersFilePath);
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashedPassword,
      };
      users.push(newUser);
      await writeJsonFile(usersFilePath, users);

      const token = jwt.sign({ id: newUser.id }, "your-secret-key", {
        expiresIn: "1d",
      });
      return { token, user: newUser };
    },
    login: async (_, { email, password }) => {
      const users = await readJsonFile(usersFilePath);
      const user = users.find((user) => user.email === email);
      if (!user) throw new AuthenticationError("Invalid credentials");

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new AuthenticationError("Invalid credentials");

      const token = jwt.sign({ id: user.id }, "your-secret-key", {
        expiresIn: "1d",
      });
      return { token, user };
    },
    addRecipe: async (
      _,
      { title, ingredients, instructions, category, date },
      { user }
    ) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const recipes = await readJsonFile(recipesFilePath);
      const newRecipe = {
        id: uuidv4(),
        title,
        ingredients,
        instructions,
        category,
        date,
        userId: user.id,
      };
      recipes.push(newRecipe);
      await writeJsonFile(recipesFilePath, recipes);
      return newRecipe;
    },
    updateRecipe: async (_, { id, ...updates }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      const recipes = await readJsonFile(recipesFilePath);
      const index = recipes.findIndex(
        (recipe) => recipe.id === id && recipe.userId === user.id
      );
      if (index === -1) throw new Error("Recipe not found");
      recipes[index] = { ...recipes[index], ...updates };
      await writeJsonFile(recipesFilePath, recipes);
      return recipes[index];
    },
    deleteRecipe: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError("You must be logged in");
      let recipes = await readJsonFile(recipesFilePath);
      const index = recipes.findIndex(
        (recipe) => recipe.id === id && recipe.userId === user.id
      );
      if (index === -1) throw new Error("Recipe not found");
      recipes.splice(index, 1);
      await writeJsonFile(recipesFilePath, recipes);
      return true;
    },
  },
};

module.exports = resolvers;
