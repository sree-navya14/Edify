import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
      withCredentials: true,  // <-- important to include
    });
    alert("Login successful!");
    navigate("/");  // After login, redirect to home (or dashboard)
  } catch (error) {
    alert(error.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/edify.png" alt="Edify Logo" className="edify-logo" />

        <h2 className="login-title">Login to your account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email" className="input-field" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange} required />
          <div className="forgot-password"><Link to="/forgotpassword">Forgot Password?</Link></div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="subtext">Don't have an account? <Link to="/Register">Sign Up</Link></p>
      </div>
    </div>
  );
}


