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
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        {event.banner && (
          <img
            src={event.banner}
            alt="Event Banner"
            className="img-fluid rounded-top"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        )}
        <div className="card-body">
          <h2 className="card-title mb-3">{event.title}</h2>

          <div className="mb-3">
            <span className="badge bg-primary me-2">{event.category}</span>
            <span className="badge bg-secondary">
              Organized by: {event.college_id?.name || "College"}
            </span>
          </div>

          <p className="mb-2">
            <strong>Description:</strong> {event.description}
          </p>
          <p className="mb-2">
            <FaMapMarkerAlt className="me-2 text-danger" /> {event.location}
          </p>
          <p className="mb-2">
            <FaCalendarAlt className="me-2 text-success" />{" "}
            {new Date(event.start_date).toDateString()} -{" "}
            {new Date(event.end_date).toDateString()}
          </p>
          <p className="mb-3">
            <FaUser className="me-2" /> Organized by: {event.college_id?.name || "College"}
          </p>

          {!registered ? (
            <button
              className="btn btn-success btn-lg"
              onClick={handleRegister}
              disabled={actionLoading}
            >
              <FaCheck className="me-2" /> {actionLoading ? "Registering..." : "Register"}
            </button>
          ) : (
            <button
              className="btn btn-danger btn-lg"
              onClick={handleCancel}
              disabled={actionLoading}
            >
              <FaTimes className="me-2" /> {actionLoading ? "Cancelling..." : "Cancel Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
