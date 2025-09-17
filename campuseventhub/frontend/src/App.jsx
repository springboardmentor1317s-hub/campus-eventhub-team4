import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Userdash from "./pages/Userdash";
import Admindash from "./pages/Admindash";
import Superadmindash from "./pages/Superadmindash";

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Welcome />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Signup />
        </>
      ),
    },
    {
      path: "/userdash",
      element: (
        <>
          <ProtectedRoute requiredRole="student">
            <Userdash />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/admindash",
      element: (
        <>
          <ProtectedRoute requiredRole="college_admin">
            <Admindash />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: "/superadmindash",
      element: (
        <>
          <ProtectedRoute requiredRole="superadmin">
            <Superadmindash />
          </ProtectedRoute>
        </>
      ),
    },
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
