import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Userdash from "./pages/userdash";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
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
          <ProtectedRoute>
            <Userdash />
          </ProtectedRoute>
        </>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
