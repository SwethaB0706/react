// import React, { useState } from 'react';
// import { useMutation, gql } from '@apollo/client';
// import { Link,useNavigate } from 'react-router-dom';
// import styled from 'styled-components';

// const REGISTER_MUTATION = gql`
//   mutation Register($username: String!, $email: String!, $password: String!) {
//     register(username: $username, email: $email, password: $password) {
//       token
//       user {
//         id
//         username
//       }
//     }
//   }
// `;

// const RegisterContainer = styled.div`
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

// const Register = () =>{
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
//     onCompleted: ({ register }) => {
//       localStorage.setItem('token', register.token);
//       navigate('/');
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     register({ variables: { username, email, password } });
//   };

//   return (
//     <RegisterContainer>
//       <h2>Register</h2>
//       <Form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
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
//           {loading ? 'Registering...' : 'Register'}
//         </Button>
//       </Form>
//       {error && <ErrorMessage>Error: {error.message}</ErrorMessage>}
//       <p>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </RegisterContainer>
//   );
// }

// export default Register;
import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import logo from './Media (3).png'

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: ({ register }) => {
      localStorage.setItem('token', register.token);
      navigate('/');
    },
  });

  useEffect(() => {
    // Add class to body
    document.body.classList.add(styles.registerBody);
    
    // Cleanup function to remove the class
    return () => {
      document.body.classList.remove(styles.registerBody);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: { username, email, password } });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className={styles.inputField}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <p className={styles.errorMessage}>Error: {error.message}</p>}
      </form>
      <div className={styles.createAccount}>
        <p>
          Already have an account? <Link className={`${styles.link} ${styles.gradientText}`} to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
