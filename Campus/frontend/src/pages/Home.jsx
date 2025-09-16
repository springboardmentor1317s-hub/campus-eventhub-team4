import { Link } from "react-router-dom";

function Home({ featuredEvents = [] }) {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          height: "80vh",
          backgroundImage: "url('https://images.unsplash.com/photo-1669508595978-9db290965da3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhbXB1cyUyMGV2ZW50fGVufDB8fDB8fHww')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="display-4 fw-bold mb-3">🎉 Welcome to CampusEventHub</h1>
        <p className="lead mb-4">Discover and manage events at your college with ease.</p>
        <div>
          <Link to="/events" className="btn btn-primary btn-lg me-2">
            Explore Events
          </Link>
          <Link to="/register" className="btn btn-outline-light btn-lg">
            Register Now
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1741636174266-a090f9427ec0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FtcHVzJTIwZXZlbnRzfGVufDB8fDB8fHww"
              alt="about"
              className="img-fluid rounded shadow-sm"
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">About CampusEventHub</h2>
            <p className="text-muted">
              CampusEventHub is your one-stop platform to discover, register, and manage college events seamlessly. Whether you're a student or an admin, stay connected with all campus activities in real-time.
            </p>
            <Link to="/register" className="btn btn-primary mt-2">
              Join Now
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">How It Works</h2>
          <div className="row">
            {[
              { icon: "📝", title: "Register", desc: "Create your account as a student or admin." },
              { icon: "🎯", title: "Discover Events", desc: "Browse and filter events easily." },
              { icon: "✅", title: "Participate", desc: "Register and attend your favorite events." },
              { icon: "📊", title: "Manage", desc: "Admins can create, edit, and manage events." },
            ].map((step, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="p-3 shadow-sm rounded bg-white h-100">
                  <div className="display-4 mb-2">{step.icon}</div>
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="container my-5">
        <h2 className="mb-4 text-center">⭐ Featured Events</h2>
        {featuredEvents.length === 0 ? (
          <p className="text-center text-muted">No featured events at the moment.</p>
        ) : (
          <div className="row">
            {featuredEvents.map((event) => (
              <div key={event._id} className="col-md-4 mb-4">
                <div className="card h-100 shadow-sm border-0">
                  {event.banner && (
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="card-img-top"
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{event.title}</h5>
                    <p className="text-muted mb-1">{event.category}</p>
                    {event.description && (
                      <p className="text-muted mb-3">
                        {event.description.length > 80
                          ? event.description.substring(0, 80) + "..."
                          : event.description}
                      </p>
                    )}
                    <p className="text-muted mb-3">
                      {new Date(event.start_date).toLocaleDateString()} -{" "}
                      {new Date(event.end_date).toLocaleDateString()}
                    </p>
                    <Link
                      to={`/events/${event._id}`}
                      className="btn btn-primary mt-auto"
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

      {/* Call to Action Section */}
      <div
        className="text-center text-white py-5"
        style={{
          backgroundImage: "url('https://plus.unsplash.com/premium_photo-1680807869624-07b389d623e8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtcHVzJTIwZXZlbnRzfGVufDB8fDB8fHww",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="mb-3">Ready to Join the Fun?</h2>
        <p className="lead mb-4">Sign up today and never miss out on exciting campus events!</p>
        <Link to="/register" className="btn btn-lg btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default Home;
