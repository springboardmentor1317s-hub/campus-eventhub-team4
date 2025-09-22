import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for all filters
  const [filters, setFilters] = useState({
    category: "",
    title: "",
    location: "",
    start_date: "", // New state for start date
    end_date: "",   // New state for end date
  });

  const fetchEvents = async (activeFilters) => {
    try {
      setLoading(true);
      // Remove empty filters before sending to the API
      const cleanFilters = Object.fromEntries(
        Object.entries(activeFilters).filter(([_, v]) => v !== "")
      );
      
      const res = await api.get("/events", { params: cleanFilters });
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when filters change
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchEvents(filters);
    }, 500); // Debounce API calls

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  // Handle changes to any filter input
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      category: "",
      title: "",
      location: "",
      start_date: "",
      end_date: "",
    });
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">
        <i className="fa fa-calendar-alt me-2"></i>All Events
      </h2>

      {/* Filters */}
      <div className="card shadow-sm p-3 mb-4">
        <div className="row g-2 align-items-end">
          {/* Category */}
          <div className="col-md-3 col-lg-2">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="sports">Sports</option>
              <option value="hackathon">Hackathon</option>
              <option value="cultural">Cultural</option>
              <option value="workshop">Workshop</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Title */}
          <div className="col-md-3 col-lg-2">
            <label className="form-label">Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={filters.title}
              onChange={handleFilterChange}
            />
          </div>

          {/* Location */}
          <div className="col-md-3 col-lg-2">
            <label className="form-label">Location</label>
            <input
              name="location"
              type="text"
              className="form-control"
              placeholder="Search by location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>
          
          {/* ==== NEW: Start Date Filter ==== */}
          <div className="col-md-3 col-lg-2">
            <label className="form-label">Start Date</label>
            <input
              name="start_date"
              type="date"
              className="form-control"
              value={filters.start_date}
              onChange={handleFilterChange}
            />
          </div>

          {/* ==== NEW: End Date Filter ==== */}
          <div className="col-md-3 col-lg-2">
            <label className="form-label">End Date</label>
            <input
              name="end_date"
              type="date"
              className="form-control"
              value={filters.end_date}
              onChange={handleFilterChange}
            />
          </div>

          {/* Reset Button */}
          <div className="col-md-3 col-lg-2 d-flex">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={handleReset}
            >
              <i className="fa fa-sync-alt me-1"></i> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Events List (No changes needed here) */}
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