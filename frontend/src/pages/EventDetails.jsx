import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch event and registration status
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);

        const regRes = await api.get("/registrations/me");
        const found = regRes.data.some((r) => r.event_id._id === id);
        setRegistered(found);
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message || "Failed to load event details");
        } else {
          toast.error("Network error: Unable to fetch event details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle registration
  const handleRegister = async () => {
    try {
      setActionLoading(true);
      await api.post("/registrations", { event_id: id });
      toast.success("Registered successfully!");
      setRegistered(true);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || "Registration failed");
      } else {
        toast.error("Network error: Registration failed");
      }
    } finally {
      setActionLoading(false);
    }
  };

  // Handle cancellation
  const handleCancel = async () => {
    try {
      setActionLoading(true);
      const myRegs = await api.get("/registrations/me");
      const reg = myRegs.data.find((r) => r.event_id._id === id);

      if (!reg) {
        toast.info("You are not registered for this event");
        setRegistered(false);
        return;
      }

      await api.delete(`/registrations/${reg._id}`);
      toast.success("Registration cancelled successfully");
      setRegistered(false);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || "Failed to cancel registration");
      } else {
        toast.error("Network error: Unable to cancel registration");
      }
    } finally {
      setActionLoading(false);
    }
  };

  if (loading)
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (!event)
    return (
      <div className="container my-5 text-center">
        <h4>Event not found</h4>
      </div>
    );

  return (
  <div className="container my-5 d-flex justify-content-center">
    <div
      className="card shadow-lg border-0 rounded-4 w-100"
      style={{ maxWidth: "1100px" }}
    >
      <div className="row g-0">
        {/* Banner */}
        {event.banner && (
          <div className="col-lg-6">
            <img
              src={event.banner}
              alt="Event Banner"
              className="img-fluid rounded-start h-100"
              style={{ objectFit: "cover", minHeight: "400px" }}
            />
          </div>
        )}

        {/* Event Details */}
        <div className="col-lg-6 d-flex flex-column p-5">
          <div className="flex-grow-1">
            <h1 className="fw-bold mb-4">{event.title}</h1>

            <div className="mb-4 d-flex flex-wrap gap-2">
              <span className="badge bg-primary px-3 py-2 fs-6">
                {event.category}
              </span>
              <span className="badge bg-secondary px-3 py-2 fs-6">
                Organized by {event.college_id?.name || "College"}
              </span>
            </div>

            <p className="text-muted mb-4" style={{ lineHeight: "1.7" }}>
              {event.description}
            </p>

            <div className="mb-4">
              <p className="mb-3 fs-5 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2 text-danger fs-4" />
                <span>{event.location}</span>
              </p>
              <p className="mb-3 fs-5 d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-success fs-4" />
                <span>
                  {new Date(event.start_date).toDateString()} –{" "}
                  {new Date(event.end_date).toDateString()}
                </span>
              </p>
              <p className="fs-5 d-flex align-items-center">
                <FaUser className="me-2 text-primary fs-4" />
                <span>{event.college_id?.name || "College"}</span>
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            {!registered ? (
              <button
                className="btn btn-success btn-lg w-100 py-3 fw-semibold shadow-sm"
                style={{
                  background: "linear-gradient(90deg, #28a745, #218838)",
                  border: "none",
                }}
                onClick={handleRegister}
                disabled={actionLoading}
              >
                <FaCheck className="me-2" />
                {actionLoading ? "Registering..." : "Register Now"}
              </button>
            ) : (
              <button
                className="btn btn-danger btn-lg w-100 py-3 fw-semibold shadow-sm"
                style={{
                  background: "linear-gradient(90deg, #dc3545, #c82333)",
                  border: "none",
                }}
                onClick={handleCancel}
                disabled={actionLoading}
              >
                <FaTimes className="me-2" />
                {actionLoading ? "Cancelling..." : "Cancel Registration"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);


}

export default EventDetails;
