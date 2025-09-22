import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    totalEvents: 0,
    activeUsers: 0,
    totalRegistrations: 0,
    pendingReviews: 0,
  });

  const [activeTop, setActiveTop] = useState("Dashboard");
  const [activeSub, setActiveSub] = useState("Overview");

    const [filterStatus, setFilterStatus] = useState("all");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);

  // Load all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEvents = await api.get("/events?college=me");

        const resUsers = await api.get("/auth/");
        const resRegs = await api.get("/registrations");
        const resLogs = await api.get("/adminlogs/");

        setEvents(resEvents.data);
        setUsers(resUsers.data);
        setRegistrations(resRegs.data);
        setAdminLogs(resLogs.data);

        const pendingRegs = resRegs.data.filter((r) => r.status === "pending");

        setSummary({
          totalEvents: resEvents.data.length,
          activeUsers: resUsers.data.length,
          totalRegistrations: resRegs.data.length,
          pendingReviews: pendingRegs.length,
        });
      } catch (err) {
        toast.error("Failed to load admin dashboard data");
      }
    };
    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  // --- Render Overview ---
  const renderOverview = () => {
    const eventsByCategory = events.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + 1;
      return acc;
    }, {});
    const pieData = Object.keys(eventsByCategory).map((key) => ({
      name: key,
      value: eventsByCategory[key],
    }));

    return (
      <div className="row">
        <div className="col-md-6 mb-4">
          <h6>Events by Category</h6>
          <PieChart width={350} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="col-md-6 mb-4">
          <h6>Registrations Status</h6>
          <BarChart
            width={350}
            height={300}
            data={[
              { name: "Approved", count: registrations.filter(r => r.status === "approved").length },
              { name: "Pending", count: registrations.filter(r => r.status === "pending").length },
              { name: "Rejected", count: registrations.filter(r => r.status === "rejected").length },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    );
  };

  // --- User Management ---
  const renderUserManagement = () => (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>College</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>{u.college}</td>
              <td>{u.accountType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // --- Event Management ---
  const renderEventManagement = () => (
    <div className="row">
      <div className="mb-3 text-end">
        <button
          className="btn btn-success"
          onClick={() => navigate("/create-event")}
        >
          + Add New Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="col-12 text-center text-muted">No events available</div>
      ) : (
        events.map((event) => (
          <div key={event._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm d-flex flex-column">
              {event.banner && (
                <img
                  src={event.banner}
                  alt={event.title}
                  className="card-img-top"
                  style={{ height: "160px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">
                  <strong>Category:</strong> {event.category} <br />
                  <strong>Location:</strong> {event.location} <br />
                  <strong>Dates:</strong>{" "}
                  {new Date(event.start_date).toLocaleDateString()} -{" "}
                  {new Date(event.end_date).toLocaleDateString()}
                </p>

                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => navigate(`/events/${event._id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => navigate(`/events/${event._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={async () => {
                      if (window.confirm("Are you sure you want to delete this event?")) {
                        try {
                          await api.delete(`/events/${event._id}`);
                          toast.success("Event deleted successfully");
                          setEvents(events.filter(e => e._id !== event._id));
                        } catch {
                          toast.error("Failed to delete event");
                        }
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // --- Registrations ---
const renderRegistrations = () => {
  const handleStatusChange = async (regId, status) => {
    try {
      await api.put(`/registrations/${regId}`, { status });
      toast.success(`Registration ${status}`);
      setRegistrations(registrations.map(r =>
        r._id === regId ? { ...r, status } : r
      ));
    } catch (err) {
      toast.error("Failed to update registration");
    }
  };

const handleCancel = async (regId) => {
  if (!window.confirm("Are you sure you want to cancel this registration?")) return;

  try {
    const res = await api.delete(`/registrations/${regId}`);
    
    // ✅ Remove from state only if backend confirms success
    if (res.status === 200) {
      toast.success(res.data.message || "Registration canceled successfully");
      setRegistrations(registrations.filter(r => r._id !== regId));
    }
  } catch (err) {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          toast.error("Invalid registration ID.");
          break;
        case 403:
          toast.error("You are not authorized to cancel this registration.");
          break;
        case 404:
          toast.error("Registration not found.");
          break;
        default:
          toast.error(err.response.data.message || "Server error while canceling registration.");
      }
    } else {
      toast.error("Failed to cancel registration. Please try again.");
    }
  }
};


  const filteredRegs = registrations.filter(r =>
    filterStatus === "all" ? true : r.status === filterStatus
  );

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-3">
        {["all", "approved", "pending", "rejected"].map(status => (
          <button
            key={status}
            className={`btn btn-sm me-2 ${filterStatus === status ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilterStatus(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Registration Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Event</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">No registrations</td>
              </tr>
            ) : filteredRegs.map((r) => (
              <tr key={r._id}>
                <td>{r.user_id.fullName}</td>
                <td>{r.user_id.email}</td>
                <td>{r.event_id.title}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "approved" ? "bg-success" :
                      r.status === "rejected" ? "bg-danger" : "bg-warning text-dark"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  {r.status === "pending" && (
                    <>
                      <button
                        className="btn btn-sm btn-success me-1"
                        onClick={() => handleStatusChange(r._id, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger me-1"
                        onClick={() => handleStatusChange(r._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleCancel(r._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


  // --- Admin Logs ---
  const renderAdminLogs = () => (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {adminLogs.map((log) => (
            <tr key={log._id}>
              <td>{log.user_id?.fullName || "Unknown"}</td>
              <td>{log.action}</td>
              <td>{new Date(log.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderDashboardSub = () => {
    switch (activeSub) {
      case "Overview": return renderOverview();
      case "User Management": return renderUserManagement();
      case "Event Management": return renderEventManagement();
      case "Registrations": return renderRegistrations();
      case "Admin Logs": return renderAdminLogs();
      default: return <p>Select an option</p>;
    }
  };

  // --- Admin Panel ---
  const renderAdminPanel = () => (
    <div>
      <h5 className="mb-3">⚙️ Admin Controls</h5>
      <ul className="list-group">
        <li className="list-group-item"><strong>Total Users:</strong> {users.length}</li>
        <li className="list-group-item"><strong>Total Events:</strong> {events.length}</li>
        <li className="list-group-item"><strong>Total Registrations:</strong> {registrations.length}</li>
        <li className="list-group-item"><strong>Admin Logs:</strong> {adminLogs.length}</li>
      </ul>

      <div className="mt-4">
        <h6>Recent Admin Actions</h6>
        <ul className="list-group">
          {adminLogs.slice(0, 5).map((log) => (
            <li key={log._id} className="list-group-item d-flex justify-content-between">
              <span><strong>{log.user_id?.fullName || "Unknown"}</strong>: {log.action}</span>
              <small className="text-muted">{new Date(log.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container my-4">
      {/* --- Top Nav --- */}
      <div className="d-flex flex-wrap mb-4">
        {["All Events", "Dashboard", "Admin Panel"].map((t) => (
          <button
            key={t}
            className={`btn me-2 mb-2 ${activeTop === t ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setActiveTop(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* --- Summary Cards --- */}
      {activeTop === "Dashboard" && (
        <div className="row mb-4">
          <div className="col-md-3 mb-3"><div className="card text-center p-3 shadow"><h6>Total Events</h6><h2>{summary.totalEvents}</h2></div></div>
          <div className="col-md-3 mb-3"><div className="card text-center p-3 shadow"><h6>Active Users</h6><h2>{summary.activeUsers}</h2></div></div>
          <div className="col-md-3 mb-3"><div className="card text-center p-3 shadow"><h6>Total Registrations</h6><h2>{summary.totalRegistrations}</h2></div></div>
          <div className="col-md-3 mb-3"><div className="card text-center p-3 shadow"><h6>Pending Reviews</h6><h2>{summary.pendingReviews}</h2></div></div>
        </div>
      )}

      {/* --- Sub Navigation --- */}
      {activeTop === "Dashboard" && (
        <div className="d-flex flex-wrap mb-3">
          {["Overview", "User Management", "Event Management", "Registrations", "Admin Logs"].map((s) => (
            <button
              key={s}
              className={`btn me-2 mb-2 ${activeSub === s ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setActiveSub(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* --- Content Area --- */}
      <div className="card shadow-sm p-4">
        {activeTop === "Dashboard" && renderDashboardSub()}
        {activeTop === "All Events" && renderEventManagement()}
        {activeTop === "Admin Panel" && renderAdminPanel()}
      </div>
    </div>
  );
}

export default AdminDashboard;
