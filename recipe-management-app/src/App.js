import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashbord/Dashboard';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';


// Define ProtectedRoute component
// const ProtectedRoute = ({ children }) => {
//   return localStorage.getItem('token') ? children : <Navigate to="/login" />;
// };
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // You can add additional logic to check for token expiration here
  const isTokenValid = token && !isTokenExpired(token);

  return isTokenValid ? children : <Navigate to="/login" />;
};

//Function to check if the token is expired
//Assuming your token is a JWT, you can decode it and check the expiration time
const isTokenExpired = (token) => {
  try {
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch (error) {
    // If there's an error decoding the token, assume it's invalid
    return true;
  }
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