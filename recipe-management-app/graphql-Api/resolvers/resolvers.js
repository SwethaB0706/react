const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AuthenticationError } = require('apollo-server-express');

// In-memory database (replace with actual database in production)
let users = [];
let recipes = [];

const resolvers = {
  Query: {
    getRecipes: (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return recipes.filter(recipe => recipe.userId === user.id);
    },
    getRecipe: (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return recipes.find(recipe => recipe.id === id && recipe.userId === user.id);
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = users.find(user => user.email === email);
      if (existingUser) throw new Error('User already exists');

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { id: String(users.length + 1), username, email, password: hashedPassword };
      users.push(newUser);

      const token = jwt.sign({ id: newUser.id }, 'your-secret-key', { expiresIn: '1d' });
      return { token, user: newUser };
    },
    login: async (_, { email, password }) => {
      const user = users.find(user => user.email === email);
      if (!user) throw new AuthenticationError('Invalid credentials');

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new AuthenticationError('Invalid credentials');

      const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1d' });
      return { token, user };
    },
    addRecipe: (_, { title, ingredients, instructions, category, date }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const newRecipe = { id: String(recipes.length + 1), title, ingredients, instructions, category, date, userId: user.id };
      recipes.push(newRecipe);
      return newRecipe;
    },
    updateRecipe: (_, { id, ...updates }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const index = recipes.findIndex(recipe => recipe.id === id && recipe.userId === user.id);
      if (index === -1) throw new Error('Recipe not found');
      recipes[index] = { ...recipes[index], ...updates };
      return recipes[index];
    },
    deleteRecipe: (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      const index = recipes.findIndex(recipe => recipe.id === id && recipe.userId === user.id);
      if (index === -1) throw new Error('Recipe not found');
      recipes.splice(index, 1);
      return true;
    },
  },
};

module.exports = resolvers;