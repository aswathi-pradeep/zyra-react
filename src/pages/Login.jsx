import React, { useState } from "react";
import "../styles/login.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";

const Login = ({ onSuccess, switchToSignup }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const user = users.find(
        (u) => u.email === formData.email
      );

      let loginError = {};

      if (!formData.email.trim()) {
        loginError.email = "Email required";
      } else if (!user) {
        loginError.email = "Email does not exist";
      }

      if (!formData.password.trim()) {
        loginError.password = "Password required";
      } else if (user && user.password !== formData.password) {
        loginError.password = "Incorrect password";
      }

      setError(loginError);

      if (Object.keys(loginError).length === 0) {
        dispatch(loginSuccess(user));
        localStorage.setItem("user", JSON.stringify(user));
        onSuccess?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <p className="error">{error.email}</p>

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <p className="error">{error.password}</p>

      <button type="submit">Login</button>

      <p style={{ fontSize: "12px", textAlign: "center" }}>
        Don't have an account?{" "}
        <span className="switch-link" onClick={switchToSignup}>
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default Login;