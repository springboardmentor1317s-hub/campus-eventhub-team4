import React, { useState } from "react";
import { User, Mail, Lock, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
// Reusable InputField with optional icon
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

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("Student"); // Default role

  return (
    <section className="min-h-screen py-15 flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold text-primary">Create Account</h1>
      <p className="text-secondary mt-1">
        Join CampusEventHub to explore, manage, and participate in events
      </p>

      <div className="w-[450px] flex flex-col py-10 px-7 mt-5 shadow-md rounded-2xl bg-white">
        <form>
          {/* Full Name */}
          <InputField
            id="fullname"
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            Icon={User}
          />

          {/* Email */}
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            Icon={Mail}
          />

          {/* College/University */}
          <InputField
            id="college"
            label="College / University"
            type="text"
            placeholder="Enter your college/university"
            Icon={GraduationCap}
          />

          {/* Role Selection */}
          <div className="flex flex-col text-sm mt-3">
            <label>Role</label>
            <div className="flex mt-2 gap-2">
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
          </div>

          {/* Password */}
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            Icon={Lock}
          />

          {/* Confirm Password */}
          <InputField
            id="confirm-password"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            Icon={Lock}
          />

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
