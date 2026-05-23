import React, { useState } from "react";
import "../styles/signup.css";

const Signup = ({ onSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const validate = async () => {
    let newError = {};

    if (!formData.name.trim()) {
      newError.name = "Name required";
    } else if (!/^[A-Za-z]+$/.test(formData.name)) {
      newError.name = "Only letters allowed";
    }

    if (!formData.email.trim()) {
      newError.email = "Email required";
    } else if (!/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
      newError.email = "Invalid email";
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.some((u) => u.email === formData.email)) {
        newError.email = "Email exists";
      }
    }

    if (!formData.phone.trim()) {
      newError.phone = "Mobile required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newError.phone = "Invalid number";
    }

    if (!formData.password.trim()) {
      newError.password = "Password required";
    } else if (formData.password.length < 6) {
      newError.password = "Min 6 chars";
    }

    if (!formData.confirmpassword.trim()) {
      newError.confirmpassword = "Confirm password";
    } else if (formData.password !== formData.confirmpassword) {
      newError.confirmpassword = "Passwords mismatch";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await validate()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      users.push({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      localStorage.setItem("users", JSON.stringify(users));

      onSuccess?.();
    } else {
      alert("Check errors");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <p className="error">{error.name}</p>

      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <p className="error">{error.email}</p>

      <input
        type="text"
        name="phone"
        placeholder="Mobile"
        onChange={handleChange}
      />
      <p className="error">{error.phone}</p>

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <p className="error">{error.password}</p>

      <input
        type="password"
        name="confirmpassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <p className="error">{error.confirmpassword}</p>

      <button type="submit">Sign Up</button>

      <p style={{ fontSize: "12px", textAlign: "center" }}>
        Already have an account?{" "}
        <span className="switch-link" onClick={switchToLogin}>
          Login
        </span>
      </p>
    </form>
  );
};

export default Signup;