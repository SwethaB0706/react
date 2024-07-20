import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './pages/RecipeDetails';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyles';

// Define PrivateRoute component
const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/recipes" element={
          <PrivateRoute>
            <RecipeList />
          </PrivateRoute>
        } />
        <Route path="/recipe/:id" element={
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        } />
        <Route path="/add-recipe" element={
          <PrivateRoute>
            <RecipeForm />
          </PrivateRoute>
        } />
        <Route path="/edit-recipe/:id" element={
          <PrivateRoute>
            <RecipeForm />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;