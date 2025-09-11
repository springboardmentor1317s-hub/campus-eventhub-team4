import React, { useState } from "react";
import { Mail, Lock } from "lucide-react"; // example icons
import { Link } from "react-router-dom";
// Reusable input field with optional icon
const InputField = ({ id, label, type, placeholder, Icon }) => (
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
        type={type}
        placeholder={placeholder}
        className={`w-full bg-gray-200/40 p-3 rounded-md outline-none ${
          Icon ? "pl-10" : ""
        }`}
      />
    </div>
  </div>
);

const RoleButton = ({ label, selectedRole, setSelectedRole }) => {
  const isSelected = selectedRole === label;

  return (
    <button
      type="button"
      onClick={() => setSelectedRole(label)}
      className={`flex-1 text-sm font-semibold rounded-md p-3 transition-colors duration-200
        ${
          isSelected
            ? "bg-primary text-white"
            : "border border-primary text-primary bg-white"
        }`}
    >
      {label}
    </button>
  );
};

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("Student"); // Default Student

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold text-primary">Welcome Back</h1>
      <p className="text-secondary mt-1">
        Sign in to your CampusEventHub account
      </p>

      <div className="w-[450px] flex flex-col py-10 px-7 mt-5 shadow-md rounded-2xl bg-white">
        <form>
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            Icon={Mail}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            Icon={Lock}
          />

          <p className="text-primary text-sm text-center mt-3">
            <a href="#">Forgot your password?</a>
          </p>

          {/* Role Selection */}
          <div className="flex mt-5 gap-2">
            <RoleButton
              label="Student"
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
            <RoleButton
              label="Admin"
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
            <RoleButton
              label="SuperAdmin"
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-primary rounded-lg text-white mt-5 font-semibold"
          >
            Sign in as {selectedRole}
          </button>

          <p className="text-secondary text-sm text-center mt-5">
            Don’t have an account?
          </p>
          <Link
            to="/signup"
            className="block text-center w-full font-semibold p-4 border border-primary rounded-lg text-primary mt-3"
          >
            Create Account
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
