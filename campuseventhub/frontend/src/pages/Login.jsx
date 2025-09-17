import React, { useState } from "react";
import { Mail, Lock, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Reusable Input Field
const InputField = ({
  id,
  name,
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
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-200/40 p-3 rounded-md outline-none ${
          Icon ? "pl-10" : ""
        }`}
        required
      />
    </div>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student", // default role
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", {
        email: form.email,
        password: form.password,
        accountType: form.role, // must match DB value
      });

      // Save token + user in AuthContext
      login(res.data.token, res.data.user);

      // Redirect by role
      const role = res.data.user.accountType.toLowerCase();
      if (role === "student") navigate("/userdash");
      else if (role === "college_admin") navigate("/admindash");
      else if (role === "superadmin") navigate("/superadmindash");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold text-primary">Welcome Back</h1>
      <p className="text-secondary mt-1">
        Sign in to your CampusEventHub account
      </p>

      <div className="w-[450px] flex flex-col py-10 px-7 mt-5 shadow-md rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <InputField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            Icon={Mail}
            value={form.email}
            onChange={handleChange}
          />
          <InputField
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            Icon={Lock}
            value={form.password}
            onChange={handleChange}
          />

          {/* Role Selection */}
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
                <option value="student">Student</option>
                <option value="college_admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>

              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* Forgot Password */}
          <p className="text-primary text-sm text-center mt-3">
            <a href="#">Forgot your password?</a>
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full p-4 bg-primary rounded-lg text-white mt-5 font-semibold cursor-pointer"
          >
            Sign in
          </button>

          <p className="text-secondary text-sm text-center mt-5">
            Don’t have an account?
          </p>
          <Link
            to="/signup"
            className="block text-center w-full font-semibold p-4 border border-primary border-2 rounded-lg text-primary mt-3"
          >
            Create Account
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
