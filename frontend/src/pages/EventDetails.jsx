import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import {
  FaCheck,
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaStar
} from "react-icons/fa";

// ---------------- Feedback Section ----------------
function FeedbackSection({ eventId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [sort, setSort] = useState("newest");

  // Fetch feedbacks
  useEffect(() => {
    fetchFeedbacks();
  }, [eventId]);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get(`/feedbacks?eventId=${eventId}`);
      setFeedbacks(res.data);

      if (res.data.length > 0) {
        const avg =
          res.data.reduce((sum, f) => sum + f.rating, 0) / res.data.length;
        setAvgRating(avg.toFixed(1));
      } else {
        setAvgRating(0);
      }
    } catch {
      toast.error("Failed to load feedbacks");
    }
  };

  const handleSubmit = async () => {
    if (!rating || !comment) {
      toast.error("Please provide both rating and comment");
      return;
    }

    try {
      await api.post("/feedbacks", {
        event_id: eventId,
        rating,
        comments: comment,
      });
      toast.success("Feedback submitted!");
      setRating(0);
      setComment("");
      fetchFeedbacks();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit feedback");
    }
  };

  // Sorting
  const sortedFeedbacks = [...feedbacks].sort((a, b) => {
    if (sort === "highest") return b.rating - a.rating;
    if (sort === "lowest") return a.rating - b.rating;
    return new Date(b.createdAt) - new Date(a.createdAt); // newest
  });

  // Rating distribution
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = feedbacks.filter((f) => f.rating === star).length;
    const percent = feedbacks.length ? (count / feedbacks.length) * 100 : 0;
    return { star, count, percent };
  });

  return (
    <div className="card mt-5 p-4 shadow-sm w-100">
      <h3 className="fw-bold mb-3">Feedback & Reviews</h3>

      {/* Average Rating */}
      <div className="mb-4">
        {avgRating > 0 ? (
          <div>
            <div className="d-flex align-items-center">
              <span className="fs-3 fw-bold me-2">{avgRating}</span>
              <div className="text-warning">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(avgRating)
                        ? "text-warning"
                        : "text-secondary"
                    }
                  />
                ))}
              </div>
              <span className="ms-2 text-muted">
                ({feedbacks.length} reviews)
              </span>
            </div>

            {/* Rating distribution */}
            <div className="mt-3">
              {distribution.map((d) => (
                <div key={d.star} className="d-flex align-items-center mb-1">
                  <span style={{ width: "40px" }}>{d.star}★</span>
                  <div
                    className="progress flex-grow-1 me-2"
                    style={{ height: "8px" }}
                  >
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: `${d.percent}%` }}
                    />
                  </div>
                  <span>{d.count}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted">No reviews yet</p>
        )}
      </div>

      {/* Rating stars */}
      <div className="mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            onClick={() => setRating(star)}
            className={`me-1 cursor-pointer ${star <= rating ? "text-warning" : "text-secondary"}`}
            style={{ fontSize: "1.5rem" }}
          />
        ))}
      </div>

      {/* Comment box */}
      <textarea
        className="form-control mb-3"
        rows="3"
        placeholder="Write your feedback..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Feedback
      </button>

      {/* Sort */}
      {feedbacks.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mt-5">
          <h5>What others say</h5>
          <select
            className="form-select w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      )}

      {/* Previous feedbacks */}
      <div className="row mt-3">
        {sortedFeedbacks.length > 0 ? (
          sortedFeedbacks.map((fb) => {
            const initials = fb.user_id?.fullName
              ? fb.user_id.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
              : "U";

            return (
              <div key={fb._id} className="col-lg-6 col-md-6 col-sm-12 mb-3">
                <div className="card p-3 shadow-sm h-100">
                  {/* User info */}
                  <div className="d-flex align-items-center mb-2">
                    {fb.user_id?.avatar ? (
                      <img
                        src={fb.user_id.avatar}
                        alt="avatar"
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                        style={{ width: "40px", height: "40px" }}
                      >
                        {initials}
                      </div>
                    )}
                    <div>
                      <strong>{fb.user_id?.fullName || "Anonymous"}</strong>
                      <br />
                      <small className="text-muted">
                        {fb.user_id?.college}
                      </small>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-warning mb-1 fs-3">
                    {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                  </div>

                  {/* Comment */}
                  <p className="mb-2">{fb.comments}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted">No feedback yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}

// ---------------- Event Details Page ----------------
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
      } catch {
        toast.error("Failed to load event details");
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
    } catch {
      toast.error("Registration failed");
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
    } catch {
      toast.error("Failed to cancel registration");
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
    <div className="container my-5 d-flex flex-column align-items-center">
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
                  Organized by {event.college_id?.college || "College"}
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
                  <span>{event.college_id?.college || "College"}</span>
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

      {/* Feedback Section */}
      <div style={{ maxWidth: "1100px", width: "100%" }}>
        <FeedbackSection eventId={id} />
      </div>
    </div>
  );
}

export default EventDetails;