import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Admindash = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-3xl font-bold text-primary">
        Welcome, {user?.fullName || "User"} 👋
      </h1>
      <p className="text-secondary mt-2">You are logged in as Student.</p>

      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
      >
        Logout
      </button>
    </section>
  );
};

export default Admindash;
