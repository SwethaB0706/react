// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Header.css';

// const Header = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <header className="header-container">
//       <nav className="nav">
//         {isLoggedIn && (
//           <div className="nav-links">
//             <Link className="nav-link" to="/">Dashboard</Link>
//             <Link className="nav-link" to="/recipes">Recipes</Link>
//             <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
//           </div>
//         )}
//         <div>
//           {isLoggedIn ? (
//             <button className="logout-button" onClick={handleLogout}>Logout</button>
//           ) : (
//             <>
//               {/* <Link className="nav-link" to="/login">Login</Link>
//               <Link className="nav-link" to="/register">Register</Link> */}
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Header.css';
// import logo from '../pages/Login/Media (3).png'; // Make sure to replace with the actual path to your logo

// const Header = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <header className="header-container">
      
//       <nav className="nav">
//         {isLoggedIn && (
//           <div className="nav-links">
//             <Link className="nav-link" to="/">Dashboard</Link>
//             <Link className="nav-link" to="/recipes">Recipes</Link>
//             <Link className="nav-link" to="/add-recipe">Add Recipe</Link>
//           <img src={logo} alt="Logo" className="logo" />
//         </div>
//         )}
//         <div>
//           {isLoggedIn ? (
//             <button className="logout-button" onClick={handleLogout}>Logout</button>
//           ) : (
//             <>
//               {/* <Link className="nav-link" to="/login">Login</Link>
//               <Link className="nav-link" to="/register">Register</Link> */}
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../pages/Login/Media (3).png'; // Update this path to your actual logo

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Do not render header on login page
  if (location.pathname === '/login' || location.pathname === '/register') {
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
