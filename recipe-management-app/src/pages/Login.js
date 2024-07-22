import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
 
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
 
const Login =() =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
 
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      localStorage.setItem('token', login.token);
      navigate('/');
    },
    onError: (error) => {
      setErrorMessage(error.message || 'An error occurred during login');
    },
  });
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    login({ variables: { email, password } });
  };
 
  return (
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
      <p>
        Don't have an account? <Link className={styles.link} to="/register">Register</Link>
      </p>
    </div>
  );
}
 
export default Login;


// import React, { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const LOGIN_MUTATION = gql`
//   mutation Login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         id
//         username
//       }
//     }
//   }
// `;

// const LoginContainer = styled.div`
//   max-width: 400px;
//   margin: 50px auto;
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 5px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   margin-bottom: 10px;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   padding: 10px;
//   background-color: #4CAF50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// `;

// const ErrorMessage = styled.p`
//   color: red;
// `;

// const Login = ()=> {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
//     onCompleted: ({ login }) => {
//       localStorage.setItem('token', login.token);
//       navigate('/');
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     login({ variables: { email, password } });
//   };

//   return (
//     <LoginContainer>
//       <h2>Login</h2>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <Button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </Button>
//       </Form>
//       {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
//       <p>
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>
//     </LoginContainer>
//   );
// }

// export default Login;