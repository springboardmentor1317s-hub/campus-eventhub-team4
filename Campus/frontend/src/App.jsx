import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageRegistrations from "./pages/ManageRegistrations";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />
        {/* Student Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute role="Student">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* College Admin Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="College Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute role="College Admin">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id/edit"
          element={
            <ProtectedRoute role="College Admin">
              <EditEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/events/:eventId/registrations"
          element={
            <ProtectedRoute role="College Admin">
              <ManageRegistrations />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div className="container my-5 text-center">
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
