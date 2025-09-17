import React, { createContext, useContext, useState } from "react";

/**
 * AuthContext
 * - Uses sessionStorage instead of localStorage
 * - Session ends automatically when browser/tab is closed
 * - Exposes: user, token, login(token, userData), logout()
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Read from sessionStorage for the initial render (so refresh won't log out until session ends)
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem("token") || null;
    } catch (err) {
      console.error("Error reading token from sessionStorage:", err);
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("Error parsing user from sessionStorage:", err);
      return null;
    }
  });

  // Login → save token + user in sessionStorage and state
  const login = (newToken, userData) => {
    try {
      sessionStorage.setItem("token", newToken);
      sessionStorage.setItem("user", JSON.stringify(userData));
      setToken(newToken);
      setUser(userData);
    } catch (err) {
      console.error("Error saving auth to sessionStorage:", err);
    }
  };

  // Logout → clear sessionStorage + reset state
  const logout = () => {
    try {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    } catch (err) {
      console.error("Error clearing sessionStorage on logout:", err);
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook convenience
export const useAuth = () => useContext(AuthContext);
