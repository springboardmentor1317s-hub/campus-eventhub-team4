import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function UserDashboard() {
  const [tab, setTab] = useState("dashboard"); // 'dashboard' or 'allEvents'
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [user, setUser] = useState(null); // user profile info
  const [filterStatus, setFilterStatus] = useState("all");
  const filteredRegs = registrations.filter(r =>
    filterStatus === "all" ? true : r.status === filterStatus
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all events
        const resEvents = await api.get("/events");
        setEvents(resEvents.data);

        // Fetch my registrations
        const resRegs = await api.get("/registrations/me");
        setRegistrations(resRegs.data);

        // Fetch my profile
        const resUser = await api.get("/auth/profile");
        setUser(resUser.data);

      } catch (err) {
        toast.error("Failed to load dashboard data");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container my-5">
      {/* Header with tab switcher */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fa fa-user me-2"></i>User Dashboard
        </h2>
        <div>
          <button
            className={`btn btn-sm me-2 ${tab === "dashboard" ? "btn-primary" : "btn-outline-primary"
              }`}
            onClick={() => setTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`btn btn-sm ${tab === "allEvents" ? "btn-primary" : "btn-outline-primary"
              }`}
            onClick={() => setTab("allEvents")}
          >
            All Events
          </button>
        </div>
      </div>

      {/* Dashboard Tab */}
      {tab === "dashboard" && (
        <>
          {user && (
            <div className="card shadow-sm p-3 mb-4">
              <h5>Profile</h5>
              <p>
                <strong>Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>College:</strong> {user.college}
              </p>
              <p>
                <strong>Account Type:</strong> {user.accountType}
              </p>
            </div>
          )}

          {/* My Registrations */}
          {/* My Registrations */}
          <h4 className="mb-3">My Registrations</h4>
          <div className="mb-2">
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
          {filteredRegs.length === 0 ? (
            <p>You haven’t registered for any events yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Dates</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegs.map(r => (
                    <tr key={r._id}>
                      <td>
                        <Link to={`/events/${r.event_id._id}`}>{r.event_id.title}</Link>
                      </td>
                      <td>{r.event_id.category}</td>
                      <td>
                        {new Date(r.event_id.start_date).toDateString()} -{" "}
                        {new Date(r.event_id.end_date).toDateString()}
                      </td>
                      <td>
                        <span
                          className={`badge ${r.status === "approved" ? "bg-success" :
                              r.status === "rejected" ? "bg-danger" :
                                "bg-warning text-dark"
                            }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td>
                        {r.status === "pending" && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={async () => {
                              if (!window.confirm("Cancel this registration?")) return;
                              try {
                                await api.delete(`/registrations/${r._id}`);
                                toast.success("Registration canceled");
                                setRegistrations(registrations.filter(reg => reg._id !== r._id));
                              } catch (err) {
                                toast.error("Failed to cancel registration");
                              }
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </>
      )}

      {/* All Events Tab */}
      {tab === "allEvents" && (
        <>
          <h4 className="mb-3">All Events</h4>
          <div className="row">
            {events.length === 0 ? (
              <div className="col-12 text-center text-muted">No events available.</div>
            ) : (
              events.map(event => (
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
                      <p className="card-text text-muted">
                        <strong>Category:</strong> {event.category} <br />
                        <strong>Dates:</strong> {new Date(event.start_date).toLocaleDateString()} -{" "}
                        {new Date(event.end_date).toLocaleDateString()}
                      </p>
                      <Link to={`/events/${event._id}`} className="btn btn-primary mt-auto btn-sm">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </>
      )}
    </div>
  );
}

export default UserDashboard;
