import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../pages/Login/Media (3).png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <header className="header-container">
      <nav className="nav">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        {isLoggedIn && (
          <div className="nav-links">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/recipes">
              Recipes
            </Link>
            <Link className="nav-link" to="/add-recipe">
              Add Recipe
            </Link>
          </div>
        )}
        <div>
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              {/* <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
