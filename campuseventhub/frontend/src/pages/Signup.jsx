import React, { useState } from "react";
import { User, Mail, Lock, GraduationCap, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Reusable InputField with optional icon
const InputField = ({
  id,
  label,
  type,
  placeholder,
  Icon,
  value,
  onChange,
}) => (
  <div className="flex flex-col text-sm mt-3">
    <label htmlFor={id}>{label}</label>
    <div className="relative mt-2">
      {Icon && (
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
      )}
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-gray-200/40 p-3 rounded-md outline-none ${
          Icon ? "pl-10" : ""
        }`}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  </div>
);

const Signup = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    college: "",
    role: "Student",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name || e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        fullName: form.fullname, // ✅ match backend model
        email: form.email,
        college: form.college,
        accountType: form.role.toLowerCase(), // ✅ backend uses accountType (student / college_admin)
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <section className="min-h-screen py-15 flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold text-primary">Create Account</h1>
      <p className="text-secondary mt-1">
        Join CampusEventHub to explore, manage, and participate in events
      </p>

      <div className="w-[450px] flex flex-col py-10 px-7 mt-5 shadow-md rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <InputField
            id="fullname"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            Icon={User}
            value={form.fullname}
            onChange={handleChange}
          />

          {/* Email */}
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            Icon={Mail}
            value={form.email}
            onChange={handleChange}
          />

          {/* College/University */}
          <InputField
            id="college"
            label="College / University"
            type="text"
            placeholder="Enter your college/university"
            Icon={GraduationCap}
            value={form.college}
            onChange={handleChange}
          />

          {/* Role Selection Dropdown */}
          <div className="flex flex-col text-sm mt-3">
            <label htmlFor="role">Role</label>
            <div className="relative mt-2">
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-3 pr-10 rounded-md bg-gray-200/40 outline-none appearance-none"
              >
                <option value="Student">Student</option>
                <option value="Admin">Admin</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Password */}
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            Icon={Lock}
            value={form.password}
            onChange={handleChange}
          />

          {/* Confirm Password */}
          <InputField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            Icon={Lock}
            value={form.confirmPassword}
            onChange={handleChange}
          />

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mt-2">{error}</div>
          )}

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full p-4 bg-primary rounded-lg text-white mt-5 font-semibold"
          >
            Sign Up
          </button>

          {/* Already have account */}
          <p className="text-secondary text-sm text-center mt-5">
            Already have an account?
          </p>
          <Link
            to="/login"
            className="block text-center w-full font-semibold p-4 border border-primary rounded-lg text-primary mt-3"
          >
            Sign in
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
