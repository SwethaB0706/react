import React, { useState, useEffect} from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { client } from '../index'; // Import client
import { AuthContext } from '../contexts/AuthContext';
 
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;
 
const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      client.resetStore();
      dispatch({
        type: 'LOGIN',
        payload: { token: login.token, user: login.user },
      });
      navigate('/');
    },
    onError: (error) => {
      setErrorMessage(error.message || 'An error occurred during login');
    },
  });

  useEffect(() => {
    // Clear the email and password fields on component mount
    setEmail('');
    setPassword('');
  }, []);

 
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    login({ variables: { email, password } });
  };
 
  return (
    <div className={styles.loginPage}>
      <div className={styles.overlay}>
        <div className={styles.leftSection}>
          <img src="https://mail.google.com/mail/u/0/#inbox" alt="Delicious food" className={styles.foodImage} />
        </div>
        <div className={styles.rightSection}>
          <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className={styles.button} type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <p>Don't have an account? <Link className={styles.link} to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Login;