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
import { AuthProvider } from './contexts/AuthContext';


// Define ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

const App =() =>{
  return (
    <AuthProvider>
    <Router>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/recipes" element={
          <ProtectedRoute>
            <RecipeList />
          </ProtectedRoute>
        } />
        <Route path="/recipe/:id" element={
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>
        } />
        <Route path="/add-recipe" element={
          <ProtectedRoute>
            <RecipeForm />
          </ProtectedRoute>
        } />
        <Route path="/edit-recipe/:id" element={
          <ProtectedRoute>
            <RecipeForm />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;