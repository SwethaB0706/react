import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header-container">
      <nav className="nav">
        {isLoggedIn && (
          <div className="nav-links">
            <Link className="nav-link" to="/">Dashboard</Link>
            <Link className="nav-link" to="/recipes">Recipes</Link>
            <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
          </div>
        )}
        <div>
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
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
