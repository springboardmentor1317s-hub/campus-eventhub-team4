import React, { useState } from "react";
import "./Register.css";
import bgImage from "../assets/bg.jpg";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    studentId: "",
    contact: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    console.log("Form submitted:", formData);
    alert("Registration successful!");
  };

  return (
    <div
      className="register-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="register-card">
        <h2 style={{ color: "blue" }}>Register for CampusEventHub</h2>
        <p>Create your account to start managing and joining events.</p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* College */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-building-columns"></i>
              <input
                type="text"
                name="college"
                placeholder="Enter your college/university"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Student ID */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-id-card"></i>
              <input
                type="text"
                name="studentId"
                placeholder="Enter Student ID (if any)"
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contact */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-phone"></i>
              <input
                type="text"
                name="contact"
                placeholder="Enter contact number"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-user-gear"></i>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="Student">Student</option>
                <option value="Organizer">Organizer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <div className="input-icon">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Terms */}
          <div className="terms">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree">
              I agree to the{" "}
              <Link to="/terms" style={{ color: "blue", textDecoration: "underline" }}>
                Terms and Conditions
              </Link>
            </label>
          </div>

          {/* Error */}
          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

          {/* Button */}
          <button className="register-btn" type="submit" disabled={!agree}>
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
