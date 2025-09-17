import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Events() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (filters = {}) => {
    try {
      setLoading(true);
      const res = await api.get("/events", { params: filters });
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // Real-time filtering effect
  useEffect(() => {
    const filters = {};
    if (category) filters.category = category;
    if (title) filters.title = title;
    if (location) filters.location = location;

    fetchEvents(filters);
  }, [category, title, location]);

  const handleReset = () => {
    setCategory("");
    setTitle("");
    setLocation("");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">
        <i className="fa fa-calendar-alt me-2"></i>All Events
      </h2>

      {/* Filters */}
      <div className="card shadow-sm p-3 mb-4">
  <div className="row g-2 align-items-end">
    <div className="col-md-3">
      <label className="form-label">Category</label>
      <select
        className="form-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="sports">Sports</option>
        <option value="hackathon">Hackathon</option>
        <option value="cultural">Cultural</option>
        <option value="workshop">Workshop</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="col-md-3">
      <label className="form-label">Title</label>
      <input
        type="text"
        className="form-control"
        placeholder="Search by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="col-md-3">
      <label className="form-label">Location</label>
      <input
        type="text"
        className="form-control"
        placeholder="Search by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>

    <div className="col-md-3 d-flex justify-content-start">
      <button
        className="btn btn-outline-secondary w-100"
        onClick={handleReset}
      >
        <i className="fa fa-sync-alt me-1"></i> Reset
      </button>
    </div>
  </div>
</div>


      {/* Events List */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center my-5">
          <h5>No events found</h5>
        </div>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div key={event._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                {event.banner && (
                  <img
                    src={event.banner}
                    alt="banner"
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="card-text text-muted flex-grow-1">
                    {event.description.length > 80
                      ? event.description.substring(0, 80) + "..."
                      : event.description}
                  </p>
                  <p className="mb-1">
                    <i className="fa fa-map-marker-alt me-1"></i>
                    {event.location}
                  </p>
                  <p className="text-muted">
                    {new Date(event.start_date).toDateString()} - {new Date(event.end_date).toDateString()}
                  </p>
                  <Link
                    to={`/events/${event._id}`}
                    className="btn btn-primary btn-sm mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
