import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth2.css";
// import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreeTerms) {
      alert("You must agree to the terms & conditions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      alert("Registration successful!");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/edify.png" alt="Edify Logo" className="edify-logo" />
        <h2 className="title">Create Account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <select name="phoneCode" disabled>
              <option value="+91">+91</option>
            </select>
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </div>
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <div className="input-group">
            <input type="password" name="password" placeholder="Must contain at least 10 characters" onChange={handleChange} required minLength={10} />
            <input type="password" name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} required />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="agreeTerms" id="terms" onChange={handleChange} required />
            <label htmlFor="terms">I agree to all terms & conditions</label>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
          <p className="subtext">
          Have an account? <a href="/login">Login</a>
        </p>
        </form>
      </div>
    </div>
  );
}

