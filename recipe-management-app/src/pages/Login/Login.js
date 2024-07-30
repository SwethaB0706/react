import React, { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import { client } from "../../index";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "./Media (3).png";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      localStorage.setItem("token", login.token);
      client.resetStore();
      dispatch({
        type: "LOGIN",
        payload: { token: login.token, user: login.user },
      });
      navigate("/");
    },
    onError: (error) => {
      setErrorMessage(error.message || "An error occurred during login");
    },
  });

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    // Add class to body
    document.body.classList.add(styles.loginBody);

    // Cleanup function to remove the class
    return () => {
      document.body.classList.remove(styles.loginBody);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    login({ variables: { email, password } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.lgradientText}>Login-form</h2>
        <div className={styles.inputField}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Enter email</label>
        </div>
        <div className={styles.inputField}>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Enter password</label>
        </div>
        <div className={styles.forget}></div>
        <button
          type="submit"
          disabled={loading}
          className={styles.gradientButton}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.createAccount}>
          <p>
            Don't have an account?{" "}
            <Link
              className={`${styles.link} ${styles.gradientText}`}
              to="/register"
            >
              Register Now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
