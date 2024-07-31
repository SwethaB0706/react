import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import RecipeList from "./pages/Recipelist/RecipeList";
import RecipeForm from "./pages/Recipeform/RecipeForm";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import Header from "./components/Header";
import GlobalStyles from "./styles/GlobalStyles";
import { AuthProvider } from "./contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const isTokenValid = token && !isTokenExpired(token);

  return isTokenValid ? children : <Navigate to="/login" />;
};

const isTokenExpired = (token) => {
  try {
    const [, payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <RecipeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute>
                <RecipeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-recipe"
            element={
              <ProtectedRoute>
                <RecipeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-recipe/:id"
            element={
              <ProtectedRoute>
                <RecipeForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
