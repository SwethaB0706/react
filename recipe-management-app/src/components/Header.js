import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #333;
  padding: 10px 20px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 15px;
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');
  
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };
  
    return (
      <HeaderContainer>
        <Nav>
          <div>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/recipes">Recipes</NavLink>
            <NavLink to="/add-recipe">Add Recipe</NavLink>
          </div>
          <div>
            {isLoggedIn ? (
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
          </div>
        </Nav>
      </HeaderContainer>
    );
  }
  
  export default Header;